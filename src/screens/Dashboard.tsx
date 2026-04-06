import React from 'react';
import { NavBar } from '../components/NavBar';
import { useApp } from '../AppContext';
import { format } from 'date-fns';

export const Dashboard: React.FC = () => {
  const { state } = useApp();
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday

  const todaysClasses = state.classes.filter(c => c.dayOfWeek === dayOfWeek).sort((a, b) => a.startTime.localeCompare(b.startTime));
  const pendingTasks = state.tasks.filter(t => !t.completed);

  return (
    <div className="flex flex-col h-full bg-ios-linen overflow-y-auto pb-20">
      <NavBar title="iStudy" />
      
      <div className="p-4 space-y-4">
        {/* Date Widget */}
        <div className="ios-glass-panel p-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{format(today, 'EEEE')}</h2>
            <p className="text-gray-600">{format(today, 'MMMM d, yyyy')}</p>
          </div>
          <div className="text-4xl font-light text-blue-600">
            {format(today, 'd')}
          </div>
        </div>

        {/* Today's Classes */}
        <div className="ios-glass-panel overflow-hidden">
          <div className="bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-2 border-b border-gray-300">
            <h3 className="font-bold text-gray-700 text-sm shadow-sm">Today's Classes</h3>
          </div>
          <div className="p-0">
            {todaysClasses.length === 0 ? (
              <p className="p-4 text-gray-500 text-center text-sm">No classes today. Enjoy your day off!</p>
            ) : (
              todaysClasses.map((cls, idx) => (
                <div key={cls.id} className={`ios-list-item p-3 flex items-center ${idx !== todaysClasses.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="w-3 h-10 rounded-full mr-3" style={{ backgroundColor: cls.color }}></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{cls.title}</h4>
                    <p className="text-xs text-gray-500">{cls.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-700">{cls.startTime}</p>
                    <p className="text-xs text-gray-500">{cls.endTime}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="ios-glass-panel overflow-hidden">
          <div className="bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-2 border-b border-gray-300 flex justify-between items-center">
            <h3 className="font-bold text-gray-700 text-sm shadow-sm">Pending Tasks</h3>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-inner">
              {pendingTasks.length}
            </span>
          </div>
          <div className="p-0">
            {pendingTasks.slice(0, 3).map((task, idx) => (
              <div key={task.id} className={`ios-list-item p-3 flex items-center ${idx !== pendingTasks.slice(0, 3).length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="w-5 h-5 rounded border border-gray-400 mr-3 shadow-inner bg-white"></div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm">{task.title}</h4>
                  {task.dueDate && <p className="text-xs text-red-500">Due: {format(new Date(task.dueDate), 'MMM d')}</p>}
                </div>
              </div>
            ))}
            {pendingTasks.length > 3 && (
              <div className="p-2 text-center bg-gray-50 border-t border-gray-200">
                <span className="text-blue-600 text-xs font-bold">View all {pendingTasks.length} tasks...</span>
              </div>
            )}
            {pendingTasks.length === 0 && (
              <p className="p-4 text-gray-500 text-center text-sm">All caught up!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
