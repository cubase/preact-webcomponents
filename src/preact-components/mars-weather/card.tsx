import { h, JSX } from 'preact'
import { solCardStyles } from './styles'

const formatDate = (utc: string | number | Date): string => {
  return new Date(utc).toLocaleString('en', { month: 'long', day: 'numeric' })
}

type Temperature = {
  high: number
  low: number
}

interface Props extends JSX.HTMLAttributes {
  sol: number | string
  utc: number | string
  temperature: Temperature
}

const SolCard = ({
  sol,
  utc,
  temperature: { high = 0, low = 0 },
  ...props
}: Props): JSX.Element => (
  <article className={solCardStyles.wrapper} {...props}>
    <header className={solCardStyles.header}>
      <h2>Sol {sol}</h2>
      <h3>{formatDate(utc)}</h3>
    </header>
    <main className={solCardStyles.main}>
      <p>High: {Math.round(high)} °F</p>
      <p>Low: {Math.round(low)} °F</p>
    </main>
  </article>
)

export default SolCard
