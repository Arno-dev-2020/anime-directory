import React from 'react';
import { useParams } from 'react-router-dom';
import { useAnimeDetails } from '../hooks/useAnimeDetails';
import AnimeHero from '../components/AnimeHero';
import ErrorMessage from '../components/ErrorMessage';

const AnimeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: anime, isLoading, error } = useAnimeDetails(id!);

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load anime details"
        message={error instanceof Error ? error.message : 'Unknown error occurred'}
      />
    );
  }

  if (isLoading || !anime) {
    return (
      <div className="animate-pulse">
        <div className="h-[400px] bg-gray-800" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="h-8 w-1/3 bg-gray-800 rounded mb-4" />
          <div className="h-4 bg-gray-800 rounded mb-2" />
          <div className="h-4 bg-gray-800 rounded mb-2 w-2/3" />
          <div className="h-4 bg-gray-800 rounded w-1/2" />
        </div>
      </div>
    );
  }

  return <AnimeHero anime={anime} />;
};

export default AnimeDetails; 