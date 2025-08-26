import { UserProfile, CommunitySpark } from './types';

export interface RoomTheme {
  name: string;
  imageUrl: string;
  description: string;
}

export const BADGES: string[] = ['WLW', 'MLM', 'Non-binary', 'Trans Joy', 'Ace', 'Poly'];
export const LOVE_LANGUAGES: string[] = ['Words of Affirmation', 'Quality Time', 'Receiving Gifts', 'Acts of Service', 'Physical Touch'];

export const SWIPE_PROFILES: UserProfile[] = [
  {
    name: 'Alex',
    age: 28,
    bio: 'Software engineer by day, aspiring chef by night. Looking for someone to taste-test my questionable recipes. 🍳',
    interests: ['Cooking', 'Hiking', 'Sci-Fi Movies'],
    photoUrl: 'https://picsum.photos/seed/alex/400/400',
    birthdate: '1996-07-10', // Cancer
    badges: ['MLM', 'Trans Joy'],
    loveLanguages: ['Acts of Service', 'Quality Time'],
    highlights: [
      { imageUrl: 'https://picsum.photos/seed/alex-h1/200/200', description: 'My latest culinary creation!' },
      { imageUrl: 'https://picsum.photos/seed/alex-h2/200/200', description: 'Summit views from last weekend.' },
    ],
  },
  {
    name: 'Chloe',
    age: 25,
    bio: 'Art student who spends too much time in museums. Let\'s find a gallery to get lost in. 🎨',
    interests: ['Painting', 'Indie Music', 'Coffee Shops'],
    photoUrl: 'https://picsum.photos/seed/chloe/400/400',
    birthdate: '1999-04-25', // Taurus
    badges: ['WLW'],
    loveLanguages: ['Quality Time', 'Words of Affirmation'],
    highlights: [
      { imageUrl: 'https://picsum.photos/seed/chloe-h1/200/200', description: 'Work in progress.' },
    ],
  },
  {
    name: 'Ben',
    age: 31,
    bio: 'Fitness enthusiast and dog lover. My golden retriever is my co-pilot. Adventure awaits! 🐕',
    interests: ['Gym', 'Travel', 'Dogs'],
    photoUrl: 'https://picsum.photos/seed/ben/400/400',
    birthdate: '1993-12-01', // Sagittarius
    badges: [],
    loveLanguages: ['Physical Touch'],
    highlights: [],
  },
  {
    name: 'Sara',
    age: 29,
    bio: 'Just a girl, standing in front of a salad, asking it to be a donut. Let\'s find the best dessert spots in town. 🍩',
    interests: ['Yoga', 'Reading', 'Baking'],
    photoUrl: 'https://picsum.photos/seed/sara/400/400',
    birthdate: '1995-02-20', // Pisces
    badges: ['WLW', 'Ace'],
    loveLanguages: ['Receiving Gifts'],
    highlights: [
      { imageUrl: 'https://picsum.photos/seed/sara-h1/200/200', description: 'My proudest bake yet!' },
      { imageUrl: 'https://picsum.photos/seed/sara-h2/200/200', description: 'Currently reading this.' },
    ],
  },
];

export const SPECIAL_MATCH_PROFILE: UserProfile = {
  name: 'Orion',
  age: 27,
  bio: 'Just visiting this planet for a bit. Show me the best things about being human. I enjoy stargazing and deep conversations. ✨',
  interests: ['Cosmology', 'Ancient History', 'Synthwave'],
  photoUrl: 'https://picsum.photos/seed/orion/400/400',
  birthdate: '1997-10-30', // Scorpio
  badges: ['Non-binary'],
  loveLanguages: ['Quality Time', 'Words of Affirmation'],
  highlights: [
    { imageUrl: 'https://picsum.photos/seed/orion-h1/200/200', description: 'The Andromeda Galaxy through my telescope.' },
    { imageUrl: 'https://picsum.photos/seed/orion-h2/200/200', description: 'Favorite passage from a book on constellations.' },
    { imageUrl: 'https://picsum.photos/seed/orion-h3/200/200', description: 'My synthwave setup.' },
  ],
};

export const COMMUNITY_SPARKS: CommunitySpark[] = [
  {
    id: 1,
    type: 'fact',
    title: 'Queer History Fact',
    content: 'The first Pride flag, designed by Gilbert Baker in 1978, originally had eight stripes. Pink stood for sexuality and turquoise for magic/art.',
  },
  {
    id: 2,
    type: 'quote',
    title: 'Words to Live By',
    content: '"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment." - Ralph Waldo Emerson',
  },
  {
    id: 3,
    type: 'poll',
    title: 'Community Poll',
    content: 'What\'s the ultimate queer anthem? Discuss in the public rooms!',
  },
    {
    id: 4,
    type: 'fact',
    title: 'Did You Know?',
    content: 'Marsha P. Johnson, a Black trans woman, was a pivotal figure in the Stonewall Uprising and a lifelong advocate for LGBTQ+ rights and homeless youth.',
  },
];

export const ACTIVITY_FEED_ITEMS: string[] = [
  "🔥 Someone just matched with a charming Scorpio.",
  "✨ A new conversation started in the Neon Arcade.",
  "💬 Chloe and Sara are hitting it off!",
  "👀 15 people are exploring the Town Square right now.",
  "💖 A 'Quality Time' connection was just made.",
];


// NOTE: Using animated GIFs for immersive, looping room backgrounds.
export const ROOM_THEMES: RoomTheme[] = [
  {
    name: 'Cozy Cafe',
    imageUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2JzMmpwNm1mMmY5aXNlNjU1cGR5eGt6aW5uc2F6c3JjaG5oN25kbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/q4eSE5GZ2200w/giphy.gif',
    description: 'Warm lighting, the smell of coffee, and soft jazz.'
  },
  {
    name: 'Starlit Balcony',
    imageUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnQ1dHUxODlwaTZmZTFjM3Rhd3hqa211cTVvbm55b3F0dGwwMms4dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT39CX8y6i9a2d6i7S/giphy.gif',
    description: 'A breathtaking view of the city under a sky full of stars.'
  },
  {
    name: 'Neon Arcade',
    imageUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXRjZXZ1NmJ1amZ0a2Z4eWNrb21wZXFocXdqN2I3eWl4ZHp3MzZzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j1zW9xEnQ0T04/giphy.gif',
    description: 'Flashing lights, classic games, and an energetic vibe.'
  },
];

// NOTE: Using placeholder URLs for audio tracks.
// In a real app, these would point to your hosted audio assets.
export const AUDIO_TRACKS = {
  smooth: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder smooth jazz
  hot: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', // Placeholder upbeat track
  dedicated: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Placeholder for dedicated song
  relaxing: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' // Placeholder for relaxing sounds
}