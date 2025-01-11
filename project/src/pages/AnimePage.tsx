import React from 'react';
import { useParams } from 'react-router-dom';
import { useAnimeDetails } from '../hooks/useAnimeDetails';
import AnimeHero from '../components/AnimeHero';
import SimilarAnime from '../components/SimilarAnime';
import ErrorMessage from '../components/ErrorMessage';

const AnimePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: anime, isLoading, error } = useAnimeDetails(id!);

  if (error) {
    return <ErrorMessage title="Error Loading Anime" message={error.message} />;
  }

  if (!anime && !isLoading) {
    return <ErrorMessage title="Anime Not Found" message="The requested anime could not be found." />;
  }

  const recommendations = anime?.recommendations?.nodes?.map(node => node.mediaRecommendation) || [];

  return (
    <div className="min-h-screen bg-black">
      {anime && <AnimeHero anime={anime} />}
      <SimilarAnime 
        recommendations={recommendations}
        loading={isLoading}
      />
    </div>
  );
};

export default AnimePage; 