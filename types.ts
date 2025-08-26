export enum AppState {
  Onboarding,
  Swiping,
  Matched,
  ThemeSelection,
  InRoom,
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