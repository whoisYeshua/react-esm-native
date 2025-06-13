import { request, gql } from 'graphql-request'

import type { CharactersInfoQuery } from '$types/codegen-gql'

const query = gql`
  query CharactersInfo {
    characters {
      results {
        name
        status
      }
    }
  }
`

export const URL = 'https://rickandmortyapi.com/graphql'
export const loader = async () => {
  const { characters } = await request<CharactersInfoQuery>(URL, query)

  return characters.results
}
