import React, { useState } from 'react';
import type { AnimeMedia } from '../types/anilist';
import { Play } from 'lucide-react';
import VideoBackground from './VideoBackground';
import TrailerModal from './TrailerModal';

interface AnimeHeroProps {
  anime: AnimeMedia;
}

const AnimeHero: React.FC<AnimeHeroProps> = ({ anime }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const title = anime.title.english || anime.title.romaji;

  return (
    <div className="relative">
      {/* Hero Banner with Video Background */}
      <div className="relative h-[400px] md:h-[500px]">
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
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover Image */}
          <div className="w-48 md:w-64 flex-shrink-0">
            <img
              src={anime.coverImage.large}
              alt={title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            
            {/* Metadata */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
              {anime.seasonYear && (
                <span>{anime.seasonYear}</span>
              )}
              {anime.format && (
                <span>{anime.format}</span>
              )}
              {anime.episodes && (
                <span>{anime.episodes} Episodes</span>
              )}
              {anime.duration && (
                <span>{anime.duration} mins</span>
              )}
              {anime.status && (
                <span>{anime.status}</span>
              )}
            </div>

            {/* Score */}
            {anime.averageScore && (
              <div className="mb-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500">
                  <span className="font-bold">{(anime.averageScore / 10).toFixed(1)}</span>
                  <span className="ml-1 text-sm">/ 10</span>
                </div>
              </div>
            )}

            {/* Genres */}
            {anime.genres && anime.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {anime.genres.map(genre => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {anime.description && (
              <p 
                className="text-gray-400 mb-6"
                dangerouslySetInnerHTML={{ __html: anime.description }}
              />
            )}

            {/* Update Trailer Button to open modal */}
            {anime.trailer?.site === 'youtube' && (
              <button
                onClick={() => setIsTrailerOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg
                  hover:bg-red-700 transition-colors"
              >
                <Play size={20} />
                Watch Trailer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Add Trailer Modal */}
      {anime.trailer?.site === 'youtube' && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          trailerId={anime.trailer.id}
        />
      )}
    </div>
  );
};

export default AnimeHero; 