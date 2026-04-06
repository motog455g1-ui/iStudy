import React, { useState } from 'react';
import { AppProvider } from './AppContext';
import { TabBar } from './components/TabBar';
import { Dashboard } from './screens/Dashboard';
import { Timetable } from './screens/Timetable';
import { Tasks } from './screens/Tasks';
import { CalendarView } from './screens/Calendar';
import { Tools } from './screens/Tools';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="h-screen w-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden font-sans text-base antialiased selection:bg-blue-300">
      <div className="w-full h-full sm:w-[375px] sm:h-[812px] sm:rounded-[40px] sm:border-[8px] sm:border-black sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden bg-black flex flex-col">
        {/* Status Bar Mock (optional, for extra realism) */}
        <div className="h-5 bg-black w-full flex items-center justify-between px-1.5 text-white text-[10px] font-bold z-50 relative shrink-0">
          <div className="flex items-center space-x-1">
            <span>iStudy</span>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="white"><path d="M1 8h2v2H1zm3-2h2v4H4zm3-2h2v6H7zm3-2h2v8h-2zm3-2h2v10h-2z"/></svg>
          </div>
          <div>12:00 PM</div>
          <div className="flex items-center space-x-1">
            <span>100%</span>
            <div className="w-5 h-2.5 border border-white/50 rounded-sm p-[1px] flex items-center"><div className="bg-white h-full w-full"></div></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'timetable' && <Timetable />}
          {activeTab === 'tasks' && <Tasks />}
          {activeTab === 'calendar' && <CalendarView />}
          {activeTab === 'tools' && <Tools />}
        </div>

        <TabBar activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

