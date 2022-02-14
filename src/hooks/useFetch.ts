import axios, { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'

const api = axios.create({
  baseURL: 'https://api.github.com',
})

export function useFetch<T = unknown>(
  url: string,
  options?: AxiosRequestConfig
) {
  const [data, setData] = useState<T | null>(null)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    api(url, options)
      .then(response => setData(response.data))
      .catch(() => setError(new Error('Failed to fetch data')))
      .finally(() => setIsFetching(false))
  }, [])

  return { data, isFetching, error }
}
