const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const { findOrCreateCustomer } = require('../../lib/stripeHelpers')

export default async (req, res) => {
  const {
    source,
    firstName,
    lastName,
    frequency,
    amount,
    email,
    quantity
  } = JSON.parse(req.body)

  const meta = {
    firstName,
    lastName
  }

  const customer = await findOrCreateCustomer({ email, meta, source })
  try {
    await stripe.charges.create({
      amount,
      customer: customer.id,
      currency: 'usd',
      description: `Ticket (${quantity}) purchased: ${frequency}`,
      receipt_email: email
    })
  } catch (err) {
    if (err.message === 'Invalid account.') err.message = 'Invalid payment details, please verify the credit card information.'
    return res.json({ success: false, message: err.message })
  }

  res.json({ success: true })
}
