'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

export const Sheet = ({ children, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md h-full bg-white shadow-lg p-6 overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-500 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};
