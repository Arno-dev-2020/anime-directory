import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { AnimeMedia } from '../types/anilist';

interface SimilarAnimeProps {
  recommendations: AnimeMedia[];
  loading?: boolean;
}

const SimilarAnime: React.FC<SimilarAnimeProps> = ({ recommendations, loading }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Debug logging
  useEffect(() => {
    console.log('SimilarAnime rendered with:', {
      recommendationsCount: recommendations?.length,
      loading
    });
  }, [recommendations, loading]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">Similar Anime</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[2/3] bg-gray-800 rounded-lg mb-2" />
              <div className="h-4 bg-gray-800 rounded w-3/4 mb-1" />
              <div className="h-4 bg-gray-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Don't return null, show empty state instead
  if (!recommendations?.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">Similar Anime</h2>
        <p className="text-gray-400 text-center">No recommendations available</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-white mb-8">
        Similar Anime ({recommendations.length})
      </h2>
      
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/80 text-white rounded-full
            opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2
            hover:bg-black"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
        >
          {recommendations.map(anime => (
            <Link
              key={anime.id}
              to={`/anime/${anime.id}`}
              className="flex-none w-[180px] transform transition-all duration-300
                hover:scale-105 hover:-translate-y-2"
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                <img
                  src={anime.coverImage.large}
                  alt={anime.title.english || anime.title.romaji}
                  className="w-full h-full object-cover"
                />
                {anime.averageScore && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 rounded text-sm">
                    <span className="text-yellow-400 font-bold">
                      {(anime.averageScore / 10).toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-medium text-sm text-white line-clamp-2">
                {anime.title.english || anime.title.romaji}
              </h3>
              {anime.genres && (
                <p className="text-xs text-gray-400 mt-1">
                  {anime.genres.slice(0, 2).join(' • ')}
                </p>
              )}
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/80 text-white rounded-full
            opacity-0 group-hover:opacity-100 transition-opacity translate-x-1/2
            hover:bg-black"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default SimilarAnime; 