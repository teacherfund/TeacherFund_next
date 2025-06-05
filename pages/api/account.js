import Iron from '@hapi/iron'
import CookieService from '../../lib/cookie'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  let user
  try {
    user = await Iron.unseal(CookieService.getAuthToken(req.cookies), process.env.ENCRYPTION_SECRET, Iron.defaults)
  } catch (error) {
    return res.status(401).end()
  }

  // With the users email, fetch the customer ID from stripe so that we can fetch donation information
  try {
    const response = await stripe.customers.list({
      email: user.email
    })
    const { data } = response
    const [customer] = data

    if (!customer) {
      return res.json(user)
    }

    const { id, metadata } = customer
    const { firstName, lastName } = metadata

    user = {
      ...user,
      customerId: id,
      firstName,
      lastName
    }

    // Get customer most recent subscription
    const subscriptions = await stripe.subscriptions.list({
      customer: id,
      limit: 1,
      status: 'active'
    })
    const [subscription] = subscriptions.data
    if (!subscription) {
      return res.json(user)
    }

    user.subscriptionId = subscription.id
    user.subscriptionStart = new Date(subscription.start_date * 1000) // Convert to milliseconds
    user.donationAmount = subscription.plan.amount

    res.json(user)
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch customer data from Stripe' })
  }
}
