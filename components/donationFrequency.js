import React from 'react'
import { Box } from '@chakra-ui/react'

const DonationFrequency = ({ updateFrequency, frequencyIdx, availableFrequencies }) => (
  <div className='flex flex-row tf-lato mt1 mb4' role='radiogroup' aria-labelledby='donate-freq'>
    <span id='donate-freq' className='sr-only--text'>Donation Frequency</span>
    {availableFrequencies.map(({ text }, idx) => {
      return (
        <Box display='flex' flexGrow={1} key={idx}>
          {idx !== 0 && (<Box width='1px' bg='black' height='auto' marginTop='1' />)}
          <label className={`tc mt1 pv2 ph1 bn ba b--black ttu pointer flex-auto ${String(idx) === frequencyIdx ? 'bg-tf-yellow tf-dark-gray' : 'tf-dark-gray bg-white pointer'}`}>
            <input className='sr-only--input' type='radio' name='frequencyIdx' value={idx} onInput={updateFrequency} />
            {text}
          </label>
        </Box>
      )
    })}
  </div>
)

export default DonationFrequency
