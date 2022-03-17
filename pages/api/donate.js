const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Amount is in cents
const findOrCreatePlan = async ({ amount }) => {
  // Fetch all plans to see if we have one that matches the amount already
  const existingPlansRes = await stripe.plans.list()
  return existingPlansRes.data.find(p => p.amount === amount) || stripe.plans.create({
    amount: amount,
    interval: 'month',
    product: {
      name: `Teacher Fund user donation plan for $${amount / 100}`
    },
    currency: 'usd'
  })
}

const createDonation = async ({ customerId, planId }) => {
  await stripe.subscriptions.create({
    customer: customerId,
    items: [{ plan: planId }]
  })
}

const findOrCreateCustomer = async ({ email, meta, source }) => {
  const existingCustomerRes = await stripe.customers.list({ email })
  if (existingCustomerRes.data.length) {
    const customer = existingCustomerRes.data[0]
    if (customer && customer.sources && customer.sources.total_count > 0) {
      // if the customer already has a payment method, update it to be the one
      // just entered
      await stripe.customers.update(customer.id, {
        source: source.id
      })
    }

    return customer
  } else {
    return stripe.customers.create({
      email,
      metadata: meta,
      source: source.id
    })
  }
}

export default async (req, res) => {
  const {
    source,
    firstName,
    lastName,
    frequency,
    amount,
    email
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
        description: 'Donation',
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
