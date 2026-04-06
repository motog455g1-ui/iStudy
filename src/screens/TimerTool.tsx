import React, { useState, useEffect, useRef } from 'react';
import { NavBar } from '../components/NavBar';
import { ChevronRight } from 'lucide-react';

const DrumColumn = ({ items, selectedValue, onValueChange, label, padZero }: { items: number[], selectedValue: number, onValueChange: (val: number) => void, label: string, padZero?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 44;
  const [scrollPos, setScrollPos] = useState(selectedValue * itemHeight);
  const lastVibrated = useRef(selectedValue);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = selectedValue * itemHeight;
      setScrollPos(selectedValue * itemHeight);
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setScrollPos(scrollTop);
    
    const currentIndex = Math.round(scrollTop / itemHeight);
    if (currentIndex !== lastVibrated.current && currentIndex >= 0 && currentIndex < items.length) {
      if (navigator.vibrate) navigator.vibrate(5); // Haptic feedback
      lastVibrated.current = currentIndex;
      onValueChange(currentIndex);
    }
  };

  return (
    <div className="flex-1 relative h-full" style={{ perspective: '1000px' }}>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="absolute inset-0 overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ paddingBottom: '78px', paddingTop: '78px' }}
      >
        {items.map((item: number, index: number) => {
          const centerOfItem = index * itemHeight;
          const distanceFromCenter = centerOfItem - scrollPos;
          
          // Calculate 3D rotation
          const angle = (distanceFromCenter / itemHeight) * 25;
          const clampedAngle = Math.max(-85, Math.min(85, angle));
          
          // Calculate opacity and scale for depth
          const absDistance = Math.abs(distanceFromCenter);
          const opacity = Math.max(0.4, 1 - (absDistance / 200));
          const scale = Math.max(0.85, 1 - (absDistance / 600));

          return (
            <div 
              key={item} 
              className="h-[44px] snap-center flex items-center justify-center text-[32px] font-bold text-black"
              style={{
                transform: `rotateX(${-clampedAngle}deg) scale(${scale})`,
                opacity: opacity,
                paddingRight: label === 'hours' ? '3rem' : '2.5rem',
                transformOrigin: 'center center',
              }}
            >
              {padZero ? item.toString().padStart(2, '0') : item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const TimerTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(25);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && isStarted) {
      setIsRunning(false);
      // Play sound here ideally
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isStarted]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const startTimer = () => {
    const totalSeconds = selectedHours * 3600 + selectedMinutes * 60;
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsStarted(true);
      setIsRunning(true);
    }
  };

  const cancelTimer = () => {
    setIsStarted(false);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#6b6b6b] via-[#2b2b2b] to-black">
      <NavBar title="Timer" onBack={onBack} backLabel="Tools" />
      
      <div className="flex-1 flex flex-col items-center pt-8 px-4">
        
        {!isStarted ? (
          // Setup Screen
          <>
            {/* Drum Picker */}
            <div className="relative w-full max-w-sm h-[200px] bg-gradient-to-b from-[#c0c4cc] via-[#ffffff] to-[#c0c4cc] rounded-lg border-2 border-[#1a1a1a] shadow-[0_2px_10px_rgba(0,0,0,0.5),inset_0_0_10px_rgba(0,0,0,0.1)] overflow-hidden flex mb-8">
              
              {/* Top/Bottom inner shadows for cylinder effect */}
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 via-black/5 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 via-black/5 to-transparent z-10 pointer-events-none"></div>

              {/* Center highlight bar (Glass effect) */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[44px] bg-gradient-to-b from-black/20 to-black/5 border-y border-black/30 z-10 pointer-events-none flex shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <div className="flex-1 relative">
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold text-black drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">hours</span>
                </div>
                <div className="flex-1 relative">
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold text-black drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">mins</span>
                </div>
              </div>

              {/* Hours Column */}
              <DrumColumn 
                items={hours} 
                selectedValue={selectedHours} 
                onValueChange={setSelectedHours} 
                label="hours" 
              />

              {/* Divider */}
              <div className="w-px bg-gradient-to-b from-black/0 via-black/50 to-black/0 z-10 shadow-[1px_0_0_rgba(255,255,255,0.3)]"></div>

              {/* Minutes Column */}
              <DrumColumn 
                items={minutes} 
                selectedValue={selectedMinutes} 
                onValueChange={setSelectedMinutes} 
                label="mins" 
                padZero 
              />
            </div>

            {/* When Timer Ends Button */}
            <button className="w-full max-w-sm bg-gradient-to-b from-[#f4f5f7] to-[#b8bbc3] rounded-lg border border-[#1a1a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] flex justify-between items-center px-4 py-3 mb-6 active:from-[#b8bbc3] active:to-[#f4f5f7]">
              <span className="text-black font-bold text-lg">When Timer Ends</span>
              <div className="flex items-center text-[#555]">
                <span className="text-lg mr-1">Sleep iPod</span>
                <ChevronRight size={20} className="text-[#333]" strokeWidth={3} />
              </div>
            </button>

            {/* Start Button */}
            <button 
              onClick={startTimer}
              className="w-full max-w-sm bg-gradient-to-b from-[#60e560] to-[#1e8c1e] rounded-lg border border-[#1a1a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.5)] py-3 active:from-[#1e8c1e] active:to-[#60e560]"
            >
              <span className="text-white font-bold text-xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Start</span>
            </button>
          </>
        ) : (
          // Running Screen
          <>
            {/* Timer Display */}
            <div className="mb-16 mt-8">
              <span className="text-[90px] font-light text-white tracking-tight">
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* When Timer Ends Button */}
            <button className="w-full max-w-sm bg-gradient-to-b from-[#f4f5f7] to-[#b8bbc3] rounded-lg border border-[#1a1a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] flex justify-between items-center px-4 py-3 mb-6 active:from-[#b8bbc3] active:to-[#f4f5f7]">
              <span className="text-black font-bold text-lg">When Timer Ends</span>
              <div className="flex items-center text-[#555]">
                <span className="text-lg mr-1">Sleep iPod</span>
                <ChevronRight size={20} className="text-[#333]" strokeWidth={3} />
              </div>
            </button>

            {/* Controls */}
            <div className="w-full max-w-sm flex space-x-4">
              <button 
                onClick={cancelTimer}
                className="flex-1 bg-gradient-to-b from-[#e35d5b] to-[#991e1d] rounded-lg border border-[#1a1a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.5)] py-3 active:from-[#991e1d] active:to-[#e35d5b]"
              >
                <span className="text-white font-bold text-xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Cancel</span>
              </button>
              <button 
                onClick={toggleTimer}
                className={`flex-1 rounded-lg border border-[#1a1a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.5)] py-3 ${
                  isRunning 
                    ? 'bg-gradient-to-b from-[#f4f5f7] to-[#b8bbc3] active:from-[#b8bbc3] active:to-[#f4f5f7]' 
                    : 'bg-gradient-to-b from-[#60e560] to-[#1e8c1e] active:from-[#1e8c1e] active:to-[#60e560]'
                }`}
              >
                <span className={`${isRunning ? 'text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]' : 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'} font-bold text-xl`}>
                  {isRunning ? 'Pause' : 'Resume'}
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
