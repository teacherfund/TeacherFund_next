/* global fetch */
import useSWR from 'swr'

function fetcher (route) {
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((user) => user || null)
}

export default function useAuth () {
  const { data: user, isValidating, revalidate, error } = useSWR('/api/account', fetcher)
  const loading = (user === undefined || isValidating)

  return { user, loading, revalidate, error }
}
