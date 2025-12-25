'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, FileText, BookOpen, FolderOpen, Settings, LogOut } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return children;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/blogs', icon: FileText, label: 'Blogs' },
    { href: '/admin/duas', icon: BookOpen, label: 'Duas' },
    { href: '/admin/categories', icon: FolderOpen, label: 'Categories' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <Link href="/admin" className={styles.logo}>
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <span className={styles.logoText}>Admin Panel</span>
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
