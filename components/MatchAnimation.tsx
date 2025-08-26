import React, { useEffect, useState } from 'react';
import { Match } from '../types';

interface MatchAnimationProps {
  match: Match;
  onEnterRoom: () => void;
}

const MatchAnimation: React.FC<MatchAnimationProps> = ({ match, onEnterRoom }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-pulse mb-8">
          It's a Match!
        </h2>
        
        <div className="relative flex items-center justify-center w-64 h-32 mb-8">
            <div className={`transition-all duration-700 ease-out ${visible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                <img src={match.user.photoUrl} alt={match.user.name} className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"/>
            </div>
            <div className={`transition-all duration-700 ease-out delay-200 ${visible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                <img src={match.matchedUser.photoUrl} alt={match.matchedUser.name} className="w-32 h-32 rounded-full object-cover border-4 border-pink-500 shadow-lg -ml-12"/>
            </div>
        </div>

        <p className="text-lg text-gray-300 mb-10">
            You and <span className="font-bold text-white">{match.matchedUser.name}</span> have liked each other.
        </p>

        <button 
            onClick={onEnterRoom}
            className={`transition-all duration-500 ease-out delay-500 ${visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'} bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-indigo-500/30`}>
            Set the Mood
        </button>
    </div>
  );
};

export default MatchAnimation;