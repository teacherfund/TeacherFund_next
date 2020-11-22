const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  // Raised 21k outside of stripe
  const outsideDonations = 2100000
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
