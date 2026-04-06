import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { Timer, BookOpen, GraduationCap, Settings, Calculator, BookMarked } from 'lucide-react';
import { TimerTool } from './TimerTool';
import { NotesTool } from './NotesTool';
import { GradesTool } from './GradesTool';
import { FlashcardsTool } from './FlashcardsTool';
import { SettingsTool } from './SettingsTool';

export const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    { id: 'timer', name: 'Study Timer', icon: Timer, color: 'from-orange-400 to-red-500' },
    { id: 'notes', name: 'Notes', icon: BookOpen, color: 'from-yellow-400 to-yellow-600' },
    { id: 'grades', name: 'Grades', icon: GraduationCap, color: 'from-green-400 to-green-600' },
    { id: 'flashcards', name: 'Flashcards', icon: BookMarked, color: 'from-purple-400 to-purple-600' },
    { id: 'calculator', name: 'GPA Calc', icon: Calculator, color: 'from-blue-400 to-blue-600' },
    { id: 'settings', name: 'Settings', icon: Settings, color: 'from-gray-400 to-gray-600' },
  ];

  if (activeTool === 'timer') {
    return <TimerTool onBack={() => setActiveTool(null)} />;
  }
  
  if (activeTool === 'notes') {
    return <NotesTool onBack={() => setActiveTool(null)} />;
  }

  if (activeTool === 'grades' || activeTool === 'calculator') {
    return <GradesTool onBack={() => setActiveTool(null)} />;
  }

  if (activeTool === 'flashcards') {
    return <FlashcardsTool onBack={() => setActiveTool(null)} />;
  }

  if (activeTool === 'settings') {
    return <SettingsTool onBack={() => setActiveTool(null)} />;
  }

  if (activeTool) {
    return (
      <div className="flex flex-col h-full bg-ios-linen">
        <NavBar title={tools.find(t => t.id === activeTool)?.name || 'Tool'} onBack={() => setActiveTool(null)} backLabel="Tools" />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="ios-glass-panel p-8 text-center w-full max-w-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h2>
            <p className="text-gray-600">This feature is being polished for the next update.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-ios-linen overflow-y-auto pb-20">
      <NavBar title="Tools" />
      
      <div className="p-4 grid grid-cols-3 gap-4">
        {tools.map(tool => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="flex flex-col items-center"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-b ${
                tool.id === 'notes' ? 'from-[#fdfae5] to-[#fdfae5]' : 
                tool.id === 'timer' ? 'from-black to-black' :
                tool.id === 'calculator' ? 'from-[#432d20] to-[#22120a]' :
                tool.id === 'settings' ? 'from-[#a0a5ab] to-[#70757c]' :
                tool.color
              } shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.5)] flex items-center justify-center mb-2 border border-black/20 relative overflow-hidden`}>
                {/* Glossy reflection */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl pointer-events-none z-20"></div>
                
                {tool.id === 'notes' ? (
                  <div className="w-full h-full relative bg-[#fdfae5] flex flex-col z-10">
                    {/* Brown leather top */}
                    <div className="h-[30%] w-full bg-gradient-to-b from-[#6b4c3a] to-[#4a3326] border-b border-[#3a251c] shadow-[0_1px_2px_rgba(0,0,0,0.4)] z-10 relative">
                      {/* Torn paper effect */}
                      <div className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-[#fdfae5]" style={{ backgroundImage: 'linear-gradient(45deg, transparent 33.333%, #fdfae5 33.333%, #fdfae5 66.667%, transparent 66.667%), linear-gradient(-45deg, transparent 33.333%, #fdfae5 33.333%, #fdfae5 66.667%, transparent 66.667%)', backgroundSize: '4px 4px', backgroundPosition: '0 -2px' }}></div>
                    </div>
                    {/* Yellow paper bottom */}
                    <div className="flex-1 w-full relative" style={{ backgroundImage: 'linear-gradient(transparent 85%, #b0c4de 85%)', backgroundSize: '100% 20%' }}>
                      {/* Vertical red lines */}
                      <div className="absolute left-[20%] top-0 bottom-0 w-px bg-red-400 opacity-50"></div>
                      <div className="absolute left-[25%] top-0 bottom-0 w-px bg-red-400 opacity-50"></div>
                    </div>
                  </div>
                ) : tool.id === 'timer' ? (
                  <div className="w-full h-full relative bg-black flex items-center justify-center z-10 overflow-hidden">
                    {/* Top gray gradient */}
                    <div className="absolute top-0 left-0 right-0 h-[55%] bg-gradient-to-b from-[#777] to-[#333] rounded-b-[50%] scale-x-150"></div>
                    {/* Clock face */}
                    <div className="w-[82%] h-[82%] bg-gradient-to-b from-[#f8f8f8] to-[#d0d0d0] rounded-full relative shadow-[inset_0_1px_4px_rgba(0,0,0,0.4),0_0_0_2px_#111] flex items-center justify-center z-10">
                      {/* Ticks */}
                      <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[2px] h-[4px] bg-[#333]"></div>
                      <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[2px] h-[4px] bg-[#333]"></div>
                      <div className="absolute left-[4px] top-1/2 -translate-y-1/2 w-[4px] h-[2px] bg-[#333]"></div>
                      <div className="absolute right-[4px] top-1/2 -translate-y-1/2 w-[4px] h-[2px] bg-[#333]"></div>
                      {/* Hour hand */}
                      <div className="absolute top-1/2 left-1/2 w-[4px] h-[22%] bg-[#222] origin-bottom -translate-x-1/2 -translate-y-full rotate-[-40deg] rounded-t-sm shadow-sm"></div>
                      {/* Minute hand */}
                      <div className="absolute top-1/2 left-1/2 w-[3px] h-[32%] bg-[#222] origin-bottom -translate-x-1/2 -translate-y-full rotate-[90deg] rounded-t-sm shadow-sm"></div>
                      {/* Second hand */}
                      <div className="absolute top-1/2 left-1/2 w-[1.5px] h-[38%] bg-[#ff3b30] origin-bottom -translate-x-1/2 -translate-y-full rotate-[0deg] shadow-sm"></div>
                      {/* Center dot */}
                      <div className="absolute top-1/2 left-1/2 w-[6px] h-[6px] bg-[#ff3b30] rounded-full -translate-x-1/2 -translate-y-1/2 border-[1.5px] border-[#f0f0f0] shadow-sm"></div>
                    </div>
                  </div>
                ) : tool.id === 'calculator' ? (
                  <div className="w-full h-full relative flex flex-col z-10 overflow-hidden">
                    <div className="flex-1 flex">
                      <div className="flex-1 bg-gradient-to-b from-[#5a4231] to-[#432d20] border-r border-b border-[#2a1a10] flex items-center justify-center">
                        <span className="text-white text-2xl font-bold leading-none shadow-sm">+</span>
                      </div>
                      <div className="flex-1 bg-gradient-to-b from-[#5a4231] to-[#432d20] border-b border-[#2a1a10] flex items-center justify-center">
                        <span className="text-white text-3xl font-bold leading-none shadow-sm -mt-1">-</span>
                      </div>
                    </div>
                    <div className="flex-1 flex">
                      <div className="flex-1 bg-gradient-to-b from-[#3a251c] to-[#22120a] border-r border-[#1a0d06] flex items-center justify-center">
                        <span className="text-white text-2xl font-bold leading-none shadow-sm">×</span>
                      </div>
                      <div className="flex-1 bg-gradient-to-b from-[#e66d00] to-[#b34700] flex items-center justify-center">
                        <span className="text-white text-xl font-bold leading-none shadow-sm">C</span>
                      </div>
                    </div>
                  </div>
                ) : tool.id === 'settings' ? (
                  <div className="w-full h-full relative bg-gradient-to-b from-[#a0a5ab] to-[#70757c] flex items-center justify-center z-10 overflow-hidden">
                    {/* Dotted pattern */}
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#222 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
                    
                    {/* Main Gear */}
                    <div className="relative w-[75%] h-[75%] flex items-center justify-center">
                      {/* Gear teeth base */}
                      <div className="absolute w-full h-full bg-gradient-to-b from-[#e0e5eb] to-[#80858c]" style={{ clipPath: 'polygon(50% 0%, 58% 8%, 68% 4%, 72% 14%, 83% 14%, 84% 24%, 94% 28%, 90% 38%, 100% 45%, 94% 53%, 100% 62%, 90% 68%, 94% 78%, 84% 82%, 83% 92%, 72% 92%, 68% 102%, 58% 98%, 50% 106%, 42% 98%, 32% 102%, 28% 92%, 17% 92%, 16% 82%, 6% 78%, 10% 68%, 0% 62%, 6% 53%, 0% 45%, 10% 38%, 6% 28%, 16% 24%, 17% 14%, 28% 14%, 32% 4%, 42% 8%)' }}></div>
                      {/* Inner circle */}
                      <div className="absolute w-[70%] h-[70%] bg-[#50555c] rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden">
                        {/* Spokes */}
                        <div className="absolute w-full h-[20%] bg-gradient-to-b from-[#c0c5cb] to-[#90959c]"></div>
                        <div className="absolute h-full w-[20%] bg-gradient-to-b from-[#c0c5cb] to-[#90959c]"></div>
                        <div className="absolute w-full h-[20%] bg-gradient-to-b from-[#c0c5cb] to-[#90959c] rotate-45"></div>
                        <div className="absolute h-full w-[20%] bg-gradient-to-b from-[#c0c5cb] to-[#90959c] rotate-45"></div>
                        {/* Center hub */}
                        <div className="absolute w-[45%] h-[45%] bg-gradient-to-b from-[#d0d5db] to-[#80858c] rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center">
                          <div className="w-[30%] h-[30%] bg-[#30353c] rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Icon size={32} color="white" style={{ filter: 'drop-shadow(0 -1px 0 rgba(0,0,0,0.3))' }} className="relative z-10" />
                )}
              </div>
              <span className="text-white text-xs font-bold drop-shadow-md">{tool.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};





