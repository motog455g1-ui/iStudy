import React from 'react';
import { LayoutDashboard, CalendarDays, CheckSquare, Calendar, Wrench } from 'lucide-react';

interface TabBarProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'timetable', label: 'Timetable', icon: CalendarDays },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'tools', label: 'Tools', icon: Wrench },
  ];

  return (
    <div className="ios-tab-bar h-14 flex items-center justify-around fixed bottom-0 w-full z-50 pb-safe">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-blue-400' : 'text-gray-400'}`}
          >
            <Icon size={24} className={isActive ? 'drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]' : ''} />
            <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
