const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { findOrCreateCustomer, findOrCreatePlan, createDonation } = require('../../lib/stripeHelpers')

export default async (req, res) => {
  const {
    source,
    firstName,
    lastName,
    frequency,
    amount,
    email,
    description
  } = JSON.parse(req.body)

  const meta = {
    firstName,
    lastName
  }

  // If frequency is once just issue a charge, otherwise create customer and making recurring donation
  if (frequency === 'once') {
    const customer = await findOrCreateCustomer({ email, meta, source })
    try {
      await stripe.charges.create({
        amount,
        customer: customer.id,
        currency: 'usd',
        description,
        receipt_email: email
      })
    } catch (err) {
      if (err.message === 'Invalid account.') err.message = 'Invalid payment details, please verify the credit card information.'
      return res.json({ success: false, message: err.message })
    }
  } else {
    /**
     * - First check to see if a customer with this email already exists
     * - Find or create customer
     * - Find a plan from stripe with the associated amount for the donation
     * - If there isn't a current subscription, create one and return
     * - If there is a current subscription, update the subscription to point to the new plan
     */

    const customer = await findOrCreateCustomer({ email, meta, source })

    // Find a matching plan if it exists
    const plan = await findOrCreatePlan({ amount })
    const currentSubscription = customer.subscriptions.data[0]

    if (!currentSubscription) {
      createDonation({ customerId: customer.id, planId: plan.id })
      return res.json({ success: true })
    }

    const existingPlanId = (currentSubscription.plan || {}).id
    if (plan.id === existingPlanId) {
      // donation amount is the same as what the user is already donating; nothing to do
      return res.json({ success: true })
    }

    const itemIdToUpdate = currentSubscription.items.data[0].id
    // Update the customers subscription to whichever plans
    await stripe.subscriptions.update(currentSubscription.id, {
      items: [{
        id: itemIdToUpdate,
        plan: plan.id
      }]
    })
  }

  res.json({ success: true })
}
