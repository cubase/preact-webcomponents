import { h } from 'preact'

const styles = {
  position: 'fixed',
  display: 'flex',
  bottom: 0,
  left: 0,
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  fontWeight: 'bold',
  height: 50,
  width: '100%',
  backgroundColor: '#007acc',
  color: '#fff'
}

const Coolbar = () => {
  return <article style={styles}>I'am cool(bar)</article>
}

export default Coolbar
