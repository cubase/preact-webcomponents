const queryBuilder = (url, queryObject = {}) => {
  const queries = Object.entries(queryObject).reduce((acc, [query, value]) => {
    if (!value) return acc
    acc.push(`${window.encodeURIComponent(query)}=${window.encodeURIComponent(value)}`)
    return acc
  }, [])

  if (!queries.length) return url || '/'
  return `${url}?${queries.join('&')}`
}

export { queryBuilder }
