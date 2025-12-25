import { supabase } from '@/lib/supabase';
import BlogCard from '@/components/blog/BlogCard';
import styles from './blogs.module.css';

async function getBlogs() {
  try {
    const { data: blogs } = await supabase
      .from('blogs')
      .select('*, category:categories(name)')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    const { data: categories } = await supabase
      .from('categories')
      .select('*')
      .eq('type', 'blog');

    return { blogs: blogs || [], categories: categories || [] };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { blogs: [], categories: [] };
  }
}

export const metadata = {
  title: 'Blogs - Dua & Blogs',
  description: 'Read insightful Islamic blog posts',
};

export default async function BlogsPage() {
  const { blogs } = await getBlogs();

  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Blogs</h1>
          <p className={styles.pageDescription}>
            Explore our collection of insightful Islamic articles
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p className={styles.emptyState}>No blogs available yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
