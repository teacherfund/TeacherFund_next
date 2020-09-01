const stripeKey = process.env.production
  ? process.env.STRIPE_SECRET_KEY
  : process.env.STRIPE_SECRET_KEY_TEST

const stripe = require('stripe')(stripeKey)

export default async (req, res) => {
  // Raised 10k outside of stripe
  const outsideDonations = 1100000
  let donations = [{ amount: outsideDonations }]

  // Fetch payouts data from stripe
  try {
    const response = await stripe.payouts.list({
      limit: 100
    })
    donations = donations.concat(
      ...response.data
        .map((payout) => ({
          amount: payout.amount
        }))
    )
  } catch (e) {}

  res.json(donations)
}
