import Iron from '@hapi/iron'
import CookieService from '../../lib/cookie'

const stripeKey = process.env.production
  ? process.env.STRIPE_SECRET_KEY
  : process.env.STRIPE_SECRET_KEY_TEST

const stripe = require('stripe')(stripeKey)

const deleteDonation = async ({ email }) => {
  const customerRes = await stripe.customers.list({ email })
  const customer = customerRes.data[0]

  const currentSubscription = customer.subscriptions.data[0]

  if (!currentSubscription) return

  // Delete the customers subscription
  await stripe.subscriptions.del(currentSubscription.id)
}

export default async (req, res) => {
  try {
    const user = await Iron.unseal(CookieService.getAuthToken(req.cookies), process.env.ENCRYPTION_SECRET, Iron.defaults)
    await deleteDonation({ email: user.email })
  } catch (e) {
    return res.status(401)
  }

  res.json({ success: true })
}
