import React from 'react';
import { X } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-gray-900 rounded-lg max-w-2xl w-full p-6 border border-red-600/20">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <span className="text-red-600 mr-2">Welcome to AnimeFiles!</span>
        </h2>

        {/* Message */}
        <div className="space-y-4 text-gray-300">
          <p>Hi my fellow friends! 👋</p>
          
          <p>
            Welcome to AnimeFiles - your directory for the latest anime content. 
            It's essentially an AniList wrapper that brings you a curated collection 
            of anime titles.
          </p>
          
          <p>
            Currently, we only feature a popular anime section without additional genre 
            sections, as the API costs would be too high. 
          </p>
          
          <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 text-red-200">
            <strong className="block mb-2">⚠️ Quick Note:</strong>
            If the content ever blanks out, don't worry! Just wait about a minute. 
            This happens when you've scrolled too much and exceeded our 30 requests/minute 
            limitation. Free is actually not free, I guess! 😅
          </div>

          <p>Enjoy your time exploring AnimeFiles! 🎉</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal; 