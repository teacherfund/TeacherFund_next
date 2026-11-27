import Iron from '@hapi/iron'
import CookieService from '../../lib/cookie'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  let user
  try {
    user = await Iron.unseal(CookieService.getAuthToken(req.cookies), process.env.ENCRYPTION_SECRET, Iron.defaults)
  } catch (error) {
    return res.status(401).end()
  }

  // With the users email, fetch the customer ID from stripe so that we can fetch donation information
  try {
    const response = await stripe.customers.list({
      email: user.email,
      expand: ['data.invoice_settings.default_payment_method']
    })
    const { data } = response
    const [customer] = data

    if (!customer) {
      return res.json(user)
    }

    const { id, metadata } = customer
    const { firstName, lastName } = metadata

    user = {
      ...user,
      customerId: id,
      firstName,
      lastName
    }

    // Get customer most recent subscription. Include past_due so donors whose
    // card failed can still see their donation and update their payment method.
    const subscriptions = await stripe.subscriptions.list({
      customer: id,
      limit: 10,
      status: 'all',
      expand: ['data.default_payment_method']
    })
    const subscription = subscriptions.data.find(s => ['active', 'past_due'].includes(s.status))
    if (!subscription) {
      return res.json(user)
    }

    user.subscriptionId = subscription.id
    user.subscriptionStatus = subscription.status
    user.subscriptionStart = new Date(subscription.start_date * 1000).toLocaleString() // Convert to milliseconds
    user.donationAmount = subscription.plan.amount

    // Subscription's own payment method takes precedence; fall back to the
    // customer's default (set by the billing portal's payment method update).
    const paymentMethod = subscription.default_payment_method || customer.invoice_settings?.default_payment_method
    const last4 = paymentMethod?.card?.last4 || paymentMethod?.us_bank_account?.last4
    if (last4) {
      user.paymentLast4 = last4
    }

    res.json(user)
  } catch (e) {
    return res.status(500).json({ error: 'Failed to fetch customer data from Stripe' })
  }
}
