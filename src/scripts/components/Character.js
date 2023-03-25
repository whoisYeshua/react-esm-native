import { css } from '@emotion/css'

const statuses = {
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

const Character = ({ name, status }) => (
  <div className={character}>
    <h5 className={header}>{name}</h5>
    <span style={{ color: statuses[status].color }}>
      {status} - {statuses[status].emoji}
    </span>
  </div>
)
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
