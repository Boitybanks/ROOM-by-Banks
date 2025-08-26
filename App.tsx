import React, { useState, useCallback } from 'react';
import { AppState, UserProfile, Match } from './types';
import OnboardingScreen from './components/OnboardingScreen';
import SwipeScreen from './components/SwipeScreen';
import MatchAnimation from './components/MatchAnimation';
import RoomScreen from './components/RoomScreen';
import ThemeSelectionScreen from './components/ThemeSelectionScreen';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Onboarding);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [match, setMatch] = useState<Match | null>(null);

  const handleOnboardingComplete = useCallback((profile: UserProfile) => {
    setUserProfile(profile);
    setAppState(AppState.Swiping);
  }, []);

  const handleMatch = useCallback((matchedProfile: UserProfile) => {
    if (userProfile) {
      setMatch({ user: userProfile, matchedUser: matchedProfile });
      setAppState(AppState.Matched);
    }
  }, [userProfile]);

  const handleProceedToThemeSelection = useCallback(() => {
    setAppState(AppState.ThemeSelection);
  }, []);

  const handleBackToMatch = useCallback(() => {
    setAppState(AppState.Matched);
  }, []);

  const handleThemeSelected = useCallback((theme: string) => {
    if (match) {
      setMatch(m => m ? { ...m, theme } : null);
      setAppState(AppState.InRoom);
    }
  }, [match]);

  const handleExitRoom = useCallback(() => {
    setMatch(null);
    setAppState(AppState.Swiping);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.Onboarding:
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case AppState.Swiping:
        return <SwipeScreen onMatch={handleMatch} />;
      case AppState.Matched:
        return match && <MatchAnimation match={match} onEnterRoom={handleProceedToThemeSelection} />;
      case AppState.ThemeSelection:
        return match && <ThemeSelectionScreen onThemeSelect={handleThemeSelected} onBack={handleBackToMatch} />;
      case AppState.InRoom:
        return match && <RoomScreen match={match} onExit={handleExitRoom} />;
      default:
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-950 via-gray-900 to-black overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-sm h-full md:h-[95vh] md:max-h-[800px] bg-gray-900/50 backdrop-blur-xl rounded-lg shadow-2xl shadow-indigo-500/10 border border-indigo-900/50 flex flex-col relative overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;