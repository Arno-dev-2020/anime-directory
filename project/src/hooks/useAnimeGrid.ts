import { useState, useCallback, useEffect } from 'react';
import { fetchPopularAnime } from '../lib/api';
import type { AnimeResponse } from '../types/anilist';

interface UseAnimeGridReturn {
  animes: AnimeResponse['Media'][];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

export const useAnimeGrid = (initialPageSize: number = 12): UseAnimeGridReturn => {
  const [animes, setAnimes] = useState<AnimeResponse['Media'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastRequestTime, setLastRequestTime] = useState(0);

  const loadMore = useCallback(async () => {
    try {
      // Add rate limiting protection
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      if (timeSinceLastRequest < 2000) { // 2 seconds minimum between requests
        return;
      }

      setLoading(true);
      setLastRequestTime(now);
      
      const data = await fetchPopularAnime(currentPage, initialPageSize);
      
      if (data) {
        setAnimes(prev => [...prev, ...data.media]);
        setHasMore(data.pageInfo.hasNextPage);
        setCurrentPage(prev => prev + 1);
      }
    } catch (err) {
      console.error('Error in useAnimeGrid:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch anime'));
    } finally {
      setLoading(false);
    }
  }, [currentPage, initialPageSize, lastRequestTime]);

  // Load initial data
  useEffect(() => {
    loadMore();
  }, []); // Remove loadMore from dependencies to prevent multiple initial loads

  return { animes, loading, error, hasMore, loadMore };
}; 