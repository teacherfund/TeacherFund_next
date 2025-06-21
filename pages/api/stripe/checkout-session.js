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

  const isTicketPurchase = data.isTicket || false
  let recurring
  if (!isTicketPurchase) {
    recurring = data.mode === 'subscription' ? {
      interval: 'month'
    } : undefined
  }

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
              name: `Teacher Fund Ticket (${data.quantity}) purchased: ${data.frequency}`
            },
            recurring,
            unit_amount: data.amount
          },
          quantity: data.quantity || 1
        }
      ],
      return_url: isTicketPurchase ? `${process.env.DOMAIN}/ticket-success?session_id={CHECKOUT_SESSION_ID}` : `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`
    })

    res.json({ clientSecret: session.client_secret })
  } catch (error) {
    res.status(500).json({ error: `Failed to create checkout session: ${error.message}` })
  }
}
