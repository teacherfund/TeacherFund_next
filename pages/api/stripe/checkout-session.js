const { findOrCreateCustomer } = require('../../../lib/stripeHelpers')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()
  const data = req.body

  // Get or create customer
  const customer = await findOrCreateCustomer({
    name: `${data.firstName} ${data.lastName}`,
    email: data.email
  })

  // Create checkout session for the user
  try {
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      ui_mode: 'custom',
      payment_method_types: ['card', 'us_bank_account', 'link'],
      mode: data.mode, // 'payment' or 'subscription'
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Teacher Fund Donation of $${data.amount / 100}`
            },
            recurring: data.mode === 'subscription' ? {
              interval: 'month'
            } : undefined,
            unit_amount: data.amount
          },
          quantity: 1
        }
      ],
      return_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`
    })

    res.json({ clientSecret: session.client_secret })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create checkout session: ' + error.message })
  }
}
