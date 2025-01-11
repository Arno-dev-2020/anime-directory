import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import AnimeGrid from '../components/AnimeGrid';
import WelcomeModal from '../components/WelcomeModal';

const HomePage = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome message
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <AnimeGrid />
      <WelcomeModal 
        isOpen={showWelcome} 
        onClose={handleCloseWelcome}
      />
    </div>
  );
};

export default HomePage; 