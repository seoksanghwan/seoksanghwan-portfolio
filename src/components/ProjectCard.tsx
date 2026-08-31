'use client';

import { useEffect, useRef, useState } from 'react';
import { ProjectPost } from '@/types';
import clsx from 'clsx';

type ProjectCardProps = {
  project: ProjectPost;
  onClick: () => void;
  size?: 'lg' | 'sm';
};

function highlightPercentages(text: string) {
  return text.split(/(\d+(?:\.\d+)?%)/g).map((part, i) =>
    /^\d+(?:\.\d+)?%$/.test(part) ? (
      <strong key={i} className="text-mint font-bold">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export const ProjectCard = ({ project, onClick, size = 'lg' }: ProjectCardProps) => {
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const isCompact = size === 'sm';
  const showImage = !!project.coverImage && !imgError;
  const visibleTags = project.tags.slice(0, isCompact ? 2 : 4);
  const hiddenTagCount = project.tags.length - visibleTags.length;

  const evaluateImage = (img: HTMLImageElement) => {
    if (img.naturalWidth === 0) {
      setImgError(true);
    }
  };

  useEffect(() => {
    // 하이드레이션이 끝나기 전에 이미지 로드가 이미 성공/실패해버리면
    // onLoad/onError 이벤트를 놓칠 수 있어, 마운트 시점에 한 번 더 확인한다.
    if (imgRef.current?.complete) {
      evaluateImage(imgRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.coverImage]);

  return (
    <li
      onClick={onClick}
      className={clsx(
        'group flex flex-col rounded-[10px] shadow-lg overflow-hidden cursor-pointer',
        isCompact ? 'h-[230px]' : 'h-[340px]',
      )}
    >
      {/* 상단: 이미지 영역 — 오버레이 없이 순수 이미지만 보여준다 */}
      <div
        className={clsx(
          'relative shrink-0 overflow-hidden bg-gradient-to-br',
          isCompact ? 'h-[100px] from-[#181a1f] to-[#0d0e11]' : 'h-[150px] from-[#232733] to-[#14161b]',
        )}
      >
        {showImage ? (
          <img
            ref={imgRef}
            src={project.coverImage!}
            alt={project.title}
            onError={(e) => evaluateImage(e.currentTarget)}
            onLoad={(e) => evaluateImage(e.currentTarget)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span
            className={clsx(
              'absolute inset-0 flex items-center justify-center font-black text-white/10 select-none',
              isCompact ? 'text-[3rem]' : 'text-[5rem]',
            )}
          >
            {Array.from(project.title.trim())[0]}
          </span>
        )}
      </div>

      {/* 하단: 단색 배경 위 텍스트 — 전부 왼쪽 정렬 */}
      <div
        className={clsx(
          'flex flex-col flex-1 min-h-0 text-left',
          isCompact ? 'gap-[0.5rem] p-4 bg-[#121317]' : 'gap-[0.8rem] p-5 bg-[#1a1c22]',
        )}
      >
        <h3 className={clsx('text-white font-bold break-keep', isCompact ? 'text-[1.4rem]' : 'text-[1.9rem]')}>
          {project.title}
        </h3>
        <p
          className={clsx(
            'text-white/80 break-keep',
            isCompact ? 'text-[1.2rem] line-clamp-2' : 'text-[1.4rem] line-clamp-3',
          )}
        >
          {highlightPercentages(project.description)}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className={clsx(
                'bg-[#2a2a2e] text-mint rounded-[4px]',
                isCompact ? 'px-[0.8rem] py-[0.3rem] text-[0.9rem]' : 'px-[1.2rem] py-[0.4rem] text-[1rem]',
              )}
            >
              #{tag}
            </span>
          ))}
          {hiddenTagCount > 0 && (
            <span
              className={clsx(
                'bg-transparent text-[#777] rounded-[4px]',
                isCompact ? 'px-[0.4rem] py-[0.3rem] text-[0.9rem]' : 'px-[0.4rem] py-[0.4rem] text-[1rem]',
              )}
            >
              +{hiddenTagCount}
            </span>
          )}
        </div>
      </div>
    </li>
  );
};
