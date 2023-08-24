import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Initialize an empty API service that we'll inject endpoints into later as needed.

// Notes on the Pokemon API:
// Base URL: https://pokeapi.co/api/v2
// We can use the `offset` and `limit` query parameters to paginate the results.
// Example: `baseURL/pokemon?offset=10&limit=10`
// The API response object has the following shape:
// {
//   count,
//   next,
//   previous,
//   results: [],
// }
// The `count` property is the total number of Pokemon in the API.
// The `next` and `previous` properties are URLs for the next and previous pages of results.
// The `results` property is an array of Pokemon objects, each with a `name` and `url` property.
export const api = createApi({
  baseQuery: fetchBaseQuery({
    reducerPath: 'api',
    baseUrl: 'https://pokeapi.co/api/v2',
    prepareHeaders: (headers, { getState }) => {
      // I'm leaving this code in just to demo how to do this but the pokemon api doesn't require an auth token
      // so this is just a dummy implementation.
      const { token } = getState().auth ?? {};
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 900,
  endpoints: () => ({}),
});


