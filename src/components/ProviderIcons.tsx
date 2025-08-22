import React from 'react';

// Using inline SVGs as React components
export const Uber = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v10h-2z" />
  </svg>
);

export const Bolt = ({ className }: { className?: string }) => (
    <svg 
        className={className} 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path d="M13.5 3.65L2.55 12l10.95 8.35L13.5 13H22V3.65h-8.5z"/>
    </svg>
);


export const Didi = ({ className }: { className?: string }) => (
    <svg 
        className={className} 
        viewBox="0 0 1024 1024" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path d="M839.2 440.8c-6.8-111.2-46.8-212.4-118.8-291.6C648.8 68.4 534.8 24 408.4 24 183.2 24 0 207.2 0 432.4c0 225.2 183.2 408.4 408.4 408.4 46 0 89.6-7.6 130-22.4l119.2 119.2c16 16 42 16 58 0 16-16 16-42 0-58L602.8 806.4c72-50.8 124-128.4 140.4-219.6 5.6-30.8 8.8-62.8 8.8-96.4s-3.2-65.6-8.8-96.8l85.2-72.8z M408.4 780.8c-192.4 0-348.4-156-348.4-348.4S216 84 408.4 84s348.4 156 348.4 348.4-156 348.4-348.4 348.4z" />
    </svg>
);
