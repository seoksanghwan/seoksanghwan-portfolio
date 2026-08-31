import { getCoverImageUrl } from '@/lib/notion';
import { NextRequest, NextResponse } from 'next/server';

// Notion이 반환하는 커버 이미지의 서명 URL은 약 1시간 후 만료된다.
// /projects 페이지는 ISR(revalidate=3600)로 캐시되므로, 캐시된 HTML에
// 만료된 URL이 그대로 남아있는 시간대가 생길 수 있다. 이를 막기 위해
// <img>가 이 프록시를 거치도록 하고, 매 요청마다 Notion에서 최신 URL을
// 다시 조회한 뒤 이미지를 스트리밍한다. 응답 자체는 만료 시간보다 짧게
// 캐시해 Notion API 호출 빈도를 낮춘다.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');
  if (!pageId) {
    return NextResponse.json({ error: 'pageId가 필요합니다.' }, { status: 400 });
  }

  const coverUrl = await getCoverImageUrl(pageId);
  if (!coverUrl) {
    return NextResponse.json({ error: '커버 이미지를 찾을 수 없습니다.' }, { status: 404 });
  }

  const imageRes = await fetch(coverUrl);
  if (!imageRes.ok || !imageRes.body) {
    return NextResponse.json({ error: '이미지를 가져오지 못했습니다.' }, { status: 502 });
  }

  return new NextResponse(imageRes.body, {
    headers: {
      'Content-Type': imageRes.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=86400',
    },
  });
}
