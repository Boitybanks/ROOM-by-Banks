import React, { useState } from 'react';
import { ROOM_THEMES, RoomTheme } from '../constants';

interface ThemeSelectionScreenProps {
  onThemeSelect: (themeUrl: string) => void;
  onBack: () => void;
}

const ThemeSelectionScreen: React.FC<ThemeSelectionScreenProps> = ({ onThemeSelect, onBack }) => {
  const [selectedTheme, setSelectedTheme] = useState<RoomTheme | null>(null);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-indigo-900/50 text-center">
        <h1 className="text-xl font-bold text-indigo-300">Set the Mood</h1>
        <p className="text-sm text-gray-400">Choose a theme for your first meeting.</p>
      </div>
      
      <div className="flex-grow space-y-3 overflow-y-auto p-4 custom-scrollbar">
        {ROOM_THEMES.map(theme => (
          <div
            key={theme.name}
            onClick={() => setSelectedTheme(theme)}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedTheme(theme)}
            role="button"
            aria-pressed={selectedTheme?.name === theme.name}
            tabIndex={0}
            className={`cursor-pointer rounded-lg border-2 p-3 transition-all flex items-center gap-4 ${selectedTheme?.name === theme.name ? 'border-indigo-500 bg-indigo-900/50' : 'border-gray-700 hover:border-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-600'}`}
          >
            <img src={theme.imageUrl} alt={theme.name} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
            <div>
              <h3 className="font-bold text-white">{theme.name}</h3>
              <p className="text-sm text-gray-400">{theme.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-indigo-900/50 flex items-center gap-4">
        <button
            onClick={onBack}
            className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all"
        >
            Back
        </button>
        <button
          onClick={() => selectedTheme && onThemeSelect(selectedTheme.imageUrl)}
          disabled={!selectedTheme}
          className="w-2/3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Enter the Room
        </button>
      </div>
    </div>
  );
};

export default ThemeSelectionScreen;