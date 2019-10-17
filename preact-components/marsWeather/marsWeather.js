import { h } from 'preact'

import { useAxios } from '../../utils/hooks'
import { marsStyles } from './styles'
import SolCard from './solCard'

const MarsWeather = ({ apikey = 'DEMO_KEY' }) => {
  const [{ loading, error, data }] = useAxios({
    url: 'https://api.nasa.gov/insight_weather/',
    query: {
      api_key: apikey,
      feedtype: 'json',
      ver: '1.0'
    },
    transformData: data => {
      const lastMeasuredSol = data.sol_keys[data.sol_keys.length - 1]
      return {
        sol: lastMeasuredSol,
        solUTC: data[lastMeasuredSol].Last_UTC,
        temperature: {
          high: data[lastMeasuredSol].AT.mx,
          low: data[lastMeasuredSol].AT.mn
        }
      }
    }
  })
  const { temperature = {}, sol, solUTC } = data || {}

  return !loading && !error ? (
    <div className={marsStyles.wrapper}>
      <h1 className={marsStyles.header}>Elysium Planitia</h1>
      <p className={marsStyles.info}>
        <a href="https://api.nasa.gov/#insight_weather" target="_blank">
          NASA InSight
        </a>{' '}
        is taking daily weather measurements (temperature, wind, pressure) on the surface of Mars at
        Elysium Planitia.
      </p>
      <SolCard
        sol={sol}
        solUTC={solUTC}
        style={{
          marginTop: '3rem'
        }}
        temperature={temperature}
      />
    </div>
  ) : null
}

export default MarsWeather
