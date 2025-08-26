import React, { useState, useEffect, useCallback, useRef, FormEvent } from 'react';
import { Match, Message, MessageSender } from '../types';
import { generateChatResponse, generateZodiacInsight, analyzeChemistry } from '../services/geminiService';
import { getZodiacSign } from '../services/zodiacService';
import { AUDIO_TRACKS } from '../constants';
import RoomControls from './RoomControls';
import DedicateSongModal from './DedicateSongModal';
import { MusicNoteIcon } from './icons/MusicNoteIcon';
import { SendIcon } from './icons/SendIcon';

interface RoomScreenProps {
  match: Match;
  onExit: () => void;
}

type AudioMode = 'music' | 'relaxing' | 'off';

const RoomScreen: React.FC<RoomScreenProps> = ({ match, onExit }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [chemistry, setChemistry] = useState(20);
  const [lightsOn, setLightsOn] = useState(true);
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [audioMode, setAudioMode] = useState<AudioMode>('music');
  const [currentMusicTrack, setCurrentMusicTrack] = useState(AUDIO_TRACKS.smooth);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioPlayerRef.current ?? new Audio();
    if (!audioPlayerRef.current) {
        audio.loop = true;
        audioPlayerRef.current = audio;
    }

    let trackToPlay = '';
    if (audioMode === 'music') {
        trackToPlay = currentMusicTrack;
    } else if (audioMode === 'relaxing') {
        trackToPlay = AUDIO_TRACKS.relaxing;
    }

    if (audioMode === 'off') {
        audio.pause();
    } else if (audio.src !== trackToPlay) {
        audio.src = trackToPlay;
        audio.play().catch(error => console.warn("Audio autoplay was blocked by the browser.", error));
    } else if (audio.paused) {
        audio.play().catch(error => console.warn("Audio autoplay was blocked by the browser.", error));
    }
  }, [audioMode, currentMusicTrack]);

  useEffect(() => {
    if (currentMusicTrack === AUDIO_TRACKS.dedicated) {
        return;
    }
    const chemistryTrack = chemistry > 60 ? AUDIO_TRACKS.hot : AUDIO_TRACKS.smooth;
    if (currentMusicTrack !== chemistryTrack) {
        setCurrentMusicTrack(chemistryTrack);
    }
  }, [chemistry, currentMusicTrack]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const initializeRoom = async () => {
      let initialMessages: Message[] = [];
      
      if (match.user.birthdate && match.matchedUser.birthdate) {
          const userSign = getZodiacSign(match.user.birthdate);
          const matchSign = getZodiacSign(match.matchedUser.birthdate);
          const insight = await generateZodiacInsight(userSign, matchSign);
          initialMessages.push({ sender: MessageSender.Narrator, text: insight });
      }

      initialMessages.push({ sender: MessageSender.Narrator, text: `You've entered the room with ${match.matchedUser.name}.` });
      const firstMessage: Message = { sender: MessageSender.Match, text: `Hey, ${match.user.name}! Glad we matched. Your profile looks great.` };
      initialMessages.push(firstMessage);
      
      setMessages(initialMessages);
      setIsInitializing(false);
    };

    initializeRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || loading) return;

    const playerText = newMessage.trim();
    const newPlayerMessage: Message = { sender: MessageSender.Player, text: playerText };
    
    setNewMessage('');
    setLoading(true);

    const messagesWithPlayer = [...messages, newPlayerMessage];
    // Optimistically update UI with player's message
    setMessages(messagesWithPlayer);

    const aiResponseText = await generateChatResponse(messagesWithPlayer, match.user.name, match.matchedUser.name);
    const newMatchMessage: Message = { sender: MessageSender.Match, text: aiResponseText };
    
    const finalMessages = [...messagesWithPlayer, newMatchMessage];
    
    const newChemistry = await analyzeChemistry(finalMessages);

    // Batch final state updates
    setMessages(finalMessages);
    if (newChemistry !== null) {
        setChemistry(newChemistry);
    }
    
    setLoading(false);
  };
  
  const handleToggleLights = () => setLightsOn(prev => !prev);
  const handleOpenSongModal = () => setIsSongModalOpen(true);
  const handleCloseSongModal = () => setIsSongModalOpen(false);

  const handleDedicateSong = (title: string, artist: string) => {
    const songMessage: Message = {
      sender: MessageSender.Narrator,
      text: `${match.user.name} dedicated "${title}" by ${artist}. 🎵`,
      songDetails: { title, artist },
    };
    setMessages(prev => [...prev, songMessage]);
    setAudioMode('music'); // Ensure we're in music mode
    setCurrentMusicTrack(AUDIO_TRACKS.dedicated);
    setIsSongModalOpen(false);
  };

  const handleCycleAudioMode = () => {
    setAudioMode(prev => {
        if (prev === 'music') return 'relaxing';
        if (prev === 'relaxing') return 'off';
        return 'music';
    });
  };

  const backgroundImage = match.theme || 'https://picsum.photos/seed/room/400/800';

  if (isInitializing) {
    return (
        <div className="flex flex-col h-full items-center justify-center bg-gray-900 text-white">
            <p className="animate-pulse text-lg text-indigo-300">Reading the stars...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-cover bg-center" style={{ backgroundImage: `url('${backgroundImage}')` }}>
      {isSongModalOpen && <DedicateSongModal onDedicate={handleDedicateSong} onClose={handleCloseSongModal} />}
      <div className={`flex flex-col h-full backdrop-blur-sm transition-colors duration-500 ${lightsOn ? 'bg-black/60' : 'bg-black/80'}`}>
        <header className="flex items-center justify-between p-3 border-b border-indigo-900/50">
          <img src={match.matchedUser.photoUrl} alt={match.matchedUser.name} className="w-10 h-10 rounded-full object-cover" />
          <div className="text-center">
            <h2 className="font-bold text-lg">{match.matchedUser.name}</h2>
            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500" style={{ width: `${chemistry}%` }}/>
            </div>
            <p className="text-xs text-indigo-300">Chemistry</p>
          </div>
          <button onClick={onExit} className="text-gray-400 hover:text-white transition">Exit</button>
        </header>

        <main className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
          {loading && <div className="text-center text-sm text-gray-400 animate-pulse">Thinking...</div>}
          <div ref={chatEndRef} />
        </main>
        
        <footer className="p-2 border-t border-indigo-900/50">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 p-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Say something..."
                    className="flex-grow bg-gray-800 border border-indigo-800 rounded-full px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                <button type="submit" disabled={!newMessage.trim() || loading} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full p-2 disabled:bg-gray-600 disabled:cursor-not-allowed transition">
                    <SendIcon className="w-5 h-5" />
                </button>
            </form>
            <RoomControls
                onToggleLights={handleToggleLights}
                onOpenSongModal={handleOpenSongModal}
                lightsOn={lightsOn}
                audioMode={audioMode}
                onCycleAudioMode={handleCycleAudioMode}
            />
        </footer>
      </div>
    </div>
  );
};


const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isPlayer = message.sender === MessageSender.Player;
    const isNarrator = message.sender === MessageSender.Narrator;

    if (isNarrator) {
        if (message.songDetails) {
            return (
                <div className="text-center text-sm text-purple-300 italic my-2 p-2 bg-purple-900/50 rounded-lg flex items-center justify-center gap-2">
                    <MusicNoteIcon className="w-4 h-4 flex-shrink-0" />
                    <span>{message.text}</span>
                </div>
            )
        }
        return <p className="text-center text-sm text-indigo-300 italic my-2">{message.text}</p>
    }

    return (
        <div className={`flex items-end gap-2 ${isPlayer ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${isPlayer ? 'bg-indigo-600 rounded-br-md' : 'bg-gray-700 rounded-bl-md'}`}>
                <p className="text-sm">{message.text}</p>
            </div>
        </div>
    );
};

export default RoomScreen;