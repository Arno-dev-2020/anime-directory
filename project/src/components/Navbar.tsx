import React, { useState, useRef, useEffect } from 'react';
import { Play, Search, X, Filter } from 'lucide-react';
import { useAnimeSearch } from '../hooks/useAnimeSearch';
import type { AnimeResponse } from '../types/anilist';
import FilterModal from './FilterModal';
import { useNavigate, Link } from 'react-router-dom';

const SearchResults = ({ 
  results, 
  loading, 
  visible, 
  onClose 
}: { 
  results: AnimeResponse['Media'][];
  loading: boolean;
  visible: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();

  const handleAnimeSelect = (animeId: number) => {
    navigate(`/anime/${animeId}`);
    onClose(); // Close search modal after selection
  };

  if (!visible) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-black/95 mt-2 rounded-lg shadow-lg overflow-hidden z-50">
      <div className="max-h-[70vh] overflow-y-auto">
        {loading ? (
          <div className="p-4 text-gray-400">Searching...</div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
            {results.map(anime => (
              <div 
                key={anime.id} 
                className="relative aspect-[2/3] rounded overflow-hidden cursor-pointer
                  transition-all duration-300 ease-out transform
                  hover:scale-105 hover:z-10 hover:shadow-lg"
                onClick={() => handleAnimeSelect(anime.id)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleAnimeSelect(anime.id);
                  }
                }}
              >
                <img
                  src={anime.coverImage.large}
                  alt={anime.title.english || anime.title.romaji}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full p-2 bg-gradient-to-t from-black/80">
                  <h3 className="text-sm text-white truncate">
                    {anime.title.english || anime.title.romaji}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400 text-xs">
                      {(anime.averageScore / 10).toFixed(1)}
                    </span>
                    <span className="text-gray-400 text-xs ml-1">/ 10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-gray-400">No results found</div>
        )}
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
      >
        <X size={20} />
      </button>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout>();
  const { results, loading, search, updateFilters, filters } = useAnimeSearch();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setShowResults(true);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (value.trim()) {
      searchTimeout.current = setTimeout(() => {
        search(value);
      }, 500);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Play className="w-8 h-8 text-red-600" />
            <span className="ml-2 text-xl font-bold text-white">AnimeFiles</span>
          </Link>
          
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMobileSearchOpen(true)}
          >
            <Search size={24} />
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <div className="flex items-center bg-white/10 rounded-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search anime..."
                  className="bg-transparent text-white px-4 py-2 w-64 focus:outline-none"
                />
                <button
                  onClick={() => setShowFilters(true)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <Filter size={20} />
                </button>
                <Search className="w-5 h-5 text-gray-400 mr-3" />
              </div>
              {Object.keys(filters).length > 0 && (
                <div className="absolute -bottom-8 left-0 flex gap-2 text-xs">
                  {filters.genre && (
                    <span className="px-2 py-1 bg-red-600/50 rounded-full text-white">
                      {filters.genre}
                    </span>
                  )}
                  {filters.year && (
                    <span className="px-2 py-1 bg-red-600/50 rounded-full text-white">
                      {filters.year}
                    </span>
                  )}
                  {filters.season && (
                    <span className="px-2 py-1 bg-red-600/50 rounded-full text-white">
                      {filters.season.charAt(0) + filters.season.slice(1).toLowerCase()}
                    </span>
                  )}
                </div>
              )}
              <SearchResults
                results={results}
                loading={loading}
                visible={showResults}
                onClose={() => setShowResults(false)}
              />
            </div>
            <a href="#" className="text-gray-300 hover:text-white transition">Browse</a>
            <a href="#" className="text-gray-300 hover:text-white transition">Top Rated</a>
          </div>
        </div>
      </div>

      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 md:hidden">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search anime..."
                className="flex-1 bg-white/10 text-white px-4 py-2 rounded-l-full focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setShowFilters(true)}
                className="p-2 bg-white/10 text-gray-400 hover:text-white"
              >
                <Filter size={24} />
              </button>
              <button 
                className="p-2 bg-white/10 rounded-r-full text-gray-400 hover:text-white"
                onClick={() => {
                  setIsMobileSearchOpen(false);
                  setShowResults(false);
                  setSearchQuery('');
                }}
              >
                <X size={24} />
              </button>
            </div>
            <SearchResults
              results={results}
              loading={loading}
              visible={true}
              onClose={() => {
                setIsMobileSearchOpen(false);
                setShowResults(false);
                setSearchQuery('');
              }}
            />
          </div>
        </div>
      )}

      {showFilters && (
        <FilterModal
          filters={filters}
          onFilterChange={(newFilters) => {
            updateFilters(newFilters);
            if (Object.keys(newFilters).length === 0) {
              setShowFilters(false);
            }
          }}
          onClose={() => setShowFilters(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;