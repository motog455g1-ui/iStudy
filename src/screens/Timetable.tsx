import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { useApp } from '../AppContext';
import { Plus } from 'lucide-react';

export const Timetable: React.FC = () => {
  const { state, addClass } = useApp();
  const [selectedDay, setSelectedDay] = useState(1); // 1 = Monday
  const [isAdding, setIsAdding] = useState(false);
  const [newClass, setNewClass] = useState({
    title: '',
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '10:00',
    room: '',
    color: '#ff3b30'
  });

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const classesForDay = state.classes.filter(c => c.dayOfWeek === selectedDay).sort((a, b) => a.startTime.localeCompare(b.startTime));

  const handleSave = () => {
    if (newClass.title.trim()) {
      addClass(newClass);
      setIsAdding(false);
      setNewClass({ title: '', dayOfWeek: 1, startTime: '09:00', endTime: '10:00', room: '', color: '#ff3b30' });
    }
  };

  if (isAdding) {
    return (
      <div className="flex flex-col h-full bg-ios-linen overflow-y-auto pb-20">
        <NavBar 
          title="New Class" 
          onBack={() => setIsAdding(false)} 
          backLabel="Cancel"
          rightAction={
            <button onClick={handleSave} className="ios-button-blue text-xs font-bold px-3 py-1">Save</button>
          }
        />
        <div className="p-4 space-y-4">
          <div className="ios-glass-panel overflow-hidden">
            <div className="p-3 border-b border-gray-300 flex items-center">
              <span className="w-24 font-bold text-gray-700">Title</span>
              <input 
                type="text" 
                value={newClass.title}
                onChange={e => setNewClass({...newClass, title: e.target.value})}
                className="flex-1 bg-transparent outline-none text-gray-800" 
                placeholder="e.g. Biology" 
              />
            </div>
            <div className="p-3 border-b border-gray-300 flex items-center">
              <span className="w-24 font-bold text-gray-700">Day</span>
              <select 
                value={newClass.dayOfWeek}
                onChange={e => setNewClass({...newClass, dayOfWeek: Number(e.target.value)})}
                className="flex-1 bg-transparent outline-none text-gray-800"
              >
                {days.map((d, i) => <option key={i} value={i}>{d}</option>)}
              </select>
            </div>
            <div className="p-3 border-b border-gray-300 flex items-center">
              <span className="w-24 font-bold text-gray-700">Start Time</span>
              <input 
                type="time" 
                value={newClass.startTime}
                onChange={e => setNewClass({...newClass, startTime: e.target.value})}
                className="flex-1 bg-transparent outline-none text-gray-800" 
              />
            </div>
            <div className="p-3 border-b border-gray-300 flex items-center">
              <span className="w-24 font-bold text-gray-700">End Time</span>
              <input 
                type="time" 
                value={newClass.endTime}
                onChange={e => setNewClass({...newClass, endTime: e.target.value})}
                className="flex-1 bg-transparent outline-none text-gray-800" 
              />
            </div>
            <div className="p-3 border-b border-gray-300 flex items-center">
              <span className="w-24 font-bold text-gray-700">Room</span>
              <input 
                type="text" 
                value={newClass.room}
                onChange={e => setNewClass({...newClass, room: e.target.value})}
                className="flex-1 bg-transparent outline-none text-gray-800" 
                placeholder="e.g. Room 101" 
              />
            </div>
            <div className="p-3 flex items-center">
              <span className="w-24 font-bold text-gray-700">Color</span>
              <input 
                type="color" 
                value={newClass.color}
                onChange={e => setNewClass({...newClass, color: e.target.value})}
                className="w-8 h-8 rounded cursor-pointer border border-gray-300" 
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-ios-leather overflow-y-auto pb-20">
      <NavBar 
        title="Timetable" 
        rightAction={
          <button onClick={() => setIsAdding(true)} className="text-white p-1">
            <Plus size={24} style={{ filter: 'drop-shadow(0 -1px 0 rgba(0,0,0,0.5))' }} />
          </button>
        }
      />
      
      {/* Day Selector (Notebook Tabs look) */}
      <div className="flex overflow-x-auto bg-gradient-to-b from-[#8c5a31] to-[#5c3a21] border-b border-[#3a1a01] shadow-md">
        {days.map((day, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDay(idx)}
            className={`flex-1 py-2 px-3 text-xs font-bold text-center border-r border-[#3a1a01] ${
              selectedDay === idx 
                ? 'bg-ios-paper text-[#5c3a21] shadow-inner' 
                : 'text-[#e0c8b0] hover:bg-[#6c4a31]'
            }`}
            style={selectedDay === idx ? { borderRadius: '6px 6px 0 0', margin: '4px 2px 0 2px' } : {}}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Notebook Page */}
      <div className="flex-1 m-4 bg-ios-paper rounded-lg shadow-lg border border-[#d0c8a0] relative overflow-hidden">
        {/* Red margin line */}
        <div className="absolute left-10 top-0 bottom-0 w-px bg-red-400 opacity-50"></div>
        
        <div className="p-4 pl-14">
          <h2 className="text-xl font-bold text-[#5c3a21] mb-4 font-serif border-b border-blue-200 pb-2">
            {days[selectedDay]} Schedule
          </h2>
          
          {classesForDay.length === 0 ? (
            <p className="text-gray-500 italic font-serif mt-4">No classes scheduled.</p>
          ) : (
            <div className="space-y-4">
              {classesForDay.map(cls => (
                <div key={cls.id} className="relative">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{cls.title}</h3>
                    <span className="text-sm font-bold text-gray-600 bg-white/50 px-2 py-0.5 rounded border border-gray-300">
                      {cls.startTime} - {cls.endTime}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-3 h-3 rounded-full mr-2 shadow-inner" style={{ backgroundColor: cls.color }}></div>
                    <span>{cls.room}</span>
                  </div>
                  <div className="h-px bg-blue-200 mt-3 w-full"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
