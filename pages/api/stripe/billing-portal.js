import Iron from '@hapi/iron'
import CookieService from '../../../lib/cookie'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Creates a Stripe Customer Portal session (using the default portal
// configuration from the Stripe dashboard) and returns its URL for the client
// to redirect to. We land on the portal home page rather than the
// payment_method_update flow because only the home page shows the donor's
// current payment method alongside the option to add/replace it.
export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()

  let user
  try {
    user = await Iron.unseal(CookieService.getAuthToken(req.cookies), process.env.ENCRYPTION_SECRET, Iron.defaults)
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (!user?.email) return res.status(401).json({ error: 'Unauthorized' })

  try {
    // Always resolve the customer server-side from the authenticated email
    const { data: [customer] } = await stripe.customers.list({ email: user.email, limit: 1 })
    if (!customer) {
      return res.status(404).json({ error: 'No billing account found for this email' })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${process.env.DOMAIN}/account`
    })

    return res.json({ url: session.url })
  } catch (e) {
    console.error('Error creating billing portal session:', e)
    return res.status(500).json({ error: 'Failed to open the billing portal' })
  }
}
