"use client"

import Link from 'next/link';
import { useThemeContext } from '../../app/contexts/ThemeContext';
import styles from './sidebar.module.scss';
import { Building2, FolderKanban, FolderOpenDot, HandHelping, LayoutDashboard, Watch } from 'lucide-react';

export default function Sidebar() {
  const {toggleTheme, isDarkTheme} = useThemeContext();
  return (
    <div className={styles.sidebar}>
      <Link href="/dashboard">
        <div className={styles['sidebar-item']}>
          <LayoutDashboard />
          <span className='sidebar-label'>Dashboard</span>
        </div>
      </Link>
      <Link href="/projects">
        <div className={styles['sidebar-item']}>
          <FolderKanban />
          <span className='sidebar-label'>Projects</span>
        </div>
      </Link>
      <Link href="/storage">
        <div className={styles['sidebar-item']}>
          <FolderOpenDot />
          <span className='sidebar-label'>Storage</span>
        </div>
      </Link>
      <hr></hr>
      <Link href="/timespend">
        <div className={styles['sidebar-item']}>
          <Watch />
          <span className='sidebar-label'>Time spend</span>
        </div>
      </Link>
      <Link href="/office">
        <div className={styles['sidebar-item']}>
          <Building2 />
          <span className='sidebar-label'>Office Info.</span>
        </div>
      </Link>
      <Link href="/help">
        <div className={styles['sidebar-item']}>
          <HandHelping />
          <span className='sidebar-label'>Help</span>
        </div>
      </Link>
    </div>
  );
}
