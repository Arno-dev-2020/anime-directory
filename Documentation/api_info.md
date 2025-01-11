# AniList API Documentation

The AniList GraphQL API allows you to fetch various types of data related to anime and manga. Here are the main categories of data you can retrieve:

## Anime Data

- Title (in English, Native Japanese, and Romanized)
- Cover and banner images
- Description/Synopsis
- Number of episodes
- Duration per episode
- Release date and status
- Genre and tags
- Average score and popularity
- Studio information
- Season and year of release
- Format (TV, Movie, OVA, etc.)
- Source material (Manga, Light Novel, Original, etc.)

## Manga Data

- Title (in multiple languages)
- Cover and banner images
- Description/Synopsis
- Number of chapters and volumes
- Publishing status
- Genre and tags
- Average score and popularity
- Author and artist information
- Format (Manga, Light Novel, One-shot, etc.)

## User Data

- Profile information
- Anime/Manga lists
- Favorites
- Activity history
- Statistics
- Following/Followers

## Character Data

- Name
- Images
- Description
- Related anime/manga appearances
- Voice actors
- Popularity ranking

## Staff Data

- Name
- Image
- Description
- Works (anime/manga they've worked on)
- Roles and positions

## Studio Data

- Name
- Animation works
- Statistics

## Search and Filtering

You can search and filter by:

- Genre
- Year
- Season
- Format
- Status
- Tags
- And many other parameters

## Rate Limiting

- 90 requests per minute for authenticated requests
- 30 requests per minute for unauthenticated requests

For more detailed information and examples, visit the [official AniList API documentation](https://anilist.gitbook.io/anilist-apiv2-docs/).
