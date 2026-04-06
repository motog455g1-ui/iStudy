import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { useApp } from '../AppContext';
import { Plus } from 'lucide-react';

export const GradesTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { state, addGrade, deleteGrade } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [course, setCourse] = useState('');
  const [grade, setGrade] = useState('A');
  const [credits, setCredits] = useState(3);

  const gradePoints: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const calculateGPA = () => {
    if (state.grades.length === 0) return 0;
    let totalPoints = 0;
    let totalCredits = 0;
    state.grades.forEach(g => {
      totalPoints += (gradePoints[g.grade] || 0) * g.credits;
      totalCredits += g.credits;
    });
    return totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
  };

  const handleSave = () => {
    if (course.trim()) {
      addGrade({ course, grade, credits });
      setIsAdding(false);
      setCourse('');
    }
  };

  if (isAdding) {
    return (
      <div className="flex flex-col h-full bg-ios-linen">
        <NavBar 
          title="Add Grade" 
          onBack={() => setIsAdding(false)} 
          backLabel="Grades"
          rightAction={
            <button onClick={handleSave} className="ios-button-blue text-xs font-bold px-3 py-1">Save</button>
          }
        />
        <div className="p-4">
          <div className="ios-glass-panel overflow-hidden">
            <div className="p-3 border-b border-gray-300 flex items-center">
              <span className="w-24 font-bold text-gray-700">Course</span>
              <input 
                type="text" 
                value={course}
                onChange={e => setCourse(e.target.value)}
                placeholder="e.g. Calculus I"
                className="flex-1 bg-transparent outline-none text-gray-800"
              />
            </div>
            <div className="p-3 border-b border-gray-300 flex items-center">
              <span className="w-24 font-bold text-gray-700">Grade</span>
              <select 
                value={grade}
                onChange={e => setGrade(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-800"
              >
                {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="p-3 flex items-center">
              <span className="w-24 font-bold text-gray-700">Credits</span>
              <input 
                type="number" 
                value={credits}
                onChange={e => setCredits(Number(e.target.value))}
                min="1" max="6"
                className="flex-1 bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-ios-linen">
      <NavBar 
        title="Grades" 
        onBack={onBack} 
        backLabel="Tools"
        rightAction={
          <button onClick={() => setIsAdding(true)} className="text-white p-1">
            <Plus size={24} style={{ filter: 'drop-shadow(0 -1px 0 rgba(0,0,0,0.5))' }} />
          </button>
        }
      />
      
      <div className="p-4">
        {/* GPA Display */}
        <div className="ios-glass-panel p-6 text-center mb-6">
          <h2 className="text-gray-600 font-bold mb-2 uppercase tracking-wider text-sm">Cumulative GPA</h2>
          <div className="text-6xl font-bold text-blue-600 drop-shadow-md">
            {calculateGPA()}
          </div>
        </div>

        {/* Grades List */}
        <div className="ios-glass-panel overflow-hidden">
          <div className="bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-2 border-b border-gray-300">
            <h3 className="font-bold text-gray-700 text-sm shadow-sm">Course List</h3>
          </div>
          <div className="p-0">
            {state.grades.length === 0 ? (
              <p className="p-4 text-gray-500 text-center text-sm">No grades added yet.</p>
            ) : (
              state.grades.map((g, idx) => (
                <div key={g.id} className={`ios-list-item p-3 flex items-center justify-between ${idx !== state.grades.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div>
                    <h4 className="font-bold text-gray-800">{g.course}</h4>
                    <p className="text-xs text-gray-500">{g.credits} Credits</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-blue-600">{g.grade}</span>
                    <button onClick={() => deleteGrade(g.id)} className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-bold shadow-inner">
                      -
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
