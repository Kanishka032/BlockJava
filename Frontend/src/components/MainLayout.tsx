import React from 'react';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  points?: number;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, points = 0 }) => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar points={points} />
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
