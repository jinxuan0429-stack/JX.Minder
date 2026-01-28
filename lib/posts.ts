import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark'; // 确保 import 这个
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/articles');

// 1. 获取所有文章列表 (用于首页)
export async function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title as string,
      date: data.date ? String(data.date) : '',
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 2. 获取单篇文章详情 (用于详情页)
export async function getPostBySlug(slug: string) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 将 Markdown 转换为 HTML
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      contentHtml, // 确保这个名字和 Page 里的对齐
      title: data.title as string,
      date: data.date ? String(data.date) : '',
    };
  } catch (error) {
    console.error("读取 Markdown 出错:", error);
    return null;
  }
}