import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, Task, ClassEvent, Note, Grade, FlashcardDeck } from './types';

const defaultState: AppState = {
  tasks: [
    { id: '1', title: 'Calculus Assignment 3', completed: false, category: 'Homework', dueDate: new Date() },
    { id: '2', title: 'History Midterm', completed: false, category: 'Exam', dueDate: new Date(Date.now() + 86400000 * 2) },
  ],
  classes: [
    { id: '1', title: 'Calculus I', dayOfWeek: 1, startTime: '09:00', endTime: '10:30', room: 'Room 101', color: '#ff3b30' },
    { id: '2', title: 'Physics', dayOfWeek: 1, startTime: '11:00', endTime: '12:30', room: 'Lab 2', color: '#007aff' },
    { id: '3', title: 'History', dayOfWeek: 2, startTime: '10:00', endTime: '11:30', room: 'Hall A', color: '#ffcc00' },
  ],
  notes: [
    { id: '1', title: 'Physics Formulas', content: 'F = ma\nE = mc^2\nv = u + at', createdAt: new Date() }
  ],
  grades: [
    { id: '1', course: 'Calculus I', grade: 'A', credits: 4 },
    { id: '2', course: 'Physics', grade: 'B+', credits: 3 },
  ],
  flashcardDecks: [
    {
      id: '1',
      title: 'Spanish Vocab',
      cards: [
        { id: '1', front: 'Hola', back: 'Hello' },
        { id: '2', front: 'Gato', back: 'Cat' },
      ]
    }
  ]
};

type AppContextType = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addClass: (cls: Omit<ClassEvent, 'id'>) => void;
  deleteClass: (id: string) => void;
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  updateNote: (id: string, note: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
  deleteNote: (id: string) => void;
  addGrade: (grade: Omit<Grade, 'id'>) => void;
  deleteGrade: (id: string) => void;
  addFlashcardDeck: (deck: Omit<FlashcardDeck, 'id'>) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'istudy_3gs_data';

const loadState = (): AppState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      return {
        ...parsed,
        tasks: parsed.tasks?.map((t: any) => ({
          ...t,
          dueDate: t.dueDate ? new Date(t.dueDate) : undefined
        })) || [],
        notes: parsed.notes?.map((n: any) => ({
          ...n,
          createdAt: n.createdAt ? new Date(n.createdAt) : new Date()
        })) || [],
        classes: parsed.classes || [],
        grades: parsed.grades || [],
        flashcardDecks: parsed.flashcardDecks || []
      };
    }
  } catch (e) {
    console.error('Failed to load state from local storage', e);
  }
  return defaultState;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(loadState());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addTask = (task: Omit<Task, 'id'>) => {
    setState(s => ({ ...s, tasks: [...s.tasks, { ...task, id: Date.now().toString() }] }));
  };

  const toggleTask = (id: string) => {
    setState(s => ({
      ...s,
      tasks: s.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    }));
  };

  const deleteTask = (id: string) => {
    setState(s => ({ ...s, tasks: s.tasks.filter(t => t.id !== id) }));
  };

  const addClass = (cls: Omit<ClassEvent, 'id'>) => {
    setState(s => ({ ...s, classes: [...s.classes, { ...cls, id: Date.now().toString() }] }));
  };

  const deleteClass = (id: string) => {
    setState(s => ({ ...s, classes: s.classes.filter(c => c.id !== id) }));
  };

  const addNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
    setState(s => ({ ...s, notes: [...s.notes, { ...note, id: Date.now().toString(), createdAt: new Date() }] }));
  };

  const updateNote = (id: string, note: Partial<Omit<Note, 'id' | 'createdAt'>>) => {
    setState(s => ({
      ...s,
      notes: s.notes.map(n => n.id === id ? { ...n, ...note } : n)
    }));
  };

  const deleteNote = (id: string) => {
    setState(s => ({ ...s, notes: s.notes.filter(n => n.id !== id) }));
  };

  const addGrade = (grade: Omit<Grade, 'id'>) => {
    setState(s => ({ ...s, grades: [...s.grades, { ...grade, id: Date.now().toString() }] }));
  };

  const deleteGrade = (id: string) => {
    setState(s => ({ ...s, grades: s.grades.filter(g => g.id !== id) }));
  };

  const addFlashcardDeck = (deck: Omit<FlashcardDeck, 'id'>) => {
    setState(s => ({ ...s, flashcardDecks: [...s.flashcardDecks, { ...deck, id: Date.now().toString() }] }));
  };

  return (
    <AppContext.Provider value={{ state, setState, addTask, toggleTask, deleteTask, addClass, deleteClass, addNote, updateNote, deleteNote, addGrade, deleteGrade, addFlashcardDeck }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
