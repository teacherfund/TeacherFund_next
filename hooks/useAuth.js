/* global fetch */
import useSWR from 'swr'
import { Magic } from 'magic-sdk'

function fetcher (route) {
  return fetch(route)
    .then((r) => { return r.ok && r.json() })
    .then((user) => user || null)
}

export function useAuth () {
  const { data: user, isValidating, revalidate, error } = useSWR('/api/account', fetcher)
  const loading = (user === undefined || isValidating)

  return { user, loading, revalidate, error }
}

export async function login ({ email }) {
  let magicId
  if (!process.env.NEXT_PUBLIC_DEVELOPMENT) {
    // the .loginWithMagicLink causes an email to be sent to the user
    // after they click the magic link, this function call returns us a
    // magic ID; if we have a magic ID returned to us, the user has
    // successfully authenticated
    magicId = await new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY)
      .auth
      .loginWithMagicLink({ email })
  }

  // we can now pass the magic ID to our own backend (a vercel lambda)
  // which knows our magic secret. the lambda will ask Magic to translate
  // the magic ID into an email address
  const authRequest = await fetch('/api/login', {
    method: 'POST',
    headers: { Authorization: `Bearer ${magicId}` }
  })

  return { ok: authRequest.ok }
}
