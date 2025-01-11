import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePopularAnime } from '../hooks/usePopularAnime';
import { Link } from 'react-router-dom';

const PopularAnime = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data: animeList, isLoading, error } = usePopularAnime();

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Popular Anime</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
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

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Popular Anime</h2>
        <div className="text-red-500">
          {error instanceof Error ? error.message : 'Failed to load popular anime'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Popular Anime</h2>
      
      <div className="relative group">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/80 text-white rounded-full
            opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0
            hover:bg-black/90 -translate-x-1/2"
          disabled={!animeList?.media?.length}
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/80 text-white rounded-full
            opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0
            hover:bg-black/90 translate-x-1/2"
          disabled={!animeList?.media?.length}
        >
          <ChevronRight size={24} />
        </button>

        {/* Anime Cards */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth"
        >
          {animeList?.media?.map(anime => (
            <Link
              key={anime.id}
              to={`/anime/${anime.id}`}
              className="flex-none w-[180px] sm:w-[200px] transform transition-all duration-300
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
              <h3 className="font-medium text-sm line-clamp-2">
                {anime.title.english || anime.title.romaji}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularAnime; 