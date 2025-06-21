const { loadStripe } = require('@stripe/stripe-js')

module.exports = {
  fundraisingEventTicket: '2025_event_ticket',
  fundraisingEventTicketPatron: '2025_event_patron_ticket',
  stripePromise: loadStripe(process.env.STRIPE_PUBLIC_KEY)
}
