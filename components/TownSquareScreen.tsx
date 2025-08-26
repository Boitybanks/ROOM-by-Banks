import React, { useState, useEffect, useRef, useMemo } from 'react';
import { UserProfile, CommunitySpark } from '../types';
import { SWIPE_PROFILES, SPECIAL_MATCH_PROFILE, COMMUNITY_SPARKS, ACTIVITY_FEED_ITEMS } from '../constants';
import SwipeCard from './SwipeCard';
import SparkModal from './SparkModal';
import { SparkleIcon } from './icons/SparkleIcon';
import { HeartIcon } from './icons/HeartIcon';
import { XIcon } from './icons/XIcon';
import { StreakIcon } from './icons/StreakIcon';
import { EyeIcon } from './icons/EyeIcon';

interface TownSquareScreenProps {
  userProfile: UserProfile;
  onMatch: (profile: UserProfile) => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

interface Bubble {
  id: string | number;
  type: 'profile' | 'spark';
  data: UserProfile | CommunitySpark;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
}

const DashboardHeader: React.FC<{ userProfile: UserProfile }> = ({ userProfile }) => (
    <div className="flex items-center justify-between p-4 border-b border-indigo-900/50 text-center">
        <div>
            <h1 className="text-xl font-bold text-indigo-300">Welcome, {userProfile.name}</h1>
            <p className="text-sm text-gray-400">The community is buzzing.</p>
        </div>
        <div className="flex items-center gap-2 text-orange-400">
            <StreakIcon className="w-6 h-6" />
            <span className="font-bold text-lg">{userProfile.dailyStreak ?? 0}</span>
        </div>
    </div>
);

const DailyRitual: React.FC<{ onReveal: () => void, completed: boolean }> = ({ onReveal, completed }) => (
    <div className="p-4">
        <div className="bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-gray-900/50 p-5 rounded-lg border border-purple-700/50 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
                <SparkleIcon className="w-6 h-6 text-purple-300" />
                <h2 className="text-lg font-bold text-white">Your Daily Ritual</h2>
            </div>
            <p className="text-gray-400 text-sm mb-4">
                {completed ? "You've claimed your vibe for the day. See what tomorrow brings!" : "Reveal a featured profile, a community secret, or a vibe boost."}
            </p>
            <button
                onClick={onReveal}
                disabled={completed}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded-lg transition-all disabled:bg-gray-700 disabled:cursor-not-allowed disabled:text-gray-400 flex items-center justify-center gap-2 shadow-md shadow-purple-500/20"
            >
                {completed ? "Revealed" : "Reveal Today's Vibe"}
            </button>
        </div>
    </div>
);

const ActivityFeed: React.FC = () => {
    const [currentItem, setCurrentItem] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentItem(prev => (prev + 1) % ACTIVITY_FEED_ITEMS.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="px-4 pb-4">
            <div className="flex items-center gap-3 mb-3 px-1">
                <EyeIcon className="w-5 h-5 text-teal-300" />
                <h2 className="text-lg font-bold text-white">Happening Now</h2>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg border border-teal-800/50 text-center overflow-hidden h-10 flex items-center justify-center">
                <p className="text-teal-200 text-sm animate-fade-in-out" key={currentItem}>
                    {ACTIVITY_FEED_ITEMS[currentItem]}
                </p>
            </div>
        </div>
    );
};

interface ExploreSectionProps {
    onSelectBubble: (bubble: Bubble) => void;
    bubbles: Bubble[];
    exploreContainerRef: React.RefObject<HTMLDivElement>;
}

const ExploreSection: React.FC<ExploreSectionProps> = ({ onSelectBubble, bubbles, exploreContainerRef }) => {
    return (
        <div className="px-4 pb-4">
             <div className="flex items-center gap-3 mb-3 px-1">
                <SparkleIcon className="w-5 h-5 text-indigo-300" />
                <h2 className="text-lg font-bold text-white">Explore the Square</h2>
            </div>
            <div ref={exploreContainerRef} className="h-48 relative overflow-hidden bg-gradient-to-br from-indigo-950/20 via-black/10 to-black/30 rounded-lg border border-indigo-800/50">
                {bubbles.map(bubble => (
                    <button
                        key={bubble.id}
                        className="absolute rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-4"
                        style={{
                        left: `${bubble.x}px`,
                        top: `${bubble.y}px`,
                        width: `${bubble.size}px`,
                        height: `${bubble.size}px`,
                        }}
                        onClick={() => onSelectBubble(bubble)}
                    >
                        {bubble.type === 'profile' ? (
                        <img
                            src={(bubble.data as UserProfile).photoUrl}
                            alt={(bubble.data as UserProfile).name}
                            className="w-full h-full object-cover rounded-full border-2 border-indigo-500/50 shadow-lg"
                        />
                        ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg border-2 border-purple-400/50">
                            <SparkleIcon className="w-2/3 h-2/3 opacity-80" />
                        </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};


const TownSquareScreen: React.FC<TownSquareScreenProps> = ({ userProfile, onMatch, onUpdateProfile }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [selectedSpark, setSelectedSpark] = useState<CommunitySpark | null>(null);
  const [dailyRitualCompleted, setDailyRitualCompleted] = useState(false);
  // FIX: Initialize useRef with null to provide an initial value and use a type that allows null.
  const animationFrameId = useRef<number | null>(null);
  const exploreContainerRef = useRef<HTMLDivElement>(null);

  const initialBubbles = useMemo(() => {
    const profiles = [SPECIAL_MATCH_PROFILE, ...SWIPE_PROFILES];
    return [
      ...profiles.map(p => ({ type: 'profile' as const, data: p, id: p.name })),
      ...COMMUNITY_SPARKS.map(s => ({ type: 'spark' as const, data: s, id: `spark-${s.id}` }))
    ].sort(() => 0.5 - Math.random());
  }, []);

  useEffect(() => {
    let isMounted = true;
    let initialized = false;

    const animate = () => {
      if (!isMounted) return;
      const container = exploreContainerRef.current;
      if (!container) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      if (!initialized) {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        setBubbles(initialBubbles.slice(0, 10).map(item => {
          const size = item.type === 'profile' ? (Math.random() * 15 + 60) : 50;
          return {
            ...item,
            size,
            x: Math.random() * (containerWidth - size),
            y: Math.random() * (containerHeight - size),
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
          };
        }));
        initialized = true;
      }

      setBubbles(prevBubbles => {
        if (prevBubbles.length === 0) return [];
        const { offsetWidth: containerWidth, offsetHeight: containerHeight } = container;
        return prevBubbles.map(bubble => {
          let newX = bubble.x + bubble.dx;
          let newY = bubble.y + bubble.dy;
          let newDx = bubble.dx;
          let newDy = bubble.dy;

          if (newX <= 0 || newX + bubble.size >= containerWidth) newDx = -newDx;
          if (newY <= 0 || newY + bubble.size >= containerHeight) newDy = -newDy;
          
          newX = Math.max(0, Math.min(newX, containerWidth - bubble.size));
          newY = Math.max(0, Math.min(newY, containerHeight - bubble.size));

          return { ...bubble, x: newX, y: newY, dx: newDx, dy: newDy };
        });
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      // FIX: Check for null explicitly, as animation frame ID can be 0.
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [initialBubbles]);


  const handleSelectBubble = (bubble: Bubble) => {
    if (bubble.type === 'profile') {
      setSelectedProfile(bubble.data as UserProfile);
    } else {
      setSelectedSpark(bubble.data as CommunitySpark);
    }
  };
  
  const handleDecision = (action: 'like' | 'pass') => {
    if (!selectedProfile) return;
    
    if (action === 'like' && selectedProfile.name === 'Orion') {
        onMatch(selectedProfile);
    }

    setBubbles(prev => prev.filter(b => b.id !== selectedProfile.name));
    setSelectedProfile(null);
  }

  const handleRevealRitual = () => {
    if (dailyRitualCompleted) return;
    setDailyRitualCompleted(true);
    onUpdateProfile({ dailyStreak: (userProfile.dailyStreak ?? 0) + 1 });
    
    const randomSpark = COMMUNITY_SPARKS[Math.floor(Math.random() * COMMUNITY_SPARKS.length)];
    setSelectedSpark(randomSpark);
  }

  return (
    <div className="flex flex-col h-full bg-gray-900/50">
      <DashboardHeader userProfile={userProfile} />
      
      <div className="flex-grow overflow-y-auto">
        <DailyRitual onReveal={handleRevealRitual} completed={dailyRitualCompleted} />
        <ActivityFeed />
        <ExploreSection bubbles={bubbles} onSelectBubble={handleSelectBubble} exploreContainerRef={exploreContainerRef} />
      </div>

      {selectedProfile && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-40 flex flex-col items-center justify-center p-4">
            <div className="relative w-full h-full max-h-[600px]">
                 <SwipeCard profile={selectedProfile} />
            </div>
            <div className="flex justify-center items-center gap-8 p-4 mt-4">
                <button onClick={() => handleDecision('pass')} className="w-16 h-16 rounded-full bg-red-900/30 text-red-400 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                    <XIcon className="w-8 h-8" />
                </button>
                <button onClick={() => handleDecision('like')} className="w-20 h-20 rounded-full bg-green-900/40 text-green-300 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                    <HeartIcon className="w-10 h-10" />
                </button>
            </div>
             <button onClick={() => setSelectedProfile(null)} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2">
                <XIcon className="w-6 h-6" />
            </button>
        </div>
      )}

      {selectedSpark && <SparkModal spark={selectedSpark} onClose={() => setSelectedSpark(null)} />}
    </div>
  );
};

export default TownSquareScreen;