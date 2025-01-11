import { useQuery } from '@tanstack/react-query';
import client from '../lib/graphql-client';
import type { AnimeMedia } from '../types/anilist';

const ANIME_DETAILS_QUERY = `
  query ($id: Int!) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      description
      coverImage {
        extraLarge
        large
        color
      }
      bannerImage
      averageScore
      popularity
      genres
      seasonYear
      season
      format
      status
      episodes
      duration
      trailer {
        id
        site
        thumbnail
      }
      recommendations(perPage: 12) {
        nodes {
          mediaRecommendation {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            averageScore
            genres
            format
            episodes
          }
        }
      }
    }
  }
`;

export const useAnimeDetails = (id: string) => {
  return useQuery({
    queryKey: ['animeDetails', id],
    queryFn: async () => {
      const { Media } = await client.request<{ Media: AnimeMedia }>(
        ANIME_DETAILS_QUERY,
        { id: parseInt(id, 10) }
      );
      return Media;
    },
    enabled: !!id,
  });
}; 