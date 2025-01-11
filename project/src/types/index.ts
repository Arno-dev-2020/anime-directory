export interface Anime {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  rating: number;
  genre: string[];
  trailerUrl: string;
  year: number;
}

export interface HeroAnime extends Anime {
  heroImage: string;
}