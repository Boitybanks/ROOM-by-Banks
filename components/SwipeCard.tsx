import React from 'react';
import { UserProfile } from '../types';

// Fix: Define the SwipeCardProps interface.
interface SwipeCardProps {
  profile: UserProfile;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ profile }) => {
  return (
    <div className="absolute w-full h-full bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-transparent">
        <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 w-full h-2/3 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent flex flex-col justify-end">
            <h3 className="text-3xl font-bold text-white shadow-lg">{profile.name}, {profile.age}</h3>
            <p className="text-gray-200 mt-1 text-sm shadow-md">{profile.bio}</p>
            <div className="flex flex-wrap gap-2 mt-3">
                {profile.interests.map(interest => (
                    <span key={interest} className="bg-indigo-500/30 text-indigo-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {interest}
                    </span>
                ))}
            </div>

            {profile.highlights && profile.highlights.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-3">
                  {profile.highlights.map((highlight, index) => (
                    <div key={index} className="group relative">
                       <img 
                          src={highlight.imageUrl} 
                          alt={`Highlight ${index + 1}`} 
                          className="w-14 h-14 rounded-full object-cover border-2 border-indigo-400"
                        />
                        <div className="absolute bottom-full mb-2 w-40 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-center transform -translate-x-1/2 left-1/2">
                          {highlight.description}
                          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

             <div className="flex-grow min-h-[1rem]"></div>
            {(profile.badges && profile.badges.length > 0) || (profile.loveLanguages && profile.loveLanguages.length > 0) ? (
                 <div className="border-t border-white/20 pt-3 mt-3 space-y-2">
                     {profile.badges && profile.badges.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                             {profile.badges.map(badge => (
                                <span key={badge} className="bg-pink-500/40 text-pink-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                                    {badge}
                                </span>
                            ))}
                        </div>
                    )}
                     {profile.loveLanguages && profile.loveLanguages.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                             {profile.loveLanguages.map(lang => (
                                <span key={lang} className="bg-purple-500/40 text-purple-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                                    {lang}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    </div>
  );
};

export default SwipeCard;