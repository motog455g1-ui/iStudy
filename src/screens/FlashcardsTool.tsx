import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { useApp } from '../AppContext';
import { Plus, RotateCcw } from 'lucide-react';

export const FlashcardsTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { state, addFlashcardDeck } = useApp();
  const [activeDeck, setActiveDeck] = useState<string | null>(null);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newDeckTitle, setNewDeckTitle] = useState('');

  const deck = state.flashcardDecks.find(d => d.id === activeDeck);

  const handleSave = () => {
    if (newDeckTitle.trim()) {
      addFlashcardDeck({ title: newDeckTitle, cards: [] });
      setIsAdding(false);
      setNewDeckTitle('');
    }
  };

  if (isAdding) {
    return (
      <div className="flex flex-col h-full bg-ios-wood">
        <NavBar 
          title="New Deck" 
          onBack={() => setIsAdding(false)} 
          backLabel="Cancel"
          rightAction={
            <button onClick={handleSave} className="ios-button-blue text-xs font-bold px-3 py-1">Save</button>
          }
        />
        <div className="p-4">
          <div className="ios-glass-panel overflow-hidden">
            <div className="p-3 flex items-center">
              <span className="w-24 font-bold text-gray-700">Title</span>
              <input 
                type="text" 
                value={newDeckTitle}
                onChange={e => setNewDeckTitle(e.target.value)}
                placeholder="Deck Name"
                className="flex-1 bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (deck) {
    const card = deck.cards[currentCardIdx];

    const nextCard = () => {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentCardIdx((prev) => (prev + 1) % deck.cards.length);
      }, 150);
    };

    return (
      <div className="flex flex-col h-full bg-ios-wood">
        <NavBar title={deck.title} onBack={() => setActiveDeck(null)} backLabel="Decks" />
        
        <div className="flex-1 flex flex-col items-center justify-center p-6 perspective-1000">
          {deck.cards.length === 0 ? (
            <div className="ios-glass-panel p-8 text-center">
              <p>No cards in this deck.</p>
              <p className="text-xs text-gray-500 mt-2">Edit feature coming soon.</p>
            </div>
          ) : (
            <>
              <div className="text-white font-bold mb-4 drop-shadow-md">
                Card {currentCardIdx + 1} of {deck.cards.length}
              </div>
              
              <div 
                className="w-full max-w-sm aspect-[3/2] relative cursor-pointer"
                style={{ perspective: '1000px' }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div 
                  className="w-full h-full absolute transition-transform duration-500"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front */}
                  <div 
                    className="absolute w-full h-full bg-white rounded-xl shadow-xl border border-gray-300 flex items-center justify-center p-6 backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <h2 className="text-3xl font-bold text-gray-800 text-center">{card.front}</h2>
                  </div>
                  
                  {/* Back */}
                  <div 
                    className="absolute w-full h-full bg-blue-50 rounded-xl shadow-xl border border-blue-200 flex items-center justify-center p-6 backface-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <h2 className="text-3xl font-bold text-blue-800 text-center">{card.back}</h2>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex space-x-4">
                <button 
                  onClick={nextCard}
                  className="ios-button-blue px-8 py-3 text-lg font-bold"
                >
                  Next Card
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-ios-wood">
      <NavBar 
        title="Flashcards" 
        onBack={onBack} 
        backLabel="Tools"
        rightAction={
          <button onClick={() => setIsAdding(true)} className="text-white p-1">
            <Plus size={24} style={{ filter: 'drop-shadow(0 -1px 0 rgba(0,0,0,0.5))' }} />
          </button>
        }
      />
      
      <div className="p-4 grid grid-cols-2 gap-4">
        {state.flashcardDecks.map(deck => (
          <div 
            key={deck.id}
            onClick={() => setActiveDeck(deck.id)}
            className="bg-white rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.4)] border border-gray-300 p-4 aspect-square flex flex-col justify-between cursor-pointer active:scale-95 transition-transform"
          >
            <div>
              <h3 className="font-bold text-gray-800 text-lg leading-tight">{deck.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{deck.cards.length} cards</p>
            </div>
            <div className="flex justify-end">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <RotateCcw size={16} className="text-blue-600" />
              </div>
            </div>
          </div>
        ))}
        
        <div 
          onClick={() => setIsAdding(true)}
          className="bg-white/20 rounded-lg border-2 border-dashed border-white/50 p-4 aspect-square flex flex-col items-center justify-center cursor-pointer active:bg-white/30 transition-colors"
        >
          <Plus size={32} className="text-white drop-shadow-md mb-2" />
          <span className="text-white font-bold drop-shadow-md">New Deck</span>
        </div>
      </div>
    </div>
  );
};
