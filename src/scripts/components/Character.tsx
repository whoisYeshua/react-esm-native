import { styled } from 'restyle/styled'

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
    <Container>
      <Header>{name}</Header>
      <span style={{ color: statusObj.color }}>
        {status} - {statusObj.emoji}
      </span>
    </Container>
  )
}
export default Character

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5em',
  padding: '0.5rem',
  border: '1px solid lightgrey',
  borderRadius: '6px',
  maxWidth: '30vw',
})

const Header = styled('h5', {
  margin: 0,
  fontStyle: 'italic',
})
