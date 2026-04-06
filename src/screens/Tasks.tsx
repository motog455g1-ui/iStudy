import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { useApp } from '../AppContext';
import { Plus, Check } from 'lucide-react';
import { format } from 'date-fns';

export const Tasks: React.FC = () => {
  const { state, toggleTask, addTask } = useApp();
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('Pending');
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'Homework' | 'Exam' | 'Project' | 'Other'>('Homework');
  const [newTaskDate, setNewTaskDate] = useState('');

  const filteredTasks = state.tasks.filter(t => {
    if (filter === 'Pending') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  const handleSave = () => {
    if (newTaskTitle.trim()) {
      addTask({ 
        title: newTaskTitle, 
        category: newTaskCategory, 
        completed: false, 
        dueDate: newTaskDate ? new Date(newTaskDate) : undefined 
      });
      setIsAdding(false);
      setNewTaskTitle('');
      setNewTaskDate('');
    }
  };

  if (isAdding) {
    return (
      <div className="flex flex-col h-full bg-ios-linen">
        <NavBar 
          title="New Task" 
          onBack={() => setIsAdding(false)} 
          backLabel="Cancel"
          rightAction={
            <button onClick={handleSave} className="ios-button-blue text-xs font-bold px-3 py-1">Save</button>
          }
        />
        <div className="p-4">
          <div className="ios-glass-panel overflow-hidden">
            <div className="p-3 border-b border-gray-300 flex items-center">
              <span className="w-24 font-bold text-gray-700">Title</span>
              <input 
                type="text" 
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                placeholder="Task Title"
                className="flex-1 bg-transparent outline-none text-gray-800"
              />
            </div>
            <div className="p-3 border-b border-gray-300 flex items-center">
              <span className="w-24 font-bold text-gray-700">Category</span>
              <select 
                value={newTaskCategory}
                onChange={e => setNewTaskCategory(e.target.value as any)}
                className="flex-1 bg-transparent outline-none text-gray-800"
              >
                <option value="Homework">Homework</option>
                <option value="Exam">Exam</option>
                <option value="Project">Project</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="p-3 flex items-center">
              <span className="w-24 font-bold text-gray-700">Due Date</span>
              <input 
                type="date" 
                value={newTaskDate}
                onChange={e => setNewTaskDate(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f4f4f4] overflow-y-auto pb-20">
      <NavBar 
        title="Tasks" 
        rightAction={
          <button onClick={() => setIsAdding(true)} className="text-white p-1">
            <Plus size={24} style={{ filter: 'drop-shadow(0 -1px 0 rgba(0,0,0,0.5))' }} />
          </button>
        }
      />
      
      {/* Segmented Control */}
      <div className="p-3 bg-gradient-to-b from-gray-200 to-gray-300 border-b border-gray-400 flex justify-center">
        <div className="flex bg-white rounded-lg border border-gray-400 overflow-hidden shadow-sm w-full max-w-xs">
          {['All', 'Pending', 'Completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`flex-1 py-1 text-xs font-bold border-r border-gray-300 last:border-r-0 ${
                filter === f 
                  ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-inner' 
                  : 'bg-gradient-to-b from-white to-gray-100 text-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Task List - Yellow Notepad Look */}
      <div className="flex-1 bg-[#fdfae5] relative" style={{ backgroundImage: 'linear-gradient(transparent 95%, #e0d8b0 95%)', backgroundSize: '100% 40px' }}>
        {/* Red margin line */}
        <div className="absolute left-12 top-0 bottom-0 w-px bg-red-400 opacity-50"></div>
        
        <div className="pt-2">
          {filteredTasks.length === 0 ? (
            <p className="pl-16 pt-4 text-gray-500 italic font-serif text-lg">No tasks found.</p>
          ) : (
            filteredTasks.map(task => (
              <div 
                key={task.id} 
                className="flex items-center h-[40px] px-2 relative cursor-pointer"
                onClick={() => toggleTask(task.id)}
              >
                <div className="w-10 flex justify-center z-10">
                  <div className={`w-6 h-6 rounded border ${task.completed ? 'bg-blue-500 border-blue-600' : 'bg-white border-gray-400'} shadow-inner flex items-center justify-center`}>
                    {task.completed && <Check size={16} color="white" strokeWidth={3} />}
                  </div>
                </div>
                <div className="flex-1 pl-4 z-10 flex justify-between items-center">
                  <span className={`font-serif text-lg ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {task.title}
                  </span>
                  {task.dueDate && !task.completed && (
                    <span className="text-xs text-red-500 font-bold bg-white/50 px-1 rounded">
                      {format(new Date(task.dueDate), 'MMM d')}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
