const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (_, res) => {
  let response
  try {
    response = await stripe.balanceTransactions.list()
  } catch (e) {}

  res.json(response.data)
}
