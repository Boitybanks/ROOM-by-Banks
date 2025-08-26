import React from 'react';

export const StreakIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}>
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 00-4.225 2.472.75.75 0 00.04 1.06l3.18 3.18a.75.75 0 001.06-1.061l-3.18-3.18a8.25 8.25 0 016.495 6.495z" />
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M12 18.75a.75.75 0 01.75.75v.008c0 .414-.336.75-.75.75h.008a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h-.008zM12 4.5a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008A.75.75 0 0112 5.25v-.008A.75.75 0 0112 4.5h.008z" />
  </svg>
);