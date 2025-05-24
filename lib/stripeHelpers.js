const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

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

module.exports = {
  findOrCreateCustomer,
  findOrCreatePlan,
  createDonation
}
