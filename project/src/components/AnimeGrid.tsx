import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAnimeGrid } from '../hooks/useAnimeGrid';
import type { AnimeResponse } from '../types/anilist';
import { useNavigate } from 'react-router-dom';

// Loading skeleton for individual card
const AnimeCardSkeleton = () => (
  <div className="relative min-w-[200px] aspect-[2/3] rounded-lg overflow-hidden animate-pulse">
    <div className="absolute inset-0 bg-gray-800" />
    <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80">
      <div className="h-4 w-3/4 bg-gray-700 rounded mb-2" />
      <div className="h-3 w-1/4 bg-gray-700 rounded" />
    </div>
  </div>
);

// Loading skeleton for horizontal scroll
const GridLoadingSkeleton = () => (
  <div className="flex gap-4 px-4">
    {[...Array(6)].map((_, i) => (
      <AnimeCardSkeleton key={i} />
    ))}
  </div>
);

const AnimeCard = ({ anime }: { anime: AnimeResponse['Media'] }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative min-w-[200px] aspect-[2/3] p-[3px]"
      onClick={() => navigate(`/anime/${anime.id}`)}
    >
      <div 
        className="relative w-full h-full rounded-lg overflow-hidden
        transition-all duration-300 ease-out cursor-pointer
        hover:transform hover:scale-125 hover:-translate-y-4 hover:z-30
        hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
      >
        <img
          src={anime.coverImage.large}
          alt={anime.title.english || anime.title.romaji}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 z-20">
          <h3 className="text-white font-semibold truncate">
            {anime.title.english || anime.title.romaji}
          </h3>
          <div className="flex items-center mt-1">
            <span className="text-yellow-400 text-sm">
              {(anime.averageScore / 10).toFixed(1)}
            </span>
            <span className="text-gray-400 text-sm ml-1">/ 10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollButton = ({ 
  direction, 
  onClick 
}: { 
  direction: 'left' | 'right';
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-black/80 rounded-full 
    text-white/80 hover:text-white hover:bg-black transition-all duration-200
    ${direction === 'left' ? 'left-2' : 'right-2'}`}
  >
    {direction === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
  </button>
);

const AnimeGrid = () => {
  const { animes, loading, error, hasMore, loadMore } = useAnimeGrid(12);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width
    
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });

    // Load more content when scrolling right and near the end
    if (direction === 'right' && 
        container.scrollLeft + container.clientWidth >= container.scrollWidth - container.clientWidth * 0.5) {
      loadMore();
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Error Loading Anime</h2>
        <p className="text-gray-400 mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h2 className="text-2xl font-bold text-white mb-8 px-4">Popular Anime</h2>
      
      <div className="relative group">
        <ScrollButton direction="left" onClick={() => scroll('left')} />
        
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-4"
        >
          {animes.map(anime => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
          {loading && <GridLoadingSkeleton />}
        </div>

        <ScrollButton direction="right" onClick={() => scroll('right')} />
      </div>
    </div>
  );
};

export default AnimeGrid;