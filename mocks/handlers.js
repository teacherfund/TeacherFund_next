import { rest } from 'msw'
// import Iron from '@hapi/iron'
// import { serialize } from 'cookie'
// import CookieService from '../lib/cookie'

// const TOKEN_NAME = 'api_token'
// const MAX_AGE = 60 * 60 * 24 * 1000 // 1 day in ms

// sample card numbers to use for testing:
// https://stripe.com/docs/testing#cards

export const handlers = [
  // rest.get('/api/account', async (req, res, ctx) => {
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
          subscriptions: {
            data: [
              {
                id: 'sub_BZ9fY6Cds9rbmJ',
                plan: {
                  amount: 11100
                },
                items: {
                  data: [
                    {
                      id: 'si_HYxou0ifhbHvp3'
                    }
                  ]
                }
              }
            ]
          },
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

  rest.post('https://api.stripe.com/v1/charges', (req, res, ctx) => {
    const mockResponse = {
      id: 'ch_1J1VO42eZvKYlo2C4hLhMTQf',
      object: 'charge',
      amount: 2000,
      amount_captured: 0,
      amount_refunded: 0,
      application: null,
      application_fee: null,
      application_fee_amount: null,
      balance_transaction: 'txn_1032HU2eZvKYlo2CEPtcnUvl',
      billing_details: {
        address: {
          city: null,
          country: null,
          line1: null,
          line2: null,
          postal_code: null,
          state: null
        },
        email: null,
        name: null,
        phone: null
      },
      calculated_statement_descriptor: null,
      captured: false,
      created: 1623498748,
      currency: 'usd',
      customer: null,
      description: 'My First Test Charge (created for API docs)',
      disputed: false,
      failure_code: null,
      failure_message: null,
      fraud_details: {},
      invoice: null,
      livemode: false,
      metadata: {},
      on_behalf_of: null,
      order: null,
      outcome: null,
      paid: true,
      payment_intent: null,
      payment_method: 'card_1J1AcH2eZvKYlo2CrU1svwu2',
      payment_method_details: {
        card: {
          brand: 'visa',
          checks: {
            address_line1_check: null,
            address_postal_code_check: null,
            cvc_check: null
          },
          country: 'US',
          exp_month: 9,
          exp_year: 2022,
          fingerprint: 'Xt5EWLLDS7FJjR1c',
          funding: 'credit',
          installments: null,
          last4: 4242,
          network: 'visa',
          three_d_secure: null,
          wallet: null
        },
        type: 'card'
      },
      receipt_email: null,
      receipt_number: null,
      receipt_url: 'https://pay.stripe.com/receipts/acct_1032D82eZvKYlo2C/ch_1J1VO42eZvKYlo2C4hLhMTQf/rcpt_Jep2DNk6vkkSxOAspV6r6lOZNGStUad',
      refunded: false,
      refunds: {
        object: 'list',
        data: [],
        has_more: false,
        url: '/v1/charges/ch_1J1VO42eZvKYlo2C4hLhMTQf/refunds'
      },
      review: null,
      shipping: null,
      source_transfer: null,
      statement_descriptor: null,
      statement_descriptor_suffix: null,
      status: 'succeeded',
      transfer_data: null,
      transfer_group: null,
      source: 'tok_mastercard'
    }

    return res(ctx.json(mockResponse))
  }),

  rest.post('https://api.stripe.com/v1/subscription_items', (req, res, ctx) => {
    const mockResponse = {
      id: 'si_JejY0YuV3EUrUI',
      object: 'subscription_item',
      billing_thresholds: null,
      created: 1623478393,
      metadata: {},
      price: 'price_1J1DpJ2eZvKYlo2CAbHapzQN',
      quantity: 2,
      subscription: 'sub_EVwR0sdJ4BwBAz',
      tax_rates: []
    }

    return res(ctx.json(mockResponse))
  }),

  // stripe.plans.list()
  rest.get('https://api.stripe.com/v1/plans', (req, res, ctx) => {
    const mockResponse = {
      object: 'list',
      url: '/v1/plans',
      has_more: false,
      data: [
        {
          id: 'price_1J25Xi2eZvKYlo2CXymasmSv',
          object: 'plan',
          active: true,
          aggregate_usage: null,
          amount: 200,
          amount_decimal: '200',
          billing_scheme: 'per_unit',
          created: 1623637730,
          currency: 'usd',
          interval: 'month',
          interval_count: 1,
          livemode: false,
          metadata: {},
          nickname: null,
          product: 'prod_JfQOFBIheKwbx4',
          tiers_mode: null,
          transform_usage: null,
          trial_period_days: null,
          usage_type: 'licensed'
        }
      ]
    }

    return res(ctx.json(mockResponse))
  }),

  // stripe.plans.create()
  rest.post('https://api.stripe.com/v1/plans', (req, res, ctx) => {
    const mockResponse = {
      id: 'price_1J25Xi2eZvKYlo2CXymasmSv',
      object: 'plan',
      active: true,
      aggregate_usage: null,
      amount: 200,
      amount_decimal: 200,
      billing_scheme: 'per_unit',
      created: 1623637730,
      currency: 'usd',
      interval: 'month',
      interval_count: 1,
      livemode: false,
      metadata: {},
      nickname: null,
      product: 'prod_JfQOFBIheKwbx4',
      tiers_mode: null,
      transform_usage: null,
      trial_period_days: null,
      usage_type: 'licensed'
    }

    return res(ctx.json(mockResponse))
  }),

  rest.delete('https://api.stripe.com/v1/subscriptions/:id', (req, res, ctx) => {
    // TODO: create universal property object for all handlers..?
    // TODO: delete property from user object?
    // const subscriptionId = req.params.id
    const mockResponse = {}
    return res(
      ctx.delay(),
      ctx.json(mockResponse))
  }),

  // stripe.subscriptions.update
  rest.post('https://api.stripe.com/v1/subscriptions/:id', (req, res, ctx) => {
    const mockResponse = {}
    return res(
      ctx.delay(),
      ctx.json(mockResponse))
  }),

  // stripe.payouts.list
  rest.get('https://api.stripe.com/v1/payouts', (req, res, ctx) => {
    const mockResponse = {
      object: 'list',
      url: '/v1/payouts',
      has_more: false,
      data: [
        {
          id: 'po_1J2POv2eZvKYlo2C1MRcdeXG',
          object: 'payout',
          amount: 99999999,
          arrival_date: 1623714065,
          automatic: true,
          balance_transaction: 'txn_1032HU2eZvKYlo2CEPtcnUvl',
          created: 1623714065,
          currency: 'usd',
          description: 'STRIPE PAYOUT',
          destination: 'ba_1J2POv2eZvKYlo2C8tu1sDZB',
          failure_balance_transaction: null,
          failure_code: null,
          failure_message: null,
          livemode: false,
          metadata: {},
          method: 'standard',
          original_payout: null,
          reversed_by: null,
          source_type: 'card',
          statement_descriptor: null,
          status: 'in_transit',
          type: 'bank_account'
        },
        {
          id: 'po_1J2POv2eZvKYlo2C1MRcdeXG',
          object: 'payout',
          amount: 99999999,
          arrival_date: 1623714065,
          automatic: true,
          balance_transaction: 'txn_1032HU2eZvKYlo2CEPtcnUvl',
          created: 1623714065,
          currency: 'usd',
          description: 'STRIPE PAYOUT',
          destination: 'ba_1J2POv2eZvKYlo2C8tu1sDZB',
          failure_balance_transaction: null,
          failure_code: null,
          failure_message: null,
          livemode: false,
          metadata: {},
          method: 'standard',
          original_payout: null,
          reversed_by: null,
          source_type: 'card',
          statement_descriptor: null,
          status: 'in_transit',
          type: 'bank_account'
        },
        {
          id: 'po_1J2POv2eZvKYlo2C1MRcdeXG',
          object: 'payout',
          amount: 100,
          arrival_date: 1623714065,
          automatic: true,
          balance_transaction: 'txn_1032HU2eZvKYlo2CEPtcnUvl',
          created: 1623714065,
          currency: 'usd',
          description: 'STRIPE PAYOUT',
          destination: 'ba_1J2POv2eZvKYlo2C8tu1sDZB',
          failure_balance_transaction: null,
          failure_code: null,
          failure_message: null,
          livemode: false,
          metadata: {},
          method: 'standard',
          original_payout: null,
          reversed_by: null,
          source_type: 'card',
          statement_descriptor: null,
          status: 'in_transit',
          type: 'bank_account'
        }
      ]
    }
    return res(
      ctx.delay(),
      ctx.json(mockResponse))
  })
]

// todo: mock stripe 'db' to pull from for testing instances?
