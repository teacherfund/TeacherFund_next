import { Box, Link } from '@chakra-ui/react'
import PageWrapper from '../components/pageWrapper'
import { useAuth } from '../hooks/useAuth'

const Success = () => {
  const { user } = useAuth()

  const tweet = 'https://twitter.com/intent/tweet?url=https%3A%2F%2Ftheteacherfund.com%2f&text=I%20just%20donated%20to%20TeacherFund,%20check%20it%20out%20at'

  return (
    <PageWrapper title='Donation Successful – The Teacher Fund'>
      <Box width='100%' height='100%'>
        <Box width='100%' height='100%' position='absolute' className='bg-tf-gray o-10 z-minus-1' />
        <Box paddingTop='9rem' className='bn ba br2 flex flex-column pa4-ns pa2 pb4 w-50-ns tf-lato tc m-auto'>
          <p className='pb1'><b>Thank you!</b></p>
          <p className='pb1'>Your donation helps teachers more than can be put in words.</p>
          { user ? (
            <Box className='pb1'>If you made a monthly donation you can visit your
              <Link color='blue.500' href='/account'>{' account '}</Link>
              at any time to cancel or modify your donation.
            </Box>
          ) : (
            <Box className='pb1'>If you made a monthly donation you can
              <Link color='blue.500' href='/signin'>{' login '}</Link>
              at any time to cancel or modify your donation.
            </Box>
          )}
          <Box marginTop='2rem'>
            <a className='white no-underline pa3 db br-pill tf-lato b v-mid bg-tf-teal w-50 m-auto tc' href={tweet} data-size='large' target='_blank'>Spread the Word</a>
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  )
}
export default Success
