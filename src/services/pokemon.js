import { api } from './api';

const pokemonSet = new Map();

const addPokemon = (obj) => {
  const id = obj.id; // Assuming 'id' is a unique identifier
  if (!pokemonSet.has(id)) {
    pokemonSet.set(id, obj);
  }
};


export const pokemonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    pokemon: builder.query({
      query: (params) => ({
        url: '/pokemon',
        method: 'GET',
        params, // We'll be using something like limit = 20, offset = 0 for the demo
      }),
      transformResponse: ({ count, next, previous, results }) => {
        // Use this for the thumbnail:
        // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png
        // And this for the image:
        // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/121.png

        // The next and previous are the URLs for the next and previous pages
        // But we want to do this the hard way to show how we can handle this from the client
        // The urls look like so:
        // https://pokeapi.co/api/v2/pokemon?offset=20&limit=20
        // Let's pull out the offset and limit from the URL and place them in an object
        const nextParams = next
          ?.split('?')[1]
          ?.split('&')
          ?.reduce((acc, curr) => {
            const [key, value] = curr.split('=');
            return {
              ...acc,
              [key]: value,
            };
          }, {});

        // Let's do the same for the previous
        const previousParams = previous
          ?.split('?')[1]
          ?.split('&')
          ?.reduce((acc, curr) => {
            const [key, value] = curr.split('=');
            return {
              ...acc,
              [key]: value,
            };
          }, {});

        const pokemonList = results?.map(({ name, url }) => {
          const id = url.split('/')[6];
          return {
            id,
            key: `pokemon-${name}-${id}`,
            name,
            thumb: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          };
        });

        pokemonList.forEach(addPokemon);
      
        return {
          pagination: {
            next: nextParams,
            previous: previousParams,
            urls: { next, previous },
            count,
          },
          results: Array.from(pokemonSet.values()),
        };
          
      },
      providesTags: (result, error, arg) => {
        return [
          // ...result?.results?.map(({ name }) => ({ type: 'Pokemon', id: name })),
          {
            type: 'Pokemon',
            id: `LIST-offset=${arg?.offset}-limit=${arg?.limit}`,
          },
        ];
      },
    }),
  }),
  overrideExisting: false,
});

export const { usePokemonQuery } = pokemonApi;
