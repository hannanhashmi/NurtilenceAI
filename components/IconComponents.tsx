
import React from 'react';

export const LogoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"></path>
      <path d="M7 13.5s1.5-2 5-2 5 2 5 2"></path>
      <path d="M8 9.5a.5.5 0 11-1 0 .5.5 0 011 0zM17 9.5a.5.5 0 11-1 0 .5.5 0 011 0z"></path>
      <path d="M12 12v-2"></path>
    </svg>
);

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="h-8 w-8 flex items-center justify-center">{children}</div>
);

export const UploadIcon: React.FC = () => (
  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
  </svg>
);

export const FireIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.82,2.37C11.19,1.15 9.2,1.44 7.78,2.86S5.2,6.26 5.2,8c0,2.42,1,4,3.25,6.1a22.37,22.37,0,0,0,3.3,2.83c1.33.89,2.83.89,4.16,0A22.34,22.34,0,0,0,19.2,14.1C21.49,12,22.46,10.42,22.46,8s-1.33-4.22-2.75-5.14S16,1.44,14.4,2.37a5.2,5.2,0,0,0-1.58,0Z"/></svg>
    </IconWrapper>
);

export const MacrosIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10H7M10 21V7M10 3a2 2 0 114 0v18a2 2 0 11-4 0M3 21h18"/></svg>
    </IconWrapper>
);

export const HealthIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    </IconWrapper>
);

export const WarningIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    </IconWrapper>
);

export const TipIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 100 14 7 7 0 000-14zM12 22v-3"/><path d="M12 16.5A2.5 2.5 0 009.5 19h5a2.5 2.5 0 00-2.5-2.5z"/></svg>
    </IconWrapper>
);

export const RecipeIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20M2 6h20M2 18h20"/><path d="M5 4V2a2 2 0 012-2h10a2 2 0 012 2v20a2 2 0 01-2 2H7a2 2 0 01-2-2v-2"/></svg>
    </IconWrapper>
);

export const ShareIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
    </IconWrapper>
);

export const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
);

export const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
);

export const CameraIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
        <circle cx="12" cy="13" r="4"></circle>
    </svg>
);

export const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);
