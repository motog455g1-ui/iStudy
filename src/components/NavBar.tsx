import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface NavBarProps {
  title: string;
  onBack?: () => void;
  backLabel?: string;
  rightAction?: React.ReactNode;
}

export const NavBar: React.FC<NavBarProps> = ({ title, onBack, backLabel = 'Back', rightAction }) => {
  return (
    <div className="ios-nav-bar h-12 flex items-center justify-between px-2 sticky top-0 z-50">
      <div className="w-20 flex items-center">
        {onBack && (
          <button onClick={onBack} className="ios-back-button text-xs font-bold shadow-sm flex items-center">
            {backLabel}
          </button>
        )}
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-white font-bold text-lg drop-shadow-md truncate px-2" style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.6)' }}>
          {title}
        </h1>
      </div>
      <div className="w-20 flex justify-end">
        {rightAction}
      </div>
    </div>
  );
};
