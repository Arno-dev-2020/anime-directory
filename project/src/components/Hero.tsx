import React, { useState } from 'react';
import { Play, ChevronDown, ChevronUp } from 'lucide-react';
import { useFeaturedAnime } from '../hooks/useFeaturedAnime';
import { truncateText } from '../utils/textUtils';
import VideoBackground from './VideoBackground';
import TrailerModal from './TrailerModal';

// Loading skeleton component
const HeroSkeleton = () => (
  <div className="relative h-[80vh] w-full bg-gray-900 animate-pulse">
    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-2xl">
        <div className="h-12 w-3/4 bg-gray-800 rounded mb-4"></div>
        <div className="h-24 w-full bg-gray-800 rounded mb-8"></div>
        <div className="flex items-center space-x-4">
          <div className="h-12 w-36 bg-gray-800 rounded"></div>
          <div className="h-8 w-20 bg-gray-800 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

// Error component
const HeroError = ({ message }: { message: string }) => (
  <div className="relative h-[80vh] w-full bg-gray-900">
    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Error Loading Featured Anime</h2>
        <p className="text-gray-400">{message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
);

const Hero = () => {
  const { anime, loading, error } = useFeaturedAnime();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  if (loading) return <HeroSkeleton />;
  if (error) return <HeroError message={error.message} />;
  if (!anime) return null;

  const description = anime.description?.replace(/<[^>]*>/g, '') || 'No description available.';
  const truncatedDescription = truncateText(description);
  const shouldShowReadMore = description.length > 200;

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        {anime.trailer?.site === 'youtube' ? (
          <VideoBackground
            trailerId={anime.trailer.id}
            site={anime.trailer.site}
            fallbackImage={anime.bannerImage || anime.coverImage.extraLarge}
            isVisible={!isTrailerOpen}
          />
        ) : (
          <img
            src={anime.bannerImage || anime.coverImage.extraLarge}
            alt={anime.title.english || anime.title.romaji}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {anime.title.english || anime.title.romaji}
          </h1>
          <div className="space-y-2">
            <p className="text-lg text-gray-100 mb-2 leading-relaxed drop-shadow-lg">
              {showFullDescription ? description : truncatedDescription}
            </p>
            {shouldShowReadMore && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <span className="mr-1">{showFullDescription ? 'Show Less' : 'Read More'}</span>
                {showFullDescription ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          <div className="flex items-center space-x-4 mt-6">
            {anime.trailer && (
              <button 
                onClick={() => setIsTrailerOpen(true)}
                className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Trailer
              </button>
            )}
            <div className="flex items-center">
              <span className="text-yellow-400 font-bold text-lg">
                {(anime.averageScore / 10).toFixed(1)}
              </span>
              <span className="text-gray-400 ml-2">/ 10</span>
            </div>
          </div>
        </div>
      </div>

      {anime.trailer && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          trailerId={anime.trailer.id}
        />
      )}
    </div>
  );
};

export default Hero;