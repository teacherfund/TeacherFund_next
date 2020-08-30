import { serialize } from 'cookie'

const TOKEN_NAME = 'api_token'
const MAX_AGE = 60 * 60 * 24 * 1000 // 1 day in ms

function createCookie (name, data, options = {}) {
  return serialize(name, data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    httpOnly: true,
    ...options
  })
}

function setTokenCookie (res, token) {
  res.setHeader('Set-Cookie', [
    createCookie(TOKEN_NAME, token),
    createCookie('authed', true, { httpOnly: false })
  ])
}

function getAuthToken (cookies) {
  return cookies[TOKEN_NAME]
}

export default { setTokenCookie, getAuthToken }
