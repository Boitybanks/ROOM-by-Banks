export enum AppState {
  Onboarding,
  Swiping,
  Matched,
  ThemeSelection,
  InRoom,
}

export interface StoryHighlight {
  imageUrl: string;
  description: string;
}

export interface UserProfile {
  name: string;
  age: number;
  bio: string;
  interests: string[];
  photoUrl: string;
  birthdate?: string; // Format: YYYY-MM-DD
  badges?: string[];
  loveLanguages?: string[];
  highlights?: StoryHighlight[];
  dailyStreak?: number;
}

export interface Match {
  user: UserProfile;
  matchedUser: UserProfile;
  theme?: string;
}

export enum MessageSender {
    Player,
    Match,
    Narrator
}

export interface Message {
    sender: MessageSender;
    text: string;
    songDetails?: {
      title: string;
      artist: string;
    };
}

export interface CommunitySpark {
  id: number;
  type: 'fact' | 'poll' | 'quote';
  title: string;
  content: string;
}

export type MoodFilter = 'default' | 'candlelight' | 'neon-rave' | 'seaside-sunset';