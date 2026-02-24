import { getBlogPosts } from '@/lib/notion';
import { ProjectList, ProjectListSkeleton } from '@/components/ProjectList';
import { Suspense } from 'react';

export const revalidate = 3600;

export default async function ProjectsPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectList posts={posts} />
      </Suspense>
    </div>
  );
}
