import { useState, useCallback } from 'react';
import { searchAnime } from '../lib/api';
import type { AnimeResponse } from '../types/anilist';
import type { AnimeFilters } from '../types/filters';

interface UseAnimeSearchReturn {
  results: AnimeResponse['Media'][];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  filters: AnimeFilters;
  search: (query: string) => Promise<void>;
  updateFilters: (newFilters: AnimeFilters) => void;
  loadMore: () => Promise<void>;
}

export const useAnimeSearch = (initialPageSize: number = 10): UseAnimeSearchReturn => {
  const [results, setResults] = useState<AnimeResponse['Media'][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');
  const [filters, setFilters] = useState<AnimeFilters>({});
  const [lastRequestTime, setLastRequestTime] = useState(0);

  const performSearch = useCallback(async (
    query: string,
    page: number,
    currentFilters: AnimeFilters
  ) => {
    const data = await searchAnime(
      query,
      page,
      initialPageSize,
      currentFilters
    );
    
    if (data) {
      return {
        media: data.media,
        hasNextPage: data.pageInfo.hasNextPage
      };
    }
    return null;
  }, [initialPageSize]);

  const search = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setCurrentQuery(query);
      setCurrentPage(1);
      
      const result = await performSearch(query, 1, filters);
      
      if (result) {
        setResults(result.media);
        setHasMore(result.hasNextPage);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to search anime'));
    } finally {
      setLoading(false);
    }
  }, [filters, performSearch]);

  const updateFilters = useCallback((newFilters: AnimeFilters) => {
    setFilters(newFilters);
    if (currentQuery) {
      search(currentQuery);
    }
  }, [currentQuery, search]);

  const loadMore = useCallback(async () => {
    if (!currentQuery || loading) return;

    try {
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      if (timeSinceLastRequest < 2000) return;

      setLoading(true);
      setLastRequestTime(now);

      const nextPage = currentPage + 1;
      const result = await performSearch(currentQuery, nextPage, filters);
      
      if (result) {
        setResults(prev => [...prev, ...result.media]);
        setHasMore(result.hasNextPage);
        setCurrentPage(nextPage);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load more results'));
    } finally {
      setLoading(false);
    }
  }, [currentQuery, currentPage, loading, lastRequestTime, filters, performSearch]);

  return { 
    results, 
    loading, 
    error, 
    hasMore, 
    filters,
    search, 
    updateFilters,
    loadMore 
  };
}; 