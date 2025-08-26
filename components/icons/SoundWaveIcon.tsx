import React from 'react';

export const SoundWaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h8.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 10.5h12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 18h9" />
  </svg>
);