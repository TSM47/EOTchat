'use client';

import React, { useState } from 'react';
import { WarningIcon } from '@/components/ui/icons';

export const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-yellow-900 border-b border-yellow-700 px-4 py-2 flex items-center justify-between text-yellow-100">
      <div className="flex items-center justify-center gap-2 flex-1">
        <WarningIcon className="w-4 h-4" />
        <span className="text-sm font-medium">Aplikacja w trakcie tworzenia - (ver. 0.0.1 demo-preview).</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-4 p-1 hover:bg-yellow-800 rounded transition-colors"
        aria-label="Zamknij powiadomienie"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
