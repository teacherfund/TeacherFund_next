import Iron from '@hapi/iron'
import CookieService from '../../../../lib/cookie'
import { getUnix } from '../../../../utils/date.utils'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const customerTransactions = { data: { transactions: [], user: {} } }

  let user
  try {
    user = await Iron.unseal(CookieService.getAuthToken(req.cookies), process.env.ENCRYPTION_SECRET, Iron.defaults)
  } catch (e) {
    return res.status(401)
  }

  try {
    const customerResponse = await stripe.customers.list({ email: user.email })
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

    if (metadata && Object.keys(metadata).length > 0) {
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
    const chargesData = await stripe.charges.list(opts)
    customerTransactions.data.transactions = chargesData.data.map(charge => {
      const { amount, created } = charge
      return { amount, created }
    })

    customerTransactions.data.transactions.sort((a, b) => b.created - a.created)
    return res.json(customerTransactions)
  } catch (e) {
    console.error('Error fetching customer transactions:', e)
    return res.status(500).json({ error: 'Failed to fetch customer transactions' })
  }
}
