import React, { useState, useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import { useApp } from '../AppContext';
import { Plus, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

export const NotesTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { state, addNote, updateNote, deleteNote } = useApp();
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const currentNote = state.notes.find(n => n.id === activeNote);

  useEffect(() => {
    if (currentNote && isEditing) {
      setNewTitle(currentNote.title);
      setNewContent(currentNote.content);
    }
  }, [currentNote, isEditing]);

  const handleSave = () => {
    if (newTitle.trim()) {
      if (activeNote === 'new') {
        addNote({ title: newTitle, content: newContent });
        setActiveNote(null);
      } else if (activeNote) {
        updateNote(activeNote, { title: newTitle, content: newContent });
        setIsEditing(false);
      }
      setNewTitle('');
      setNewContent('');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (activeNote && activeNote !== 'new') {
      deleteNote(activeNote);
      setActiveNote(null);
      setIsEditing(false);
    }
  };

  if (activeNote === 'new' || (currentNote && isEditing)) {
    return (
      <div className="flex flex-col h-full bg-[#fdfae5]" style={{ backgroundImage: 'linear-gradient(transparent 95%, #e0d8b0 95%)', backgroundSize: '100% 32px' }}>
        <NavBar 
          title={activeNote === 'new' ? "New Note" : "Edit Note"} 
          onBack={() => {
            if (activeNote === 'new') {
              setActiveNote(null);
            } else {
              setIsEditing(false);
            }
          }} 
          backLabel="Cancel"
          rightAction={
            <button onClick={handleSave} className="ios-button-blue text-xs font-bold px-3 py-1">Save</button>
          }
        />
        <div className="flex-1 p-4 relative flex flex-col">
          <div className="absolute left-10 top-0 bottom-0 w-px bg-red-400 opacity-50 pointer-events-none"></div>
          <div className="pl-10 flex-1 flex flex-col">
            <input 
              type="text" 
              placeholder="Title" 
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full bg-transparent font-serif text-xl font-bold text-gray-800 outline-none mb-2 placeholder-gray-400"
            />
            <textarea 
              placeholder="Start typing..." 
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              className="w-full flex-1 bg-transparent font-serif text-lg text-gray-700 outline-none resize-none leading-[32px] placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    );
  }

  if (currentNote) {
    return (
      <div className="flex flex-col h-full bg-[#fdfae5]" style={{ backgroundImage: 'linear-gradient(transparent 95%, #e0d8b0 95%)', backgroundSize: '100% 32px' }}>
        <NavBar 
          title="Note" 
          onBack={() => setActiveNote(null)} 
          backLabel="Notes" 
          rightAction={
            <button onClick={handleEdit} className="ios-button-blue text-xs font-bold px-3 py-1">Edit</button>
          }
        />
        <div className="flex-1 p-4 relative overflow-y-auto">
          <div className="absolute left-10 top-0 bottom-0 w-px bg-red-400 opacity-50 pointer-events-none"></div>
          <div className="pl-10">
            <h2 className="font-serif text-xl font-bold text-gray-800 mb-2">{currentNote.title}</h2>
            <p className="font-serif text-lg text-gray-700 whitespace-pre-wrap leading-[32px] mb-8">{currentNote.content}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f4f4f4]">
      <NavBar 
        title="Notes" 
        onBack={onBack} 
        backLabel="Tools"
        rightAction={
          <button onClick={() => setActiveNote('new')} className="text-white p-1">
            <Plus size={24} style={{ filter: 'drop-shadow(0 -1px 0 rgba(0,0,0,0.5))' }} />
          </button>
        }
      />
      
      <div className="flex-1 overflow-y-auto">
        {state.notes.length === 0 ? (
          <div className="p-8 text-center text-gray-500 font-serif">
            No notes yet. Tap + to create one.
          </div>
        ) : (
          <div className="bg-white border-y border-gray-300 mt-4">
            {state.notes.map((note, idx) => (
              <div 
                key={note.id} 
                onClick={() => setActiveNote(note.id)}
                className={`flex items-center justify-between p-3 active:bg-blue-500 active:text-white group ${idx !== state.notes.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <div>
                  <h3 className="font-bold text-gray-800 group-active:text-white">{note.title}</h3>
                  <p className="text-xs text-gray-500 group-active:text-blue-100">{format(new Date(note.createdAt), 'MMM d, yyyy')}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-active:text-white" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
