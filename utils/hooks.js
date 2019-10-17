import { useState, useEffect, useRef } from 'preact/hooks'
import axios from 'axios'
import isEqual from 'lodash/isEqual'
import debounce from 'lodash/debounce'

import { queryBuilder } from './functions'

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
        console.error('[useAxios] ', error)
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

const useClick = (ref, action, dependable, opts = []) => {
  const handleClick = ({ target }) => {
    if (ref && ref.current && ref.current === target) {
      return action()
    }
  }

  useEffect(() => {
    // If 'dependable' arg is not set, always register 'click' event
    if (dependable === undefined) {
      document.addEventListener('click', handleClick)
    } else if (dependable) {
      document.addEventListener('click', handleClick)
    }

    return () => document.removeEventListener('click', handleClick)
  }, [dependable, ...opts])
}

const useOutsideClick = (ref, action, dependable, opts = []) => {
  const handleOutsideClick = ({ target }) => {
    if (ref && ref.current && !ref.current.contains(target)) return action()
  }

  useEffect(() => {
    if (dependable) document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [dependable, ...opts])
}

const useKeyPress = (keyCode, action, dependable, opts = []) => {
  const handleKeydown = ({ code }) => {
    if (code === keyCode) {
      return action()
    }
  }

  useEffect(() => {
    // If 'dependable' arg is not set, always register 'keydown' event
    if (dependable === undefined) {
      document.addEventListener('keydown', handleKeydown)
    } else if (dependable) {
      document.addEventListener('keydown', handleKeydown)
    }

    return () => document.removeEventListener('keydown', handleKeydown)
  }, [dependable, ...opts])
}

const useObserver = (value, action) => {
  const previous = useRef(value)
  useEffect(() => {
    if (!isEqual(previous.current, value)) action(value)
    previous.current = value
  }, [value])
}

const useResize = (ref, obtainDefaultSize = true) => {
  const [size, setSize] = useState({
    height: null,
    width: null
  })

  const handleResize = debounce(() => {
    const { width, height } = ref.current.getBoundingClientRect()
    setSize({ width, height })
  }, 50)

  useEffect(() => {
    if (ref && ref.current) {
      if (obtainDefaultSize) {
        const { width, height } = ref.current.getBoundingClientRect()
        setSize({ width, height })
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}

const useBeforeUnload = (dependable, opts = []) => {
  const handleBeforeUnload = e => {
    if (dependable || dependable === undefined) {
      e.preventDefault()
      e.returnValue = ''
      return ''
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [dependable, ...opts])
}

export { useAxios, useClick, useKeyPress, useObserver, useResize, useOutsideClick, useBeforeUnload }
