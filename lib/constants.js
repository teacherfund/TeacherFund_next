const { loadStripe } = require('@stripe/stripe-js')

module.exports = {
  fundraisingEventTicket: '2024_spring_event_ticket',
  fundraisingEventTicketPatron: '2024_spring_event_patron_ticket',
  stripePromise: loadStripe(process.env.STRIPE_PUBLIC_KEY)
}
