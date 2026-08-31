'use client';

import { useState } from 'react';
import { ProjectPost } from '@/types';
import clsx from 'clsx';

type ProjectCardProps = {
  project: ProjectPost;
  onClick: () => void;
  size?: 'lg' | 'sm';
};

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getPlaceholderGradient(project: ProjectPost) {
  const hue = hashString(project.tags[0] || project.title) % 360;
  return `linear-gradient(135deg, hsl(${hue}, 70%, 55%) 0%, #0d1117 100%)`;
}

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
  const isCompact = size === 'sm';
  const showImage = !!project.coverImage && !imgError;

  return (
    <li
      onClick={onClick}
      className={clsx(
        'group relative rounded-[10px] shadow-lg overflow-hidden cursor-pointer bg-[#18181c]/80',
        isCompact ? 'h-[150px]' : 'h-[224px]',
      )}
    >
      {showImage && (
        <img
          src={project.coverImage!}
          alt={project.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 blur-sm"
        />
      )}
      {!showImage && (
        <div
          className="relative w-full h-full bg-center transition-all duration-300 group-hover:scale-110 blur-sm"
          style={{ background: getPlaceholderGradient(project) }}
        >
          <span
            className={clsx(
              'absolute inset-0 flex items-center justify-center font-black text-white/15 select-none',
              isCompact ? 'text-[3.5rem]' : 'text-[7rem]',
            )}
          >
            {project.title.trim().charAt(0)}
          </span>
        </div>
      )}
      <div
        className={clsx(
          'absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#18181c] text-center opacity-80',
          isCompact ? 'gap-2 p-4' : 'gap-4 p-6',
        )}
      >
        <h3
          className={clsx(
            'text-white break-keep text-center font-bold',
            isCompact ? 'text-[1.5rem]' : 'text-[2rem]',
          )}
        >
          {project.title}
        </h3>
        {!isCompact && (
          <p className="text-white text-[1.4rem] break-keep">{highlightPercentages(project.description)}</p>
        )}
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
