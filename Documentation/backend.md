# Backend Documentation

## 1. Backend Architecture

- **Framework**: None (frontend-only app).
- **API Integration**: Directly fetch data from the AniList API.

## 2. API Integration

### AniList API

- **GraphQL Endpoint**: `https://graphql.anilist.co`.
- **Key Queries**:
  - Fetch popular anime.
  - Fetch details for a specific anime.

### Example Query

```graphql
query {
  Page(page: 1, perPage: 10) {
    media(type: ANIME, sort: POPULARITY_DESC) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
      }
      description
      genres
      averageScore
    }
  }
}
```
