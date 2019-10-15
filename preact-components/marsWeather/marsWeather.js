import { h } from 'preact'
import axios from 'axios'
import { useState, useEffect } from 'preact/hooks'

import classes from './styles'

const queryBuilder = (url, queryObject = {}) => {
  const queries = Object.entries(queryObject).reduce((acc, [query, value]) => {
    if (!value) return acc
    acc.push(`${window.encodeURIComponent(query)}=${window.encodeURIComponent(value)}`)
    return acc
  }, [])

  if (!queries.length) return url || '/'
  return `${url}?${queries.join('&')}`
}

const useAxios = ({ url, query, ...requestOptions }, defaultValue = null, opts = []) => {
  const [{ loading, error, data }, setResponse] = useState({
    loading: false,
    error: null,
    data: defaultValue
  })
  const [fetch, setFetch] = useState({
    url: url ? queryBuilder(url, query) : null,
    requestOptions
  })

  const refetch = params => {
    const { url, query, ...newOptions } = params || {}
    if (!params) {
      // Do simple refetch based on last request configuration
      setFetch({
        ...fetch
      })
    }
    if (url) {
      setFetch({
        url: queryBuilder(url, query),
        requestOptions: newOptions
      })
    }
  }

  useEffect(() => {
    let canceled = false
    async function makeRequest() {
      setResponse(state => ({
        ...state,
        error: null,
        loading: true
      }))
      try {
        const result = await axios.request({
          url: fetch.url,
          method: 'get',
          ...fetch.requestOptions
        })
        if (!canceled) {
          const data =
            typeof fetch.requestOptions.transformData === 'function'
              ? await fetch.requestOptions.transformData(result.data)
              : result.data
          setResponse(state => ({
            ...state,
            loading: false,
            error: null,
            ...(fetch.requestOptions.skipResult ? null : { data })
          }))
        }
      } catch (error) {
        console.error('[useApi] ', error)
        setResponse(state => ({
          ...state,
          loading: false,
          error
        }))
      }
    }

    if (fetch.url) makeRequest()
    return () => {
      canceled = true
    }
  }, [fetch, ...opts])

  return [{ loading, error, data }, refetch]
}

const MarsWeather = ({ apiKey = 'DEMO_KEY' }) => {
  const [{ loading, error, data }] = useAxios({
    url: 'https://api.nasa.gov/insight_weather/',
    query: {
      api_key: apiKey,
      feedtype: 'json',
      ver: '1.0'
    }
  })
  console.log('Dejtaa', data)
  return <div className={classes.wrapper}>Mars Component</div>
}

export default MarsWeather
