/* global fetch */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    let user
    const response = await fetch('/api/account')
    if (response.ok) {
      user = await response.json()
    }

    // Create checkout session for the user
    const session = await stripe.checkout.sessions.create({
      customer: user?.customerId,
      customer_email: user?.email,
      ui_mode: 'custom',
      mode: 'setup',
      currency: 'usd',
      return_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`
    })

    console.log(session)
    res.send({ clientSecret: session.client_secret })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).send({ error: 'Failed to create checkout session' })
  }
}
