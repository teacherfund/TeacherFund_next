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
  let productName
  let recurring
  if (isTicketPurchase) {
    productName = `Teacher Fund Ticket (${data.quantity}) purchased: ${data.frequency}`
  } else {
    productName = `Teacher Fund Donation of $${data.amount / 100}`
    recurring = data.mode === 'subscription' ? {
      interval: 'month'
    } : undefined
  }

  // Create checkout session for the user
  try {
    // Cancel the customer's existing subscription
    const { data: subscriptions } = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1
    })

    if (subscriptions.length > 0) {
      await stripe.subscriptions.cancel(subscriptions[0].id, {
        invoice_now: true,
        prorate: false
      })
    }

    // Create a new checkout session
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
              name: productName
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
