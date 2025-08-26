
import React, { useState, useMemo } from 'react';
import { UserProfile } from '../types';
import { SWIPE_PROFILES, SPECIAL_MATCH_PROFILE } from '../constants';
import SwipeCard from './SwipeCard';
import { HeartIcon } from './icons/HeartIcon';
import { XIcon } from './icons/XIcon';

interface SwipeScreenProps {
  onMatch: (profile: UserProfile) => void;
}

type SwipeDirection = 'left' | 'right';

const SwipeScreen: React.FC<SwipeScreenProps> = ({ onMatch }) => {
  const allProfiles = useMemo(() => [SPECIAL_MATCH_PROFILE, ...SWIPE_PROFILES.sort(() => 0.5 - Math.random())], []);
  const [profiles, setProfiles] = useState<UserProfile[]>(allProfiles);
  const [swiping, setSwiping] = useState<SwipeDirection | null>(null);

  const currentProfile = profiles.length > 0 ? profiles[profiles.length - 1] : null;

  const handleSwipe = (direction: SwipeDirection) => {
    if (!currentProfile) return;
    setSwiping(direction);

    setTimeout(() => {
      if (direction === 'right' && currentProfile.name === 'Orion') {
        onMatch(currentProfile);
      }
      setProfiles(prev => prev.slice(0, prev.length - 1));
      setSwiping(null);
    }, 400); // Animation duration
  };

  const swipeAnimationClasses = {
    left: 'transform -translate-x-full rotate-[-20deg]',
    right: 'transform translate-x-full rotate-[20deg]',
  };

  return (
    <div className="flex flex-col h-full bg-gray-900/50">
      <div className="p-4 border-b border-indigo-900/50 text-center">
        <h1 className="text-xl font-bold text-indigo-300">Discover</h1>
      </div>
      <div className="flex-grow flex items-center justify-center p-4 relative">
        {profiles.length > 0 ? (
          profiles.map((profile, index) => {
            const isTopCard = index === profiles.length - 1;
            return (
              <div
                key={profile.name}
                className={`absolute w-full h-full transition-all duration-300 ease-in-out ${
                  isTopCard && swiping ? swipeAnimationClasses[swiping] : ''
                } ${
                  isTopCard ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transform: `scale(${1 - (profiles.length - 1 - index) * 0.05}) translateY(-${(profiles.length - 1 - index) * 10}px)`,
                  zIndex: index,
                }}
              >
                <SwipeCard profile={profile} />
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-400">
            <p className="text-lg">That's everyone for now!</p>
            <p>Check back later for new profiles.</p>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-8 p-4 border-t border-indigo-900/50">
        <button onClick={() => handleSwipe('left')} className="w-16 h-16 rounded-full bg-red-900/30 text-red-400 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
          <XIcon className="w-8 h-8" />
        </button>
        <button onClick={() => handleSwipe('right')} className="w-20 h-20 rounded-full bg-green-900/40 text-green-300 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
          <HeartIcon className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default SwipeScreen;
