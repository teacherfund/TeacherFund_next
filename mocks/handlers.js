import { rest } from 'msw'
import Iron from '@hapi/iron'
// import { serialize } from 'cookie'
import CookieService from '../lib/cookie'

const TOKEN_NAME = 'api_token'
const MAX_AGE = 60 * 60 * 24 * 1000 // 1 day in ms

export const handlers = [
  rest.get('/api/account', async (req, res, ctx) => {
    let user
    try {
      user = await Iron.unseal(CookieService.getAuthToken(req.cookies), process.env.ENCRYPTION_SECRET, Iron.defaults)
    } catch (error) {
      return res(ctx.status(401))
    }
    user = {
      ...user,
      customerId: 'id',
      firstName: 'firstName',
      lastName: 'lastName',
      // email: 'test@test.com',
      donationAmount: 100000
    }

    return res(ctx.json(user))
  }),

  rest.post('/api/donate', (req, res, ctx) => {
    return res(ctx.json({ success: true }))
  }),

  rest.get('/api/donations', (req, res, ctx) => {
    const mockDonations = 199999999
    return res(ctx.json([{ amount: mockDonations }]))
  }),

  // rest.get('/api/deleteDonation', (req, res, ctx) => {
  //   return res(ctx.json({ success: true }))
  // }),

  rest.post('/api/login', async (req, res, ctx) => {
    if (req.method !== 'POST') return res.status(405).end()

    const user = { email: 'test@theteacherfund.com' }
    const token = await Iron.seal(user, process.env.ENCRYPTION_SECRET, Iron.defaults)
    // Cookie.setMockTokenCookie(res, token, ctx)
    return res(
      // setMockTokenCookie(res, token, ctx)
      ctx.cookie(TOKEN_NAME, token, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE),
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        httpOnly: false
      }),
      ctx.cookie('authed', true, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE),
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        httpOnly: false
      })
    )
  })
]

// function setMockTokenCookie (res, token, ctx) {
//   ctx.set('headers', 'Set-Cookie', [
//     createMockCookie(TOKEN_NAME, token),
//     createMockCookie('authed', true, { httpOnly: false })
//   ])
// }

// function createMockCookie (name, data, options = {}) {
//   return serialize(name, data, {
//     maxAge: MAX_AGE,
//     expires: new Date(Date.now() + MAX_AGE),
//     secure: process.env.NODE_ENV === 'production',
//     path: '/',
//     httpOnly: true,
//     ...options
//   })
// }
