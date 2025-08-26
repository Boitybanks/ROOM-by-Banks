
import React from 'react';

interface AvatarProps {
  avatar: {
    skinTone: string;
    hairStyle: string;
    hairColor: string;
    outfit: string;
  };
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, className = '' }) => {
  const outfitColor = {
    casual: 'bg-blue-500',
    formal: 'bg-gray-800',
    sporty: 'bg-red-500',
    edgy: 'bg-purple-600',
  }[avatar.outfit] || 'bg-gray-500';

  const hairHeight = {
    short: 'h-1/3',
    long: 'h-2/3',
    curly: 'h-1/2',
    bald: 'h-0',
  }[avatar.hairStyle] || 'h-1/3';

  return (
    <div className={`relative rounded-full overflow-hidden ${className}`} style={{ backgroundColor: avatar.skinTone }}>
      {/* Head shape */}
      <div className="absolute top-0 left-0 w-full h-full rounded-full" />
      
      {/* Hair */}
      {avatar.hairStyle !== 'bald' && (
        <div 
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-4/5 ${hairHeight} rounded-t-full ${avatar.hairStyle === 'curly' ? 'rounded-b-lg' : ''}`}
          style={{ backgroundColor: avatar.hairColor }}
        />
      )}
      
      {/* Eyes */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-1/2 flex justify-between">
        <div className="w-1/4 h-1/6 bg-white rounded-full flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-black rounded-full" />
        </div>
        <div className="w-1/4 h-1/6 bg-white rounded-full flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-black rounded-full" />
        </div>
      </div>
      
      {/* Smile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1/4 h-1/4 border-b-2 border-black rounded-b-full" />
      
      {/* Outfit */}
      <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-full h-1/3 ${outfitColor}`} />
    </div>
  );
};

export default Avatar;
