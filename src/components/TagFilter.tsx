'use client';

import clsx from 'clsx';

type TagFilterProps = {
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
};

export const TagFilter = ({ tags, selectedTags, onToggle }: TagFilterProps) => {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-[0.8rem]">
      {tags.map((tag) => {
        const active = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            aria-pressed={active}
            className={clsx(
              'px-[1.4rem] py-[0.6rem] rounded-full text-[1.3rem] border transition-colors cursor-pointer',
              active
                ? 'bg-mint text-[#0d1117] border-mint font-bold'
                : 'bg-[#18181c] text-[#aaa] border-[#2a2a2e] hover:border-mint hover:text-mint',
            )}
          >
            #{tag}
          </button>
        );
      })}
    </div>
  );
};
