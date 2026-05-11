"use client";

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

import { ReactNode, useState } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen  ">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 sm:gap-4 sm:pl-64 print:sm:pl-0">
        <Header />

        <main
          className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
            sidebarOpen ? 'sm:ml-64' : 'sm:ml-0'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}


