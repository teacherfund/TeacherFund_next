import Iron from '@hapi/iron'
import CookieService from '../../lib/cookie'

const stripeKey = process.env.production
  ? process.env.STRIPE_SECRET_KEY
  : process.env.STRIPE_SECRET_KEY_TEST

const stripe = require('stripe')(stripeKey)

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
    user.donationAmount = response.data[0].subscriptions.data[0].plan.amount
  } catch (e) {
    user.donationAmount = 'N/A'
  }

  res.json(user)
}
