import React from 'react';

export const DatabaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-1.5a2.25 2.25 0 01-2.25-2.25V6m-13.5 0v2.25A2.25 2.25 0 006 10.5h1.5a2.25 2.25 0 002.25-2.25V6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12A2.25 2.25 0 016 9.75h12A2.25 2.25 0 0120.25 12v2.25A2.25 2.25 0 0118 16.5h-1.5a2.25 2.25 0 01-2.25-2.25V12m-13.5 0v2.25A2.25 2.25 0 006 16.5h1.5a2.25 2.25 0 002.25-2.25V12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 18A2.25 2.25 0 016 15.75h12A2.25 2.25 0 0120.25 18v2.25A2.25 2.25 0 0118 22.5h-1.5a2.25 2.25 0 01-2.25-2.25V18m-13.5 0v2.25A2.25 2.25 0 006 22.5h1.5a2.25 2.25 0 002.25-2.25V18" />
    </svg>
);

export const TableIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h-1.5m1.5 0h1.5m-1.5 0v-1.5m17.25 0v-1.5m0 0h1.5m-1.5 0h-1.5m-17.25 0a1.125 1.125 0 01-1.125-1.125v-6.75c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125m-17.25 0h-1.5m1.5 0h1.5m-1.5 0v-6.75m17.25 0v-6.75m0 0h1.5m-1.5 0h-1.5m-17.25 0A1.125 1.125 0 012.25 4.5h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-17.25A1.125 1.125 0 013.375 8.25v-1.5z" />
  </svg>
);

export const KeyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
  </svg>
);

export const WarningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

export const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);