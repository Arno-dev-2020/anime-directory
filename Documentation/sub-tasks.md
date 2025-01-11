'll break down the integration of AniList API and replacement of hardcoded data into smaller, manageable sub-tasks:

1. Setup GraphQL Client Infrastructure:
   Install necessary GraphQL dependencies (Apollo Client or urql)
   Create GraphQL client configuration
   Setup API endpoint and basic error handling
   Test basic connectivity with AniList API

2. Define GraphQL Queries & Types
   Create query for featured/hero anime
   Create query for popular anime list
   Define TypeScript interfaces matching AniList's schema
   Update existing interfaces (Anime, HeroAnime) to match AniList data structure

3. Implement Data Fetching - Hero Section
   Create custom hook for fetching hero anime data
   Handle loading states
   Handle error states
   Update Hero component to use real data
   Map AniList data to component props

4. Implement Data Fetching - Anime Grid
   Create custom hook for fetching anime list
   Implement pagination/infinite scroll
   Handle loading states
   Handle error states
   Update AnimeGrid component to use real data

5. Add Search & Filter Functionality
   Create search query
   Implement search input in Navbar
   Add filter options (genre, year, etc.)
   Create filtered query hooks
   Handle empty search results

6. Error Handling & Loading States
   Create reusable error components
   Add loading skeletons
   Implement retry mechanisms
   Handle API rate limiting
   Add error boundaries

7. Optimize & Polish
   Implement data caching
   Add image loading optimization
   Implement proper TypeScript types
   Add proper error messages
   Polish loading states and transitions

8. Testing
   Unit tests for data fetching hooks
   Integration tests for API calls
   Component tests with mocked data
   Error handling tests

Some instructions:

1. Anytime you need me to input any data or do anything (as we are working with extenral API) e.g. provide you API keys or stuff, thne please proactively ask me when needed.
2. Before doing any sub-tasks, firstly articulate exactly what you are going to do. Then brainstorm how you are going to do it. Then decide on the best possible way to do it. And then and only then, start doing it.
