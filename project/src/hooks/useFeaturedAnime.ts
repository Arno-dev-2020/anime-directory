import { useState, useEffect } from 'react';
import { fetchFeaturedAnime } from '../lib/api';
import type { AnimeResponse } from '../types/anilist';

export const useFeaturedAnime = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [anime, setAnime] = useState<AnimeResponse['Media'] | null>(null);

  useEffect(() => {
    const getFeaturedAnime = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedAnime();
        if (data) {
          setAnime(data);
        } else {
          throw new Error('No featured anime data received');
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch featured anime'));
      } finally {
        setLoading(false);
      }
    };

    getFeaturedAnime();
  }, []);

  return { anime, loading, error };
}; 