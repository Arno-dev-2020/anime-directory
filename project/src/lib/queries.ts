// Query for the hero section (featured anime)
export const FEATURED_ANIME_QUERY = `
  query {
    Media(sort: POPULARITY_DESC, type: ANIME) {
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
      trailer {
        id
        site
        thumbnail
      }
      genres
      seasonYear
    }
  }
`;

// Query for popular anime grid
export const POPULAR_ANIME_QUERY = `
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

// Query for searching anime
export const SEARCH_ANIME_QUERY = `
  query (
    $search: String, 
    $page: Int, 
    $perPage: Int, 
    $genre: String, 
    $year: Int, 
    $season: MediaSeason,
    $format: MediaFormat,
    $sort: [MediaSort]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
        currentPage
        total
      }
      media(
        search: $search,
        type: ANIME,
        genre: $genre,
        seasonYear: $year,
        season: $season,
        format: $format,
        sort: $sort
      ) {
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
        seasonYear
        season
        format
      }
    }
  }
`;

export const ANIME_DETAILS_QUERY = `
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
      genres
      tags {
        id
        name
        rank
      }
      status
      episodes
      duration
      seasonYear
      season
      averageScore
      popularity
      trailer {
        id
        site
        thumbnail
      }
      recommendations(sort: RATING_DESC) {
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
          }
        }
      }
    }
  }
`; 