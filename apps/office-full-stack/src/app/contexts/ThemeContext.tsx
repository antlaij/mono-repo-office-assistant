import { ReactNode, createContext, useContext, useEffect, useState, } from 'react';

type Themes = 'dark' | 'light';
type SidebarState = 'expanded' | 'collapsed';

type LayoutProviderProps = {
  children: ReactNode;
};

type LayoutContextType = {
  currentTheme: Themes;
  toggleTheme: () => void;
  isDarkTheme: () => boolean;
  sidebarState: SidebarState;
  toggleSidebar: () => void;
  isSidebarCollapsed: () => boolean;
};


const LayoutContext = createContext<LayoutContextType | null>(null);

export function useThemeContext() {
  const value = useContext(LayoutContext);
  if (value == null) throw Error('Cannot use outside of LayoutProvider');

  return value;
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Themes>('dark');
  const [sidebarState, setSidebarState] = useState<SidebarState>('expanded');

  useEffect(() => {
    console.log('Theme Effect runs');
  }, []);

  const isDarkTheme = () => {
    return currentTheme === 'dark';
  }

  const toggleTheme = () => {
    if (isDarkTheme()) {
      setCurrentTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
      // document.documentElement.classList.add('light');
      // document.documentElement.classList.remove('dark');
    } else {
      setCurrentTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      // document.documentElement.classList.add('dark');
      // document.documentElement.classList.remove('light');
    }
  }

  const isSidebarCollapsed = () => {
    return sidebarState === 'collapsed';
  }

  const toggleSidebar = () => {
    if (isSidebarCollapsed()) {
      setSidebarState('expanded');
      document.documentElement.setAttribute('data-sidebar-state', 'expanded');
    } else {
      setSidebarState('collapsed');
      document.documentElement.setAttribute('data-sidebar-state', 'collapsed');
    }
  }

  return (
    <LayoutContext.Provider
      value={{
        currentTheme,
        toggleTheme,
        isDarkTheme,
        sidebarState,
        toggleSidebar,
        isSidebarCollapsed,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
