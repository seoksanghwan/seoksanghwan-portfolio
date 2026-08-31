'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { ProjectPost } from '@/types';
import { ProjectModal } from './ProjectModal/index';
import { ProjectCard } from './ProjectCard';
import { TagFilter } from './TagFilter';

export const ProjectListSkeleton = () => (
  <section className="max-w-[1200px] mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-[224px] rounded-[10px] bg-gray-200 animate-pulse" />
      ))}
    </div>
  </section>
);

export const ProjectList = ({ posts }: { posts: ProjectPost[] }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectPost | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTags = useMemo(() => {
    const raw = searchParams.get('tags');
    return raw ? raw.split(',').filter(Boolean) : [];
  }, [searchParams]);

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))).sort((a, b) => a.localeCompare(b)),
    [posts],
  );

  // 태그가 많으면 필터 목록이 첫 화면 전체를 덮어버리므로 기본은 접어두고,
  // 공유된 필터 링크로 들어온 경우에만 펼쳐서 보여준다.
  const [isFilterOpen, setIsFilterOpen] = useState(() => selectedTags.length > 0);

  const handleToggleTag = useCallback(
    (tag: string) => {
      const next = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];

      const params = new URLSearchParams(searchParams.toString());
      if (next.length > 0) {
        params.set('tags', next.join(','));
      } else {
        params.delete('tags');
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [selectedTags, searchParams, router, pathname],
  );

  const filteredPosts = useMemo(
    () =>
      selectedTags.length === 0
        ? posts
        : posts.filter((p) => p.tags.some((t) => selectedTags.includes(t))),
    [posts, selectedTags],
  );

  const featured = filteredPosts.filter((p) => p.featured);
  const others = filteredPosts.filter((p) => !p.featured);

  return (
    <section className="max-w-[1200px] mx-auto flex flex-col gap-[2rem]">
      <div>
        <button
          type="button"
          onClick={() => setIsFilterOpen((prev) => !prev)}
          aria-expanded={isFilterOpen}
          className="flex items-center gap-[0.6rem] text-[1.4rem] text-[#aaa] hover:text-mint transition-colors cursor-pointer"
        >
          필터{selectedTags.length > 0 ? ` (${selectedTags.length})` : ''}
          <span className={clsx('transition-transform', isFilterOpen && 'rotate-180')}>▾</span>
        </button>
        {isFilterOpen && (
          <div className="mt-[1.2rem]">
            <TagFilter tags={allTags} selectedTags={selectedTags} onToggle={handleToggleTag} />
          </div>
        )}
      </div>

      {featured.length > 0 && (
        <div>
          <h2 className="flex items-center gap-[0.8rem] text-white text-[1.8rem] font-bold mb-[1.6rem]">
            <span className="w-[4px] h-[1.6rem] bg-mint rounded-full" />
            주요 프로젝트
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            {featured.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                size="lg"
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </ul>
        </div>
      )}

      {others.length > 0 && (
        <div className="pt-[2rem] border-t border-white/10">
          <h2 className="flex items-center gap-[0.8rem] text-white text-[1.8rem] font-bold mb-[1.6rem]">
            <span className="w-[4px] h-[1.6rem] bg-[#555] rounded-full" />
            그 외 작업
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-[16px]">
            {others.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                size="sm"
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </ul>
        </div>
      )}

      {filteredPosts.length === 0 && (
        <p className="text-center text-[#aaa] text-[1.6rem] py-[4rem]">
          선택한 태그에 해당하는 프로젝트가 없습니다.
        </p>
      )}

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};
