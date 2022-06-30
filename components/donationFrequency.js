import React from 'react'
import { Box } from '@chakra-ui/react'
import { fundraisingEventTicket, fundraisingEventTicketPatron } from '../lib/constants'

const DonationFrequency = ({ updateFrequency, frequency, frequenciesAvailable }) => (
  <div className='flex flex-row tf-lato mt1 mb4' role='radiogroup' aria-labelledby='donate-freq'>
    <span id='donate-freq' className='sr-only--text'>Donation Frequency</span>
    {frequenciesAvailable.includes('once') && (
      <label className={`tc mt1 pv2 ph1 bn ba b--black ttu pointer flex-auto ${frequency === 'once' ? 'bg-tf-yellow tf-dark-gray' : 'tf-dark-gray bg-white pointer'}`}>
        <input className='sr-only--input' type='radio' name='frequency' value='once' onInput={updateFrequency} />
        Give Once
      </label>
    )}
    {frequenciesAvailable.includes('monthly') && (
      <>
        <Box width='1px' bg='black' height='auto' marginTop='1' />
        <label className={`tc mt1 pv2 ph1 bn ba b--black ttu pointer flex-auto ${frequency === 'monthly' ? 'bg-tf-yellow tf-dark-gray' : 'tf-dark-gray bg-white pointer'}`}>
          <input className='sr-only--input' type='radio' name='frequency' value='monthly' onInput={updateFrequency} />
          Monthly
        </label>
      </>
    )}
    {frequenciesAvailable.includes(fundraisingEventTicket) && (
      <>
        <Box width='1px' bg='black' height='auto' marginTop='1' />
        <label className={`tc mt1 pv2 ph1 bn ba b--black ttu pointer flex-auto ${frequency === fundraisingEventTicket ? 'bg-tf-yellow tf-dark-gray' : 'tf-dark-gray bg-white pointer'}`}>
          <input className='sr-only--input' type='radio' name='frequency' value={fundraisingEventTicket} onInput={updateFrequency} />
          Fall 2022 Ticket
        </label>
      </>
    )}
    {frequenciesAvailable.includes(fundraisingEventTicketPatron) && (
      <>
        <Box width='1px' bg='black' height='auto' marginTop='1' />
        <label className={`tc mt1 pv2 ph1 bn ba b--black ttu pointer flex-auto ${frequency === fundraisingEventTicketPatron ? 'bg-tf-yellow tf-dark-gray' : 'tf-dark-gray bg-white pointer'}`}>
          <input className='sr-only--input' type='radio' name='frequency' value={fundraisingEventTicketPatron} onInput={updateFrequency} />
          Fall 2022 Patron
        </label>
      </>
    )}
  </div>
)

export default DonationFrequency
