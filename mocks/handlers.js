import { rest } from 'msw'
// import Iron from '@hapi/iron'
// import { serialize } from 'cookie'
// import CookieService from '../lib/cookie'

// const TOKEN_NAME = 'api_token'
// const MAX_AGE = 60 * 60 * 24 * 1000 // 1 day in ms

export const handlers = [
  rest.get('/api/account', async (req, res, ctx) => {
    const apiResponse = await ctx.fetch(req)

    if (apiResponse.status === 401) {
      return res(ctx.status(401))
    }

    const user = {
      customerId: 'id',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'test@test.com',
      donationAmount: 100000
    }

    return res(ctx.json(user))
  }),

  // rest.get('/api/user-donations', async (req, res, ctx) => {
  //   const apiResponse = await ctx.fetch(req)

  //   if (apiResponse.status === 401) {
  //     return res(ctx.status(401))
  //   }

  //   const user = {
  //     customerId: 'id',
  //     firstName: 'firstName',
  //     lastName: 'lastName',
  //     email: 'test@test.com',
  //     donationAmount: 100000
  //   }

  //   return res(ctx.json(user))
  // }),

  rest.get('https://api.stripe.com/v1/customers', (req, res, ctx) => {
    const mockResponse = {
      // "object": "list",
      // "url": "/v1/customers",
      // "has_more": false,
      data: [
        {
          id: 'cus_4QEipX9Dj5Om1P',
          // "object": "customer",
          // "address": null,
          // "balance": 0,
          // "created": 1405639479,
          // "currency": "usd",
          // "default_source": "card_1J1AcH2eZvKYlo2CrU1svwu2",
          // "delinquent": false,
          // "description": "someone@example.com for Coderwall",
          // "discount": null,
          // "email": "test@theteacherfund.com",
          // "invoice_prefix": "4090BFB",
          // "invoice_settings": {
          //   "custom_fields": null,
          //   "default_payment_method": null,
          //   "footer": null
          // },
          // "livemode": false,
          metadata: {
            firstName: 'Ada',
            lastName: 'Lovelace'
          }
        }
      ]
    }

    return res(ctx.json(mockResponse))
  }),
  rest.get('https://api.stripe.com/v1/charges', (req, res, ctx) => {
    const mockResponse = {
      // "object": "list",
      // "url": "/v1/charges",
      // "has_more": false,
      data: [
        {
          // "id": "ch_1J1RMp2eZvKYlo2Ckh8OnvWx",
          // "object": "charge",
          amount: 100000,
          // "amount_captured": 0,
          // "amount_refunded": 0,
          // "application": null,
          // "application_fee": null,
          // "application_fee_amount": null,
          // "balance_transaction": "txn_1032HU2eZvKYlo2CEPtcnUvl",
          // "billing_details": {
          //   "address": {
          //     "city": null,
          //     "country": null,
          //     "line1": null,
          //     "line2": null,
          //     "postal_code": null,
          //     "state": null
          //   },
          //   "email": null,
          //   "name": null,
          //   "phone": null
          // },
          // "calculated_statement_descriptor": null,
          // "captured": false,
          created: 0
          // "created": 1623483295,
          // "currency": "usd",
          // "customer": null,
          // "description": "My First Test Charge (created for API docs)",
          // "disputed": false,
          // "failure_code": null,
          // "failure_message": null,
          // "fraud_details": {},
          // "invoice": null,
          // "livemode": false,
          // "metadata": {},
          // "on_behalf_of": null,
          // "order": null,
          // "outcome": null,
          // "paid": true,
          // "payment_intent": null,
          // "payment_method": "card_1J1RMo2eZvKYlo2C3odHNGhi",
          // "payment_method_details": {
          //   "card": {
          //     "brand": "visa",
          //     "checks": {
          //       "address_line1_check": null,
          //       "address_postal_code_check": null,
          //       "cvc_check": "pass"
          //     },
          //     "country": "US",
          //     "exp_month": 8,
          //     "exp_year": 2022,
          //     "fingerprint": "Xt5EWLLDS7FJjR1c",
          //     "funding": "credit",
          //     "installments": null,
          //     "last4": "4242",
          //     "network": "visa",
          //     "three_d_secure": null,
          //     "wallet": null
          //   },
          //   "type": "card"
          // },
          // "receipt_email": null,
          // "receipt_number": null,
          // "receipt_url": "https://pay.stripe.com/receipts/acct_1032D82eZvKYlo2C/ch_1J1RMp2eZvKYlo2Ckh8OnvWx/rcpt_JeksyKeZdNF8AMwdAumrLYgXdvcayt7",
          // "refunded": false,
          // "refunds": {
          //   "object": "list",
          //   "data": [],
          //   "has_more": false,
          //   "url": "/v1/charges/ch_1J1RMp2eZvKYlo2Ckh8OnvWx/refunds"
          // },
          // "review": null,
          // "shipping": null,
          // "source_transfer": null,
          // "statement_descriptor": null,
          // "statement_descriptor_suffix": null,
          // "status": "succeeded",
          // "transfer_data": null,
          // "transfer_group": null
        },
        {
          // "id": "ch_1J1RMp2eZvKYlo2Ckh8OnvWx",
          // "object": "charge",
          amount: 200000,
          // "amount_captured": 0,
          // "amount_refunded": 0,
          // "application": null,
          // "application_fee": null,
          // "application_fee_amount": null,
          // "balance_transaction": "txn_1032HU2eZvKYlo2CEPtcnUvl",
          // "billing_details": {
          //   "address": {
          //     "city": null,
          //     "country": null,
          //     "line1": null,
          //     "line2": null,
          //     "postal_code": null,
          //     "state": null
          //   },
          //   "email": null,
          //   "name": null,
          //   "phone": null
          // },
          // "calculated_statement_descriptor": null,
          // "captured": false,
          created: 1615233615
          // "currency": "usd",
          // "customer": null,
          // "description": "My First Test Charge (created for API docs)",
          // "disputed": false,
          // "failure_code": null,
          // "failure_message": null,
          // "fraud_details": {},
          // "invoice": null,
          // "livemode": false,
          // "metadata": {},
          // "on_behalf_of": null,
          // "order": null,
          // "outcome": null,
          // "paid": true,
          // "payment_intent": null,
          // "payment_method": "card_1J1RMo2eZvKYlo2C3odHNGhi",
          // "payment_method_details": {
          //   "card": {
          //     "brand": "visa",
          //     "checks": {
          //       "address_line1_check": null,
          //       "address_postal_code_check": null,
          //       "cvc_check": "pass"
          //     },
          //     "country": "US",
          //     "exp_month": 8,
          //     "exp_year": 2022,
          //     "fingerprint": "Xt5EWLLDS7FJjR1c",
          //     "funding": "credit",
          //     "installments": null,
          //     "last4": "4242",
          //     "network": "visa",
          //     "three_d_secure": null,
          //     "wallet": null
          //   },
          //   "type": "card"
          // },
          // "receipt_email": null,
          // "receipt_number": null,
          // "receipt_url": "https://pay.stripe.com/receipts/acct_1032D82eZvKYlo2C/ch_1J1RMp2eZvKYlo2Ckh8OnvWx/rcpt_JeksyKeZdNF8AMwdAumrLYgXdvcayt7",
          // "refunded": false,
          // "refunds": {
          //   "object": "list",
          //   "data": [],
          //   "has_more": false,
          //   "url": "/v1/charges/ch_1J1RMp2eZvKYlo2Ckh8OnvWx/refunds"
          // },
          // "review": null,
          // "shipping": null,
          // "source_transfer": null,
          // "statement_descriptor": null,
          // "statement_descriptor_suffix": null,
          // "status": "succeeded",
          // "transfer_data": null,
          // "transfer_group": null
        }
      ]
    }

    return res(ctx.json(mockResponse))
  }),

  rest.post('/api/donate', (req, res, ctx) => {
    return res(ctx.json({ success: true }))
  }),

  rest.get('/api/donations', (req, res, ctx) => {
    const mockDonations = 199999999
    return res(ctx.json([{ amount: mockDonations }]))
  })

  // rest.get('/api/deleteDonation', (req, res, ctx) => {
  //   return res(ctx.json({ success: true }))
  // }),

  // rest.post('/api/login', async (req, res, ctx) => {
  //   if (req.method !== 'POST') return res.status(405).end()

  //   const user = { email: 'test@theteacherfund.com' }
  //   const token = await Iron.seal(user, process.env.ENCRYPTION_SECRET, Iron.defaults)
  //   // Cookie.setMockTokenCookie(res, token, ctx)
  //   return res(
  //     // setMockTokenCookie(res, token, ctx)
  //     ctx.cookie(TOKEN_NAME, token, {
  //       maxAge: MAX_AGE,
  //       expires: new Date(Date.now() + MAX_AGE),
  //       secure: process.env.NODE_ENV === 'production',
  //       path: '/',
  //       httpOnly: false
  //     }),
  //     ctx.cookie('authed', true, {
  //       maxAge: MAX_AGE,
  //       expires: new Date(Date.now() + MAX_AGE),
  //       secure: process.env.NODE_ENV === 'production',
  //       path: '/',
  //       httpOnly: false
  //     })
  //   )
  // })
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

// todo: mock stripe 'db' to pull from for testing instances?
