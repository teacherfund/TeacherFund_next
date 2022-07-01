import { Box, Link } from '@chakra-ui/react'
import PageWrapper from '../components/pageWrapper'

const TicketSuccess = () => {
  const tweet = 'https://twitter.com/intent/tweet?url=https%3A%2F%2Ftheteacherfund.com%2f&text=I%20just%20donated%20to%20TeacherFund,%20check%20it%20out%20at'

  return (
    <PageWrapper title='Ticket Donation Successful – The Teacher Fund' noShowBanner>
      <Box width='100%' height='100%'>
        <Box width='100%' height='100%' position='absolute' className='bg-tf-gray o-10 z-minus-1' />
        <Box paddingTop='9rem' className='bn ba br2 flex flex-column pa4-ns pa2 pb4 w-50-ns tf-lato tc m-auto'>
          <p className='pb1'><b>Thank you!</b></p>
          <p className='pb1'>Your ticket donation helps teachers more than can be put in words.</p>
          <Box className='pb1'>
            We're so excited to see you at the event! Mark your calendars for September 15th 5-7pm at the Ballard Cathedral. All food, drink, and entertainment (Seattle String Quartet) is free of charge with your ticket! Thank you for supporting your local public school teachers.
          </Box>
          <Box className='pb1'>You can log in at any time using your email to download your tax receipt for the current year
            <Link color='blue.500' href='/account'>{' by clicking here. '}</Link>
          </Box>
          <Box marginTop='2rem'>
            <a className='white no-underline pa3 db br-pill tf-lato b v-mid bg-tf-teal w-50 m-auto tc' href={tweet} data-size='large' target='_blank'>Spread the Word</a>
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  )
}
export default TicketSuccess
