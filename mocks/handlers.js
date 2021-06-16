import { rest } from 'msw'

// sample card numbers to use for testing:
// https://stripe.com/docs/testing#cards

export const handlers = [
  // stripe.customers.list
  rest.get('https://api.stripe.com/v1/customers', (req, res, ctx) => {
    const mockResponse = {
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
          metadata: {
            firstName: 'Ada',
            lastName: 'Lovelace'
          }
        }
      ]
    }

    return res(
      ctx.delay(),
      ctx.json(mockResponse)
    )
  }),

  // stripe.charges.list
  rest.get('https://api.stripe.com/v1/charges', (req, res, ctx) => {
    const mockResponse = {
      data: [
        {
          amount: 100000,
          created: 0
        },
        {
          amount: 200000,
          created: 1615233615
        }
      ]
    }

    return res(
      ctx.delay(),
      ctx.json(mockResponse)
    )
  }),

  // stripe.charges.create
  rest.post('https://api.stripe.com/v1/charges', (req, res, ctx) => {
    const mockResponse = {
      id: 'ch_1J1VO42eZvKYlo2C4hLhMTQf'
    }

    return res(
      ctx.delay(),
      ctx.json(mockResponse)
    )
  }),

  // stripe.subscriptionItems.create
  // utilized during execution of stripe.subscriptions.update?
  rest.post('https://api.stripe.com/v1/subscription_items', (req, res, ctx) => {
    const mockResponse = {}

    return res(
      ctx.delay(),
      ctx.json(mockResponse)
    )
  }),

  // stripe.plans.list
  rest.get('https://api.stripe.com/v1/plans', (req, res, ctx) => {
    const mockResponse = {
      // object: 'list',
      // url: '/v1/plans',
      // has_more: false,
      data: [
        {
          id: 'price_1J25Xi2eZvKYlo2CXymasmSv',
          amount: 200
        }
      ]
    }

    return res(
      ctx.delay(),
      ctx.json(mockResponse)
    )
  }),

  // stripe.plans.create
  rest.post('https://api.stripe.com/v1/plans', (req, res, ctx) => {
    const mockResponse = {
      id: 'price_1J25Xi2eZvKYlo2CXymasmSv'
    }

    return res(
      ctx.delay(),
      ctx.json(mockResponse)
    )
  }),

  // stripe.subscriptions.del
  rest.delete('https://api.stripe.com/v1/subscriptions/:id', (req, res, ctx) => {
    const mockResponse = {
      status: 'canceled'
    }
    return res(
      ctx.delay(),
      ctx.json(mockResponse)
    )
  }),

  // stripe.subscriptions.update
  rest.post('https://api.stripe.com/v1/subscriptions/:id', (req, res, ctx) => {
    const mockResponse = {}
    return res(
      ctx.delay(),
      ctx.json(mockResponse)
    )
  }),

  // stripe.payouts.list
  rest.get('https://api.stripe.com/v1/payouts', (req, res, ctx) => {
    const mockResponse = {
      data: [
        {
          amount: 99999999
        },
        {
          amount: 99999999
        },
        {
          amount: 100
        }
      ]
    }
    return res(
      ctx.delay(),
      ctx.json(mockResponse)
    )
  })
]
