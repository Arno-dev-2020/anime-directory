export interface AnimeTitle {
  romaji: string;
  english: string | null;
  native: string | null;
}

export interface AnimeCoverImage {
  large: string;
  medium: string;
  extraLarge: string;
  color: string | null;
}

export interface AnimeTrailer {
  id: string;
  site: string;
  thumbnail: string;
}

export interface AnimeMedia {
  id: number;
  title: {
    romaji: string;
    english: string | null;
    native: string | null;
  };
  description: string | null;
  coverImage: {
    extraLarge: string;
    large: string;
    color: string | null;
  };
  bannerImage: string | null;
  averageScore: number | null;
  popularity: number;
  genres: string[];
  seasonYear: number | null;
  season: string | null;
  format: string | null;
  status: string;
  episodes: number | null;
  duration: number | null;
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  } | null;
  recommendations: {
    nodes: Array<{
      mediaRecommendation: {
        id: number;
        title: {
          romaji: string;
          english: string | null;
        };
        coverImage: {
          large: string;
        };
        averageScore: number | null;
        genres: string[];
        format: string | null;
        episodes: number | null;
      };
    }>;
  };
}

export interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

export interface Page {
  pageInfo: PageInfo;
  media: AnimeMedia[];
}

export interface AnimeResponse {
  Page: Page;
}

export interface AnimeTag {
  id: number;
  name: string;
  rank: number;
}

export interface AnimeRecommendation {
  mediaRecommendation: {
    id: number;
    title: AnimeTitle;
    coverImage: AnimeCoverImage;
    averageScore: number;
  };
}

export interface AnimeDetailsResponse {
  Media: AnimeMedia & {
    tags: AnimeTag[];
    recommendations: {
      nodes: AnimeRecommendation[];
    };
  };
} 