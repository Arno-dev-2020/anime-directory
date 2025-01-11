import { useQuery } from '@tanstack/react-query';
import client from '../lib/graphql-client';
import type { AnimeResponse } from '../types/anilist';

const POPULAR_ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
        currentPage
        total
      }
      media(sort: POPULARITY_DESC, type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        averageScore
      }
    }
  }
`;

export const usePopularAnime = (page: number = 1, perPage: number = 10) => {
  return useQuery({
    queryKey: ['popularAnime', page, perPage],
    queryFn: async () => {
      const data = await client.request<{ Page: AnimeResponse['Page'] }>(
        POPULAR_ANIME_QUERY,
        { page, perPage }
      );
      return data.Page;
    },
  });
}; 