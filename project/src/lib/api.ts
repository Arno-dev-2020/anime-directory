import client, { handleGraphQLError } from './graphql-client';
import { FEATURED_ANIME_QUERY, POPULAR_ANIME_QUERY, SEARCH_ANIME_QUERY } from './queries';
import type { AnimeResponse, PopularAnimeResponse, SearchAnimeResponse } from '../types/anilist';

export const fetchFeaturedAnime = async () => {
  try {
    const data = await client.request<{ Media: AnimeResponse['Media'] }>(
      FEATURED_ANIME_QUERY
    );
    return data.Media;
  } catch (error) {
    handleGraphQLError(error);
  }
};

export const fetchPopularAnime = async (page: number = 1, perPage: number = 10) => {
  try {
    const variables = {
      page,
      perPage
    };

    const data = await client.request<PopularAnimeResponse>(
      POPULAR_ANIME_QUERY,
      variables
    );
    return data.Page;
  } catch (error) {
    if (error.response?.status === 429) {
      console.error('Rate limit exceeded. Please wait before making more requests.');
      throw new Error('Rate limit exceeded. Please try again in a moment.');
    }
    
    console.error('API Error:', {
      status: error.response?.status,
      message: error.message,
      errors: error.response?.errors
    });
    
    handleGraphQLError(error);
  }
};

export const searchAnime = async (
  search: string,
  page: number = 1,
  perPage: number = 10
) => {
  try {
    const variables = {
      search,
      page,
      perPage
    };

    const data = await client.request<SearchAnimeResponse>(
      SEARCH_ANIME_QUERY,
      variables
    );
    return data.Page;
  } catch (error) {
    if (error.response?.status === 429) {
      console.error('Rate limit exceeded. Please wait before making more requests.');
      throw new Error('Rate limit exceeded. Please try again in a moment.');
    }
    
    console.error('API Error:', {
      status: error.response?.status,
      message: error.message,
      errors: error.response?.errors
    });
    
    handleGraphQLError(error);
  }
}; 