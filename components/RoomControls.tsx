import React from 'react';
import { MoodFilter } from '../types';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { MusicNoteIcon } from './icons/MusicNoteIcon';
import { SpeakerWaveIcon } from './icons/SpeakerWaveIcon';
import { SpeakerXMarkIcon } from './icons/SpeakerXMarkIcon';
import { SoundWaveIcon } from './icons/SoundWaveIcon';
import { WandIcon } from './icons/WandIcon';

interface RoomControlsProps {
    lightsOn: boolean;
    audioMode: 'music' | 'relaxing' | 'off';
    moodFilter: MoodFilter;
    onToggleLights: () => void;
    onOpenSongModal: () => void;
    onCycleAudioMode: () => void;
    onCycleMoodFilter: () => void;
}

const RoomControls: React.FC<RoomControlsProps> = ({ 
    lightsOn, 
    audioMode, 
    moodFilter,
    onToggleLights, 
    onOpenSongModal, 
    onCycleAudioMode,
    onCycleMoodFilter
}) => {
    
    const renderAudioIcon = () => {
        switch(audioMode) {
            case 'music':
                return <SpeakerWaveIcon className="w-5 h-5" />;
            case 'relaxing':
                return <SoundWaveIcon className="w-5 h-5" />;
            case 'off':
                return <SpeakerXMarkIcon className="w-5 h-5" />;
        }
    }

    const getAudioAriaLabel = () => {
        switch(audioMode) {
            case 'music':
                return 'Switch to relaxing sounds';
            case 'relaxing':
                return 'Turn audio off';
            case 'off':
                return 'Turn music on';
        }
    }
    
    const getMoodAriaLabel = () => {
        switch(moodFilter) {
            case 'default': return 'Set candlelight mood';
            case 'candlelight': return 'Set neon rave mood';
            case 'neon-rave': return 'Set seaside sunset mood';
            case 'seaside-sunset': return 'Remove mood filter';
        }
    }

    return (
        <div className="flex items-center justify-center gap-4 px-2 pb-1">
             <button onClick={onToggleLights} className="p-3 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 transition" aria-label={lightsOn ? "Turn lights off" : "Turn lights on"}>
                <LightbulbIcon className="w-5 h-5"/>
            </button>
            <button onClick={onOpenSongModal} className="p-3 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 transition" aria-label="Dedicate a song">
                <MusicNoteIcon className="w-5 h-5"/>
            </button>
            <button onClick={onCycleAudioMode} className="p-3 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 transition" aria-label={getAudioAriaLabel()}>
                {renderAudioIcon()}
            </button>
            <button onClick={onCycleMoodFilter} className="p-3 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 transition" aria-label={getMoodAriaLabel()}>
                <WandIcon className="w-5 h-5" />
            </button>
       </div>
    );
};

export default RoomControls;