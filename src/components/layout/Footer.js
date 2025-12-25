import Link from 'next/link';
import { Heart } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer({ whatsappNumber }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerGrid}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Quick Links</h3>
            <nav className={styles.footerNav}>
              <Link href="/">Home</Link>
              <Link href="/blogs">Blogs</Link>
              <Link href="/duas">Duas</Link>
            </nav>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Contact</h3>
            {whatsappNumber && (
              <a 
                href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappLink}
              >
                Contact us on WhatsApp
              </a>
            )}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {currentYear} Dua & Blogs. Made with <Heart size={14} className={styles.heart} /> </p>
        </div>
      </div>
    </footer>
  );
}
