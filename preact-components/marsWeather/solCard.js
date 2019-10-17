import { h } from 'preact'

import { solCardStyles } from './styles'

const formatDate = utc => {
  return new Date(utc).toLocaleString('en', { month: 'long', day: 'numeric' })
}

const SolCard = ({ sol, solUTC, temperature: { high = 'N/A', low = 'N/A' }, ...props }) => (
  <article className={solCardStyles.wrapper} {...props}>
    <header className={solCardStyles.header}>
      <h2>Sol {sol}</h2>
      <h3>{formatDate(solUTC)}</h3>
    </header>
    <main className={solCardStyles.main}>
      <p>High: {Math.round(high)} °F</p>
      <p>Low: {Math.round(low)} °F</p>
    </main>
  </article>
)

export default SolCard
