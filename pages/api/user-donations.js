import Iron from '@hapi/iron'
import CookieService from '../../lib/cookie'
import { getUnix } from '../../utils/date.utils'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const getCustomer = async ({ email }) => {
  return stripe.customers.list({ email })
}

const getCustomerCharges = async (opts) => {
  return stripe.charges.list(opts)
}

export default async (req, res) => {
  const customerTransactions = { data: { transactions: [], user: {} } }

  // using to test the toast, remove before merge
  // res.status(500).end()

  let user
  try {
    user = await Iron.unseal(CookieService.getAuthToken(req.cookies), process.env.ENCRYPTION_SECRET, Iron.defaults)
  } catch (e) {
    return res.status(401)
  }

  try {
    const customerResponse = await getCustomer({ email: user.email })
    const customer = customerResponse.data[0]

    if (!customer) {
      return res.json(customerTransactions)
    }
    const { id, metadata } = customer
    const opts = { customer: id }
    const { query } = req
    const { start, end } = query
    const startDate = start && getUnix(new Date(start))
    const endDate = end && getUnix(new Date(end))

    if (metadata) {
      const { firstName, lastName } = metadata
      customerTransactions.data.user = { firstName, lastName }
    }

    if (startDate || endDate) {
      opts.created = {}
      if (startDate) {
        opts.created.gte = startDate
      }
      if (endDate) {
        opts.created.lte = endDate
      }
    }
    const chargesData = await getCustomerCharges(opts)
    customerTransactions.data.transactions = chargesData.data.map(charge => {
      const { amount, created } = charge
      return { amount, created }
    })
  } catch (e) {}

  res.json(customerTransactions)
}
