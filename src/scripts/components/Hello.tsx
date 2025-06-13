import { useState, lazy, Suspense, use } from 'react'
import { preconnect } from 'react-dom'

import type { ChangeEventHandler } from 'react'
import type { loader } from './graphqlLoader.ts'

const characterImport = () => import('./Character.js')
const loaderImport = () => import('./graphqlLoader.js')

const prefetchImport = () => {
  characterImport()
  loaderImport().then(module => preconnect(module.URL, { crossOrigin: '' })) // https://dev.to/crenshaw_dev/when-the-browser-can-t-take-a-preconnect-hint-6dn
}

const Character = lazy(characterImport)

type CharactersPromise = ReturnType<typeof loader>

export const Hello = () => {
  const [greeting, setGreeting] = useState('')
  const [charactersPromise, setCharactersPromise] = useState<CharactersPromise | null>(null)

  const handleChange: ChangeEventHandler<HTMLInputElement> = event =>
    setGreeting(event.target.value)

  const handleClick = async () => {
    const { loader } = await loaderImport()
    setCharactersPromise(loader())
  }

  return (
    <main>
      <h1>Hello from React ESM Native ({greeting})</h1>
      <input value={greeting} placeholder="put your greeting" onChange={handleChange} />
      <br />
      <button onClick={handleClick} onFocus={prefetchImport} onPointerEnter={prefetchImport}>
        Load Rick and Morty query
      </button>
      <Suspense fallback="Loading...">
        <Characters charactersPromise={charactersPromise} />
      </Suspense>
    </main>
  )
}

const Characters = ({ charactersPromise }: { charactersPromise: CharactersPromise | null }) => {
  const charactersData = charactersPromise ? use(charactersPromise) : null

  if (!charactersData) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {charactersData.map(character => (
        <Character key={character.name} {...character} />
      ))}
    </div>
  )
}
