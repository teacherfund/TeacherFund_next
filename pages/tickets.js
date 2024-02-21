import React, { Component } from 'react'
import PageWrapper from '../components/pageWrapper'
import DonateTicketForm from '../components/donateTicketForm'
import { Box } from '@chakra-ui/react'
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

const InjectedDonateForm = () => (
  <ElementsConsumer>
    {({ elements, stripe }) => (
      <DonateTicketForm elements={elements} stripe={stripe} />
    )}
  </ElementsConsumer>
)

class Tickets extends Component {
  render () {
    return (
      <PageWrapper title='Ticket Donation – The Teacher Fund' noShowBanner>
        <React.Fragment>
          <div className='flex flex-column bg-trans-gray justify-between ph3 pv4 pv5-ns pa4-ns'>
            <div className='flex flex-column tf-lato tc mv-auto'>
              <h1 className='tf-dark-gray f2 f1-l tf-oswald fl'>
                The Teacher Fund-Raiser: The Happiest Hours!
              </h1>
              <p className='tf-lato-lite f3-m pa1 w-75-m w-50-l m-auto lh-5 lh-copy mv2'>
                 With 100 percent of your ticket donation funding public school teachers in need, you can
                    give knowing that your entire gift will help equip classrooms and help students.
              </p>
              <Box width='30%' margin='auto' height='1px' bg='black' />
              <p className='tf-lato-lite f3-m pa1 w-75-m w-50-l m-auto lh-5 lh-copy mv2'>
                We are hosting a happy hour event with delicious Food catered by <b>Arista Catering</b>, a medley of music,
                and a fun selection of <b>local wines, beers</b>, and signature beverages being served throughout the afternoon.
                We hope you can join us to celebrate, recognize, and raise money for hard working Seattle Public School teachers.
              </p>
              <Box width='30%' margin='auto' height='1px' bg='black' />
              <p className='tf-lato-lite f3-m pa1 w-75-m w-50-l m-auto lh-5 lh-copy mv2'>
                <b>WHERE:</b> Labour Temple in Downtown Seattle: 2800 1st Ave, Seattle, WA 98121
              </p>
              <p className='tf-lato-lite f3-m pa1 w-75-m w-50-l m-auto lh-5 lh-copy mv2'>
                <b>WHEN:</b> May 19th, from 3:30pm-6:30pm.
              </p>
              <p className='tf-lato-lite f3-m pa1 w-75-m w-50-l m-auto lh-5 lh-copy mv2'>
                <b>SILENT AUCTION:</b> Checks and cash accepted, or online donations. Bidding ends at 5:30pm.
              </p>
              <Box width='30%' margin='auto' height='1px' bg='black' />
              <p className='tf-lato-lite f3-m pa1 w-75-m w-50-l m-auto lh-5 lh-copy mv2'>
                Each of the ticket options below will grant entry.
                Patron tickets cover the costs of our local educators in attendance.
                <b> All ticket purchases and donations are a 501c3 tax deductible donation</b> and receipts
                can be retrieved by logging in with the email used for ticket purchase.
              </p>
            </div>
            <div className='flex flex-column w-100 w-70-m w-30-l m-auto'>
              <Elements stripe={stripePromise}>
                <InjectedDonateForm />
              </Elements>
            </div>
          </div>
        </React.Fragment>
      </PageWrapper>
    )
  }
}

export default Tickets
