import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAdding, setIsAdding] = useState(false);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = monthStart; // Simplified, normally would pad to start of week
  const endDate = monthEnd;

  const dateFormat = "MMMM yyyy";
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  if (isAdding) {
    return (
      <div className="flex flex-col h-full bg-ios-linen">
        <NavBar 
          title="New Event" 
          onBack={() => setIsAdding(false)} 
          backLabel="Cancel"
          rightAction={
            <button onClick={() => setIsAdding(false)} className="ios-button-blue text-xs font-bold px-3 py-1">Save</button>
          }
        />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="ios-glass-panel p-8 text-center w-full max-w-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h2>
            <p className="text-gray-600">Full calendar event syncing is being polished for the next update.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-ios-linen overflow-y-auto pb-20">
      <NavBar 
        title="Calendar" 
        rightAction={
          <button onClick={() => setIsAdding(true)} className="text-white p-1">
            <Plus size={24} style={{ filter: 'drop-shadow(0 -1px 0 rgba(0,0,0,0.5))' }} />
          </button>
        }
      />
      
      <div className="p-2">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-400">
          {/* Calendar Header */}
          <div className="bg-gradient-to-b from-red-600 to-red-800 p-3 flex justify-between items-center border-b-2 border-red-900">
            <button onClick={prevMonth} className="text-white p-1 bg-black/20 rounded shadow-inner">
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-white font-bold text-lg drop-shadow-md">
              {format(currentDate, dateFormat)}
            </h2>
            <button onClick={nextMonth} className="text-white p-1 bg-black/20 rounded shadow-inner">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 bg-gray-200 border-b border-gray-400">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} className="text-center py-1 text-xs font-bold text-gray-600 border-r border-gray-300 last:border-r-0">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 bg-gray-100">
            {/* Pad start */}
            {Array.from({ length: startDate.getDay() }).map((_, i) => (
              <div key={`pad-${i}`} className="h-12 border-b border-r border-gray-300 bg-gray-200/50"></div>
            ))}
            
            {days.map((day, i) => {
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isDayToday = isToday(day);
              
              return (
                <div 
                  key={day.toString()} 
                  className={`h-12 border-b border-r border-gray-300 relative flex justify-center items-center
                    ${!isCurrentMonth ? 'bg-gray-200/50 text-gray-400' : 'bg-white text-gray-800'}
                  `}
                >
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm
                    ${isDayToday ? 'bg-blue-600 text-white shadow-inner' : ''}
                  `}>
                    {format(day, 'd')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Events for selected day (placeholder) */}
      <div className="p-2 mt-2">
        <h3 className="text-white font-bold text-shadow mb-2 px-2">Events</h3>
        <div className="ios-glass-panel p-4 text-center text-gray-600 text-sm">
          Select a day to view events.
        </div>
      </div>
    </div>
  );
};

