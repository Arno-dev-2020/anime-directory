# Code Documentation

## 1. Code Comments

### Purpose

- Explain complex logic or non-obvious decisions in the code.

### Guidelines

- Use comments sparingly—only when necessary.
- Focus on the "why" rather than the "what."

### Example

```javascript
// Fetch anime data from AniList API
const fetchAnime = async () => {
  try {
    const response = await axios.post("https://graphql.anilist.co", {
      query: `
        query {
          Page(page: 1, perPage: 10) {
            media(type: ANIME, sort: POPULARITY_DESC) {
              id
              title {
                romaji
              }
              coverImage {
                large
              }
            }
          }
        }
      `,
    });
    setAnimeList(response.data.data.Page.media);
  } catch (error) {
    console.error("Error fetching anime data:", error);
  }
};
```

### AniList API Documentation

#### Fetch Popular Anime

```graphql
query {
  Page(page: 1, perPage: 10) {
    media(type: ANIME, sort: POPULARITY_DESC) {
      id
      title {
        romaji
      }
      coverImage {
        large
      }
    }
  }
}
```
