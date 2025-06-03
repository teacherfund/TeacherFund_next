import Iron from '@hapi/iron'
import CookieService from '../../../../lib/cookie'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const deleteDonation = async ({ email, subscriptionId }) => {
  try {
    if (!subscriptionId) {
      const customers = await stripe.customers.list({
        email
      })
      if (!customers.data?.length) {
        throw new Error('No customer found with this email')
      }

      const subscriptions = await stripe.subscriptions.list({
        customer: customers.data[0].id,
        status: 'active',
        limit: 1
      })
      if (!subscriptions.data.length) {
        throw new Error('No active subscription found for this customer')
      }

      subscriptionId = subscriptions.data[0].id
    }

    console.log('Found subscription:', subscriptionId)
    await stripe.subscriptions.cancel(subscriptionId, {
      invoice_now: true,
      prorate: false
    })
  } catch (error) {
    throw new Error('Failed to delete donation')
  }
}

export default async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).end() // Method Not Allowed
  }

  try {
    const user = await Iron.unseal(
      CookieService.getAuthToken(req.cookies),
      process.env.ENCRYPTION_SECRET,
      Iron.defaults
    )
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Delete the donation subscription
    await deleteDonation(
      user.subscriptionId
        ? { subscriptionId: user.subscriptionId }
        : { email: user.email }
    )

    // Remove subscription details from user object
    delete user.subscriptionId
    delete user.donationAmount
    delete user.subscriptionStart

    // Seal the updated user object
    const token = await Iron.seal(user, process.env.ENCRYPTION_SECRET, Iron.defaults)
    CookieService.setTokenCookie(res, token)
    return res.status(200).json({ message: 'Donation deleted successfully' })
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
}
