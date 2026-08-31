'use client';

import { useState } from 'react';
import { ProjectPost } from '@/types';
import clsx from 'clsx';

type ProjectCardProps = {
  project: ProjectPost;
  onClick: () => void;
  size?: 'lg' | 'sm';
};

// 이 너비보다 작은 원본 이미지는 카드 크기로 확대될 때 깨져 보이므로 렌더링하지 않는다.
const LOW_RES_WIDTH_THRESHOLD = 400;

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
  const [isLowRes, setIsLowRes] = useState(false);
  const isCompact = size === 'sm';
  const showImage = !!project.coverImage && !imgError && !isLowRes;

  return (
    <li
      onClick={onClick}
      className={clsx(
        'group relative rounded-[10px] shadow-lg overflow-hidden cursor-pointer bg-gradient-to-br',
        isCompact ? 'h-[160px] from-[#15171c] to-[#0a0b0d]' : 'h-[240px] from-[#1f232c] to-[#0f1115]',
      )}
    >
      {showImage ? (
        <img
          src={project.coverImage!}
          alt={project.title}
          onError={() => setImgError(true)}
          onLoad={(e) => {
            if (e.currentTarget.naturalWidth > 0 && e.currentTarget.naturalWidth < LOW_RES_WIDTH_THRESHOLD) {
              setIsLowRes(true);
            }
          }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <span
          className={clsx(
            'absolute inset-0 flex items-center justify-center font-black text-white/10 select-none',
            isCompact ? 'text-[3.5rem]' : 'text-[7rem]',
          )}
        >
          {Array.from(project.title.trim())[0]}
        </span>
      )}

      {/* 텍스트 가독성 확보를 위한 최소한의 하단 그라데이션 스크림 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      <div
        className={clsx(
          'absolute inset-0 z-10 flex flex-col justify-end items-center text-center',
          isCompact ? 'gap-[0.6rem] p-4' : 'gap-3 p-6',
        )}
      >
        <h3 className={clsx('text-white break-keep font-bold', isCompact ? 'text-[1.5rem]' : 'text-[2rem]')}>
          {project.title}
        </h3>
        <p
          className={clsx(
            'text-white/90 text-left self-stretch break-keep',
            isCompact ? 'text-[1.2rem] line-clamp-2' : 'text-[1.4rem]',
          )}
        >
          {highlightPercentages(project.description)}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {(isCompact ? project.tags.slice(0, 2) : project.tags).map((tag) => (
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
        </div>
      </div>
    </li>
  );
};
