import { request, gql } from 'graphql-request'

const query = gql`
  {
    characters {
      results {
        name
        status
      }
    }
  }
`

export const loader = async () => {
  const { characters } = await request('https://rickandmortyapi.com/graphql', query)

  return characters.results
}
