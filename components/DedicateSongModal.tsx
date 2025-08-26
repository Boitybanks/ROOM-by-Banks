import React, { useState } from 'react';

interface DedicateSongModalProps {
  onDedicate: (title: string, artist: string) => void;
  onClose: () => void;
}

const DedicateSongModal: React.FC<DedicateSongModalProps> = ({ onDedicate, onClose }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  const handleSubmit = () => {
    if (title && artist) {
      onDedicate(title, artist);
    }
  };

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-indigo-700 rounded-lg p-6 w-full max-w-sm shadow-2xl shadow-indigo-500/20">
        <h2 className="text-xl font-bold text-indigo-300 mb-4">Dedicate a Song</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-900 border border-indigo-800 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full bg-gray-900 border border-indigo-800 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-4 mt-6">
          <button onClick={onClose} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded-lg transition-all">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={!title || !artist} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-lg transition-all disabled:bg-gray-500 disabled:cursor-not-allowed">
            Dedicate
          </button>
        </div>
      </div>
    </div>
  );
};

export default DedicateSongModal;
