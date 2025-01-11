import React from 'react';
import { X } from 'lucide-react';
import type { AnimeFilters } from '../types/filters';

const GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 
  'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life'
];

const YEARS = Array.from({ length: 24 }, (_, i) => 2024 - i);

const SEASONS = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];

const FORMATS = ['TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL'];

const SORT_OPTIONS = [
  { value: 'POPULARITY_DESC', label: 'Popular' },
  { value: 'SCORE_DESC', label: 'Top Rated' },
  { value: 'TRENDING_DESC', label: 'Trending' }
];

interface FilterModalProps {
  filters: AnimeFilters;
  onFilterChange: (filters: AnimeFilters) => void;
  onClose: () => void;
  loading?: boolean;
}

const FilterModal: React.FC<FilterModalProps> = ({ 
  filters, 
  onFilterChange, 
  onClose, 
  loading 
}) => {
  return (
    <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Filters</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Genre Filter */}
        <div className="mb-6">
          <h3 className="text-white mb-2">Genre</h3>
          <div className="flex flex-wrap gap-2">
            {GENRES.map(genre => (
              <button
                key={genre}
                disabled={loading}
                className={`px-3 py-1 rounded-full text-sm transition-colors
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                  ${filters.genre === genre 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                onClick={() => !loading && onFilterChange({ 
                  ...filters, 
                  genre: filters.genre === genre ? undefined : genre 
                })}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Year Filter */}
        <div className="mb-6">
          <h3 className="text-white mb-2">Year</h3>
          <select
            value={filters.year || ''}
            onChange={(e) => onFilterChange({ 
              ...filters, 
              year: e.target.value ? parseInt(e.target.value) : undefined 
            })}
            className="bg-white/10 text-white px-4 py-2 rounded-lg w-full"
          >
            <option value="">Any Year</option>
            {YEARS.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Season Filter */}
        <div className="mb-6">
          <h3 className="text-white mb-2">Season</h3>
          <div className="flex flex-wrap gap-2">
            {SEASONS.map(season => (
              <button
                key={season}
                className={`px-3 py-1 rounded-full text-sm transition-colors
                  ${filters.season === season 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                onClick={() => onFilterChange({ 
                  ...filters, 
                  season: filters.season === season ? undefined : season as any 
                })}
              >
                {season.charAt(0) + season.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="mb-6">
          <h3 className="text-white mb-2">Sort By</h3>
          <div className="flex flex-wrap gap-2">
            {SORT_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                className={`px-3 py-1 rounded-full text-sm transition-colors
                  ${filters.sort === value 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                onClick={() => onFilterChange({ 
                  ...filters, 
                  sort: filters.sort === value ? undefined : value as any 
                })}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => onFilterChange({})}
          className="w-full py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterModal; 