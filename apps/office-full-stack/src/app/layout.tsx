'use client'

import MainHeader from '../components/main-header/main-header';
import Sidebar from '../components/sidebar/sidebar';
import { LayoutProvider } from './contexts/ThemeContext';
import './global.css';
import styles from './layout.module.scss';


export default function RootLayout({ children, }: { children: React.ReactNode; }) {

  return (
    <LayoutProvider>
    <html lang="en" data-theme="dark" data-sidebar-state="expanded">
      <body>
        <div className="max-h-screen flex flex-col">
          <MainHeader></MainHeader>
          <div className="max-h-screen flex">
            <Sidebar />
            <div className={styles.mainContent}>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
    </LayoutProvider>
  );
}
