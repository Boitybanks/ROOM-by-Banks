import React from 'react';

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a7.5 7.5 0 01-7.5 0c-1.421-.62-2.897-1.52-4.125-2.617M3.375 12.75c0-4.142 3.358-7.5 7.5-7.5 4.142 0 7.5 3.358 7.5 7.5c0 1.25-.303 2.44-1.25 3.5m0-.5a7.5 7.5 0 01-7.5 0" />
  </svg>
);