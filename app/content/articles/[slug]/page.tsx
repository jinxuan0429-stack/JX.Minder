import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME ?? 'Author';

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 bg-white min-h-screen">
      <article>
        <header className="mb-10 border-b border-slate-100 pb-8">
  <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
    {post.title}
  </h1>
  
  <div className="flex justify-between items-center text-sm">
    {/* 左侧：发布时间 */}
    <div className="text-slate-500 font-medium">
      🗓️ {post.date}
    </div>

    {/* 右侧：作者标签（增加了灰黑配色和浮动动画） */}
    <div className="
      cursor-pointer
      transition-all duration-300 ease-out
      hover:-translate-y-1 hover:shadow-md hover:bg-white
      active:scale-95
      font-semibold text-slate-700 bg-slate-100 
      px-4 py-1.5 rounded-full border border-slate-200 
      flex items-center gap-2
    ">
      <span className="text-xs opacity-70">Author</span>
      <span>{authorName}</span>
    </div>
  </div>
</header>
        
        {/* 修复点：将 contentContent 改为 contentHtml */}
        <div 
          className="prose prose-slate lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
        />
      </article>
    </main>
  );
}