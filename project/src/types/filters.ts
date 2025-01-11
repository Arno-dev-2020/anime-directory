export interface AnimeFilters {
  genre?: string;
  year?: number;
  season?: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';
  format?: 'TV' | 'MOVIE' | 'OVA' | 'ONA' | 'SPECIAL';
  sort?: 'POPULARITY_DESC' | 'SCORE_DESC' | 'TRENDING_DESC';
} 