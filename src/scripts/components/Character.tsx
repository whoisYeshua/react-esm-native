import { css } from '@emotion/css'

type Status = {
  color: string
  emoji: string
}

const statuses: Record<string, Status> = {
  Alive: {
    color: 'green',
    emoji: '💚',
  },
  Dead: {
    color: 'red',
    emoji: '😵',
  },
  unknown: {
    color: 'grey',
    emoji: '🤨',
  },
}

const getStatus = (status: string) => (status in statuses ? statuses[status] : statuses['unknown'])

interface CharacterProps {
  name: string
  status: string
}

const Character = ({ name, status }: CharacterProps) => {
  const statusObj = getStatus(status)
  return (
    <div className={character}>
      <h5 className={header}>{name}</h5>
      <span style={{ color: statusObj.color }}>
        {status} - {statusObj.emoji}
      </span>
    </div>
  )
}
export default Character

const character = css`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 0.5rem;
  border: 1px solid lightgrey;
  border-radius: 6px;
  max-width: 30vw;
`

const header = css`
  margin: 0;
  font-style: italic;
`
