import { supabase } from '@/lib/supabase';
import DuaCard from '@/components/dua/DuaCard';
import styles from './duas.module.css';

async function getDuas() {
  try {
    const { data: duas } = await supabase
      .from('duas')
      .select('*, category:categories(name)')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    return { duas: duas || [] };
  } catch (error) {
    console.error('Error fetching duas:', error);
    return { duas: [] };
  }
}

export const metadata = {
  title: 'Duas - Dua & Blogs',
  description: 'Discover beautiful Islamic duas with Arabic text, transliteration, and translations',
};

export default async function DuasPage() {
  const { duas } = await getDuas();

  return (
    <>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Duas</h1>
          <p className={styles.pageDescription}>
            Discover beautiful supplications with Arabic text, transliteration, and translations
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {duas.length > 0 ? (
            duas.map((dua) => <DuaCard key={dua.id} dua={dua} />)
          ) : (
            <p className={styles.emptyState}>No duas available yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
