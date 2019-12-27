import { h, JSX } from 'preact'

import { useAxios } from '../../../utils/hooks'
import { marsStyles } from './styles'
import Card from './card'

const API_URL = 'https://api.nasa.gov/insight_weather/'

interface Props {
  key?: string
}

const MarsWeather = ({ key = 'DEMO_KEY' }: Props): JSX.Element | null => {
  const [{ loading, error, data }] = useAxios(
    {
      url: API_URL,
      query: {
        api_key: key,
        feedtype: 'json',
        ver: '1.0'
      },
      transformData: ({ data }) => {
        const lastMeasuredSol = data.sol_keys[data.sol_keys.length - 1]
        return {
          sol: lastMeasuredSol,
          utc: data[lastMeasuredSol].Last_UTC,
          temperature: {
            high: data[lastMeasuredSol].AT.mx,
            low: data[lastMeasuredSol].AT.mn
          }
        }
      }
    },
    {
      sol: 0,
      utc: 0,
      temperature: { high: 0, low: 0 }
    }
  )
  const { temperature, sol, utc } = data

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
      <Card
        sol={sol}
        style={{
          marginTop: '3rem'
        }}
        temperature={temperature}
        utc={utc}
      />
    </div>
  ) : null
}

export default MarsWeather
