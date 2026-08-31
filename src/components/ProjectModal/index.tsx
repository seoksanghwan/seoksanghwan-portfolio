'use client';

import { useEffect, useState } from 'react';
import { ProjectPost } from '@/types';
import { ModalCloseButton } from './ModalCloseButton';
import { ProjectModalHeader } from './ProjectModalHeader';
import { MarkdownContent } from './MarkdownContent';

type ProjectModalProps = {
  project: ProjectPost;
  onClose: () => void;
};

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    fetch(`/api/project-md?id=${project.id}`)
      .then((res) => res.json())
      .then((data) => {
        setMarkdown(data.content || '');
        setIsLoading(false);
      });
  }, [project.id]);

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-[5px] z-[1000] flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-[800px] max-h-[90vh] bg-[#0d1117] rounded-[20px] overflow-y-auto shadow-[0_10px_30px_rgba(0,0,0,0.5)] scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalCloseButton onClose={onClose} />

        {project.coverImage && !imgError && (
          <div className="w-full mx-auto bg-white h-[350px] overflow-hidden max-md:w-[calc(100%+40px)] max-md:mx-auto max-md:mb-[3rem] max-md:h-[200px]">
            <img
              src={project.coverImage}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover block"
              alt=""
            />
          </div>
        )}

        <section className="p-10">
          <ProjectModalHeader project={project} />

          <div>
            <MarkdownContent content={markdown} isLoading={isLoading} />
          </div>
        </section>
      </div>
    </div>
  );
};
