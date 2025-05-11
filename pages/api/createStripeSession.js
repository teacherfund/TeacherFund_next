const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'custom',
    mode: 'setup',
    return_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`
  })

  res.send({ clientSecret: session.client_secret })
}
