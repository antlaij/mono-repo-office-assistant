"use client"

import { useThemeContext } from '../../app/contexts/ThemeContext';
import { ChevronRight, Menu, Moon, Sun } from 'lucide-react';

import classes from './main-header.module.css';

export default function MainHeader() {
  const { toggleTheme, isDarkTheme, toggleSidebar, isSidebarCollapsed } = useThemeContext();
  return (
    <div className={classes.header}>
      <div onClick={toggleSidebar}>
      {
        (isSidebarCollapsed())?<ChevronRight />:<Menu />
      }
      </div>
      <div className='grow text-center'>
        Office Assistant
      </div>
      <div>
      <span className={classes.button} onClick={toggleTheme}>
      {
        (isDarkTheme())?<Sun />:<Moon />
      }
      </span>
      </div>
    </div>
  );
}
