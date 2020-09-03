/* global fetch */
import React, { useState } from 'react'
import { Button, Text, Box } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import PageWrapper from '../components/pageWrapper'
import useAuth from '../hooks/useAuth'
import Link from 'next/link'
import Card from '../components/card'

const Account = () => {
  const { user, loading, error } = useAuth()
  const [cancelLoading, setCancelLoading] = useState(false)
  const router = useRouter()

  if (error || !user) {
    router.push('/signin')
  }

  const cancelReccuringDonation = async () => {
    setCancelLoading(true)
    try {
      await fetch('/api/deleteDonation')
      router.reload()
    } catch (e) {
      // TODO show error deleting donation
    } finally {
      setCancelLoading(false)
    }
  }

  const tweet = 'https://twitter.com/intent/tweet?url=https%3A%2F%2Ftheteacherfund.com%2f&text=Support%20teachers%20with%20The%20Teacher%20Fund,%20check%20it%20out%20at'

  return (
    <PageWrapper title='Account – The Teacher Fund'>
      <div className='w-100 h-100 flex pa5'>
        <img
          src='/images/man-woman-reading.jpg'
          className='absolute w-100 h-100 top-0 left-0 z-minus-1'
          alt='People reading'
        />
        {loading ? (
          <Card margin='auto' marginTop='10rem' borderRadius='1rem'>
            <Text fontSize='4rem'>Loading...</Text>
          </Card>
        ) : (
          <div className='flex flex-row-reverse m-auto'>
            <Box className='tf-lato'
              textAlign='center'
              borderRadius='1rem'
              padding='3rem'
              backgroundColor='white'
              width='35rem'>
              <div className='tf-oswald ts-subtext pv2 tc'>Current Monthly Donation</div>
              <Text className='pa1' fontSize='2rem' padding='3rem'>
                $ {user && user.donationAmount && ((user.donationAmount / 100) || 0)}
              </Text>
              <Text fontSize='1.3rem' marginBottom='2rem'>
                Public school teachers appreciate your contribution more than you know. Words do not do justice.
              </Text>
              <div className='mb2 mt2'>
                <div className='white bg-tf-yellow tf-lato b tc pa3 w-50 m-auto br-pill pointer'>
                  <Link href='donate'>
                    <label className='ttu pointer'>{(user && user.donationAmount) ? 'donate again' : 'Donate today'}</label>
                  </Link>
                </div>
              </div>
              <div className='mt3'>
                <a className='white no-underline pa3 db ttu br-pill tf-lato b v-mid bg-tf-teal w-50 m-auto tc'
                  href={tweet}
                  data-size='large'
                  target='_blank'>
                     Spread the Word
                </a>
              </div>
              <div className='mb2 mt3'>
                <Button color='white'
                  isLoading={cancelLoading}
                  backgroundColor='red.500'
                  borderRadius='9999px'
                  paddingTop='1rem'
                  _hover={{ bg: 'red.200' }}
                  paddingBottom='1rem'
                  height='auto'
                  width='50%'
                  className='tf-lato ttu b tc pa2 w-50 m-auto'
                  onClick={cancelReccuringDonation}>
                  Cancel donation
                </Button>
              </div>
            </Box>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}

export default Account
