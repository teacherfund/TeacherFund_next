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

    const { id, metadata } = customer
    const { firstName, lastName } = metadata

    user = {
      ...user,
      customerId: id,
      firstName,
      lastName
    }

    const subscription = customer.subscriptions.data[0]

    if (subscription) {
      user.donationAmount = subscription.plan.amount
    }
  } catch (e) {
    console.error(e)
  }

  res.json(user)
}
