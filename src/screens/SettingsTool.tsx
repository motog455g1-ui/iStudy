import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { ChevronRight } from 'lucide-react';

export const SettingsTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sounds, setSounds] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [sync, setSync] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#c5ccd4]">
      <NavBar title="Settings" onBack={onBack} backLabel="Tools" />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Group 1 */}
        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <span className="font-bold text-gray-800">Sounds</span>
            <button 
              onClick={() => setSounds(!sounds)}
              className={`w-14 h-8 rounded-full relative transition-colors border shadow-inner ${sounds ? 'bg-blue-500 border-blue-600' : 'bg-gray-100 border-gray-300'}`}
            >
              <div className={`absolute top-0.5 bottom-0.5 w-7 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-gray-300 transition-transform ${sounds ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <span className="font-bold text-gray-800">Notifications</span>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-8 rounded-full relative transition-colors border shadow-inner ${notifications ? 'bg-blue-500 border-blue-600' : 'bg-gray-100 border-gray-300'}`}
            >
              <div className={`absolute top-0.5 bottom-0.5 w-7 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-gray-300 transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="font-bold text-gray-800">iCloud Sync</span>
            <button 
              onClick={() => setSync(!sync)}
              className={`w-14 h-8 rounded-full relative transition-colors border shadow-inner ${sync ? 'bg-blue-500 border-blue-600' : 'bg-gray-100 border-gray-300'}`}
            >
              <div className={`absolute top-0.5 bottom-0.5 w-7 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-gray-300 transition-transform ${sync ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
          </div>
        </div>

        {/* Group 2 */}
        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between p-3 border-b border-gray-200 active:bg-blue-500 active:text-white group">
            <span className="font-bold text-gray-800 group-active:text-white">Theme</span>
            <div className="flex items-center text-gray-500 group-active:text-white">
              <span className="text-sm mr-2">Classic iOS</span>
              <ChevronRight size={20} />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 active:bg-blue-500 active:text-white group">
            <span className="font-bold text-gray-800 group-active:text-white">About iStudy</span>
            <ChevronRight size={20} className="text-gray-400 group-active:text-white" />
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8 text-shadow-sm">
          iStudy v1.0.0<br/>
          Designed in California
        </div>
      </div>
    </div>
  );
};
