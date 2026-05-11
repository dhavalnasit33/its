'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabsSegmentedControlsProps {
  tabs: TabItem[];
  tabIndex: number;
  setTabIndex: (index: number) => void;
}

export default function TabsSegmentedControls({
  tabs,
  tabIndex,
  setTabIndex,
}: TabsSegmentedControlsProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="w-full">
      {/* Desktop (>= 1026px → lg:flex) */}
      <div className="hidden lg:flex rounded-xl bg-gray-300    gap-1 p-1">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setTabIndex(idx)}
            className={`px-4 py-2 rounded-xl transition-colors duration-200 whitespace-nowrap
              ${tabIndex === idx ? 'bg-gray-900 shadow-sm text-white  font-bold' : '  text-gray-800 hover:font-semibold hover:bg-gray-900 hover:text-gray-300 dark:text-gray-600'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lg:hidden relative ">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-between w-full border rounded-xl dark:bg-gray-800 px-4 py-2"
        >
          <span>{tabs[tabIndex]?.label}</span>
          <Menu size={18} />
        </button>
        {menuOpen && (
          <div className="absolute z-10 mt-1 text-white w-full dark:bg-gray-800 border  rounded-xl shadow-md">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTabIndex(idx);
                  setMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-xl ${tabIndex === idx ? 'bg-gray-900 font-semibold' : 'hover:bg-gray-900'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
