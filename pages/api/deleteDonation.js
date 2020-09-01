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
  // TODO Ensure user is authed
  if (!req.isAuthenticated()) return res.status(401)

  const {
    email
  } = JSON.parse(req.body)

  await deleteDonation({ email })

  res.json({ success: true })
}
