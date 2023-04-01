import { useState, lazy, Suspense } from 'react'

import type { ChangeEventHandler } from 'react'
import type { CharactersInfoQuery } from '@/codegen-gql-types'

const characterImport = async () => await import('./Character.js')

const Character = lazy(characterImport)

export const Hello = () => {
  const [greeting, setGreeting] = useState('')
  const [charactersData, setCharacterData] = useState<
    CharactersInfoQuery['characters']['results'] | null
  >(null)

  const handleChange: ChangeEventHandler<HTMLInputElement> = event =>
    setGreeting(event.target.value)
  const handleClick = async () => {
    const { loader } = await import('./graphqlLoader.js')
    const characters = await loader()
    setCharacterData(characters)
  }

  return (
    <>
      <h1>Hello from ESM React ({greeting})</h1>
      <input value={greeting} placeholder="put your greeting" onChange={handleChange} />
      <br />
      <button onClick={handleClick} onFocus={characterImport} onMouseOver={characterImport}>
        Load Rick and Morty query
      </button>
      <Suspense>
        {charactersData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {charactersData.map(character => (
              <Character key={character.name} {...character} />
            ))}
          </div>
        )}
      </Suspense>
    </>
  )
}
