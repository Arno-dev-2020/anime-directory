import { GraphQLClient } from 'graphql-request';

// Create a GraphQL client instance
const client = new GraphQLClient('https://graphql.anilist.co', {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Error handling utility
export const handleGraphQLError = (error: any) => {
  console.error('GraphQL Error:', error);
  
  // Check if it's a rate limit error
  if (error.response?.status === 429) {
    console.error('Rate limit exceeded. Please try again later.');
  }
  
  // Check if it's a validation error
  if (error.response?.errors?.[0]?.validation) {
    console.error('Validation errors:', error.response.errors[0].validation);
  }
  
  throw error;
};

export default client; 