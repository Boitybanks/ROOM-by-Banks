import React, { useState } from 'react';
import { UserProfile } from '../types';
import { BADGES, LOVE_LANGUAGES } from '../constants';

interface OnboardingScreenProps {
  onComplete: (profile: UserProfile) => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 18,
    bio: '',
    interests: [],
    photoUrl: '',
    birthdate: '',
    badges: [],
    loveLanguages: [],
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(profile);
  };

  const handleToggleBadge = (badge: string) => {
    setProfile(p => ({
      ...p,
      badges: p.badges?.includes(badge)
        ? p.badges.filter(b => b !== badge)
        : [...(p.badges || []), badge]
    }));
  };

  const handleToggleLoveLanguage = (language: string) => {
    setProfile(p => ({
      ...p,
      loveLanguages: p.loveLanguages?.includes(language)
        ? p.loveLanguages.filter(l => l !== language)
        : [...(p.loveLanguages || []), language]
    }));
  };
  
  const TagButton: React.FC<{ label: string; isSelected: boolean; onClick: () => void;}> = ({label, isSelected, onClick}) => (
     <button
        type="button"
        onClick={onClick}
        className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
          isSelected
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-indigo-700'
        }`}
      >
        {label}
      </button>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-center text-indigo-300 mb-2">Welcome to Room</h2>
            <p className="text-center text-gray-400 mb-6">Let's create your profile. First, tell us about yourself.</p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-gray-800 border border-indigo-800 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
               <input
                type="date"
                placeholder="Birthdate"
                value={profile.birthdate}
                onChange={(e) => setProfile({ ...profile, birthdate: e.target.value })}
                className="w-full bg-gray-800 border border-indigo-800 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                placeholder="Your Bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full bg-gray-800 border border-indigo-800 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
              />
            </div>
            <button onClick={handleNext} disabled={!profile.name || !profile.bio || !profile.birthdate} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        );
      case 2:
        return (
           <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold text-center text-indigo-300 mb-2">Express Yourself</h2>
            <p className="text-center text-gray-400 mb-6">Select tags that represent you.</p>
            
            <div className="space-y-6 flex-grow overflow-y-auto pr-2">
                <div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-3">Queer Badges</h3>
                    <div className="flex flex-wrap gap-2">
                        {BADGES.map(badge => (
                            <TagButton key={badge} label={badge} isSelected={profile.badges?.includes(badge) ?? false} onClick={() => handleToggleBadge(badge)} />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-3">Love Languages</h3>
                    <div className="flex flex-wrap gap-2">
                        {LOVE_LANGUAGES.map(lang => (
                            <TagButton key={lang} label={lang} isSelected={profile.loveLanguages?.includes(lang) ?? false} onClick={() => handleToggleLoveLanguage(lang)} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-auto pt-4">
                <button onClick={handleBack} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all">Back</button>
                <button onClick={handleNext} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-all">Next</button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-bold text-center text-indigo-300 mb-4">Add Your Profile Photo</h2>
             <p className="text-center text-gray-400 mb-6">This is how others will see you. Use a URL to a clear photo of yourself.</p>
            <div className="flex-grow flex items-center justify-center my-4">
                 <img 
                    src={profile.photoUrl || `https://api.dicebear.com/8.x/pixel-art/svg?seed=${profile.name || 'default'}&backgroundColor=indigo`} 
                    alt="Profile preview" 
                    className="w-40 h-40 rounded-full object-cover border-4 border-indigo-700 bg-gray-800" 
                 />
            </div>
             <div className="space-y-2">
                <label htmlFor="photo-url" className="block text-gray-400 text-sm">Photo URL</label>
                <input
                    id="photo-url"
                    type="text"
                    placeholder="https://example.com/your-photo.jpg"
                    value={profile.photoUrl}
                    onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
                    className="w-full bg-gray-800 border border-indigo-800 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="flex gap-4 mt-auto pt-4">
                <button onClick={handleBack} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all">Back</button>
                <button onClick={handleSubmit} disabled={!profile.photoUrl} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed">Start Swiping</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="p-6 flex flex-col h-full">{renderStep()}</div>;
};

export default OnboardingScreen;