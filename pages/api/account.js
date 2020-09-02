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
    user.donationAmount = response.data[0].subscriptions.data[0].plan.amount
  } catch (e) {
    console.error(e)
  }

  res.json(user)
}
