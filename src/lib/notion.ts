import { ProjectPost } from '@/types';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const NOTION_RETRY_STATUSES = [502, 503, 504];
const NOTION_RETRY_COUNT = 2;
const NOTION_RETRY_DELAY_MS = 1500;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function isRetryableNotionError(error: unknown): boolean {
  const e = error as { status?: number; message?: string };
  if (typeof e.status === 'number' && NOTION_RETRY_STATUSES.includes(e.status)) return true;
  const msg = e.message ?? '';
  return /502|503|504/.test(String(msg));
}

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

function mapNotionPageToPost(page: any): ProjectPost {
  const { properties, cover, id, url: notionUrl } = page;
  return {
    id,
    title: properties.Name?.title[0]?.plain_text || '제목 없음',
    description: properties.Description?.rich_text[0]?.plain_text || '',
    // cover.file은 1시간 후 만료되는 서명된 S3 URL이라 직접 노출하지 않고
    // /api/cover-image 프록시를 거쳐 매 요청마다 최신 URL로 다시 확인한다.
    // cover.external은 만료되지 않으므로 그대로 사용한다.
    coverImage: cover?.file ? `/api/cover-image?pageId=${id}` : cover?.external?.url || null,
    url: properties.URL?.url || '',
    youtube: properties.Youtube?.url || '',
    tags: properties.Tag?.multi_select?.map((tag: any) => tag.name) || [],
    startDate: properties['Work Period']?.date?.start || '',
    endDate: properties['Work Period']?.date?.end || '',
    notionUrl,
    featured: properties.Featured?.checkbox || false,
    priority: properties.Priority?.number ?? 999,
  };
}

export const getBlogPosts = async (): Promise<ProjectPost[]> => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) {
    console.error('NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다.');
    throw new Error('Notion 설정이 올바르지 않습니다. NOTION_DATABASE_ID를 확인해 주세요.');
  }

  let lastError: unknown;
  for (let attempt = 0; attempt <= NOTION_RETRY_COUNT; attempt++) {
    try {
      const response = await (notion as any).dataSources.query({
        data_source_id: databaseId,
        sorts: [
          {
            property: 'Priority',
            direction: 'ascending',
          },
        ],
        filter: {
          property: 'Priority',
          number: { less_than: 999 },
        },
      });

      return (response.results as any[]).map(mapNotionPageToPost);
    } catch (error) {
      lastError = error;
      console.error(`getBlogPosts 실패 (시도 ${attempt + 1}/${NOTION_RETRY_COUNT + 1}):`, error);

      if (attempt < NOTION_RETRY_COUNT && isRetryableNotionError(error)) {
        await sleep(NOTION_RETRY_DELAY_MS);
        continue;
      }
      throw lastError;
    }
  }

  throw lastError;
};

// 4. 마크다운 변환 로직 유지
export const getProjectMarkdown = async (pageId: string): Promise<string> => {
  try {
    if (!pageId) return '';
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);
    return mdString.parent || '';
  } catch (error) {
    console.error('Markdown 변환 중 에러 발생:', error);
    return '';
  }
};

// 5. 상세 정보 로직 유지
export const getProjectDetail = async (pageId: string) => {
  try {
    const pageResponse = await notion.pages.retrieve({ page_id: pageId });
    const blocksResponse = await notion.blocks.children.list({
      block_id: pageId,
    });
    return {
      page: pageResponse,
      blocks: blocksResponse.results,
    };
  } catch (error) {
    console.error('SDK Detail Error:', error);
    throw error;
  }
};

// 6. 커버 이미지의 최신 서명 URL 조회 (S3 서명 URL은 발급 후 약 1시간 뒤 만료됨)
export const getCoverImageUrl = async (pageId: string): Promise<string | null> => {
  try {
    const page = (await notion.pages.retrieve({ page_id: pageId })) as any;
    return page.cover?.file?.url || page.cover?.external?.url || null;
  } catch (error) {
    console.error('커버 이미지 조회 실패:', error);
    return null;
  }
};
