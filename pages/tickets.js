import React, { useState, useEffect } from 'react'
import PageWrapper from '../components/pageWrapper'
import DonateTicketForm from '../components/donateTicketForm'
import { Box } from '@chakra-ui/react'
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

const InjectedDonateForm = ({ initialFrequency }) => (
  <ElementsConsumer>
    {({ elements, stripe }) => (
      <DonateTicketForm elements={elements} stripe={stripe} initialFrequency={initialFrequency} />
    )}
  </ElementsConsumer>
)

export default function Tickets () {
  const [initialFrequency, setInitialFrequency] = useState(0)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const frequency = urlParams.get('frequency')

    if (frequency === 'patron') {
      setInitialFrequency(1)
    }
  }, [])

  return (
    <PageWrapper title='Ticket Donation – The Teacher Fund' noShowBanner>
      <React.Fragment>
        <div className='flex flex-column bg-trans-gray justify-between ph3 pv4 pv5-ns pa4-ns'>
          <div className='flex flex-column tf-lato tc mv-auto'>
            <h1 className='tf-dark-gray f2 f1-l tf-oswald fl'>
                The Teacher Fund-Raiser!
              </h1>
              <p className='tf-lato-lite f3-m pa1 w-75-m w-50-l m-auto lh-5 lh-copy mv2'>
                100% of your ticket donation goes toward funding teachers in our local area. You can
                give knowing that your entire gift will help equip classrooms and help students.
              </p>
              <Box width='30%' margin='auto' height='1px' bg='black' />
              <p className='tf-lato-lite f3-m pa1 w-75-m w-50-l m-auto lh-5 lh-copy mv2'>
                Stay tuned for the 2025 Teacher Fund-Raiser coming this August. Join us in celebrating and appreciating teachers with live entertainment,
                a delightful selection of food and beverages, a silent auction, and words from local teachers.
              </p>
              <Box width='30%' margin='auto' height='1px' bg='black' />
              <p className='tf-lato-lite f3-m pa1 w-75-m w-50-l m-auto lh-5 lh-copy mv2'>
                <b>WHERE:</b> Labour Temple in Downtown Seattle: 2800 1st Ave, Seattle, WA 98121
              </p>
              <p className='tf-lato-lite f3-m pa1 w-75-m w-50-l m-auto lh-5 lh-copy mv2'>
                <b>WHEN:</b> August 10, 2025; 3pm-6pm
                food is served at 4:30pm with programming throughout the event. Bidding closes at 5:00pm
              </p>
              <p className='tf-lato-lite f3-m pa1 w-75-m w-50-l m-auto lh-5 lh-copy mv2'>
                <b>SILENT AUCTION:</b> Checks, cash, or online donations are accepted.
              </p>
              <Box width='30%' margin='auto' height='1px' bg='black' />
              <p className='tf-lato-lite f3-m pa1 w-75-m w-50-l m-auto lh-5 lh-copy mv2'>
                Each of the ticket options below will grant entry.
                <p>General Admission: $100 per person</p>
                <p>Patron Admission: $200 per person</p>
              </p>
              <p>Patron tickets cover the costs of our local educators in attendance.</p>
              <b> All ticket purchases and donations are a 501c3 tax deductible donation</b> and receipts
              can be retrieved by logging in with the email used for ticket purchase.
            </div>
          <div className='flex flex-column w-100 w-70-m w-30-l m-auto'>
            <Elements stripe={stripePromise}>
              <InjectedDonateForm initialFrequency={initialFrequency} />
            </Elements>
          </div>
        </div>
      </React.Fragment>
    </PageWrapper>
  )
}
