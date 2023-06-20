/* global fetch */
import React, { useState, useEffect } from 'react'
import { Button, Text, Box, Image, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import PageWrapper from '../components/pageWrapper'
import { useAuth } from '../hooks/useAuth'
import Link from 'next/link'
import Card from '../components/card'
import TaxReceiptButton from '../components/taxReceiptButton'

const Account = () => {
  const { user, revalidate } = useAuth()
  const [pageLoading, setPageLoading] = useState(true)
  const [hasValidated, setHasValidated] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!user && !hasValidated) {
      revalidate()
      setHasValidated(true)
    } else if (!user && hasValidated) {
      router.push('/signin')
    } else if (user && pageLoading) {
      setPageLoading(false)
    }
  }, [user])

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

  const tweet =
    'https://twitter.com/intent/tweet?url=https%3A%2F%2Ftheteacherfund.com%2f&text=Support%20teachers%20with%20The%20Teacher%20Fund,%20check%20it%20out%20at'

  return (
    <PageWrapper title='Account – The Teacher Fund'>
      <Flex width={['100%']} height='100%' padding={['1rem', '5rem']}>
        {pageLoading ? (
          <Card margin='auto' marginTop='10rem' borderRadius='1rem'>
            <Text fontSize='4rem'>Loading...</Text>
          </Card>
        ) : (
          <>
            <Image
              src='/images/man-woman-reading.jpg'
              display={['none', 'block']}
              className='absolute w-100 h-100 top-0 left-0 z-minus-1'
              alt='People reading'
            />
            <Box
              className='tf-lato'
              textAlign='center'
              borderRadius='1rem'
              padding={['0', '3rem']}
              backgroundColor='white'
              margin='auto'
              width={['100%', '100%', '80%', '35rem']}
            >
              <div className='tf-oswald ts-subtext pv2 tc'>
                Current Monthly Donation
              </div>
              <Text className='pa1' fontSize='2rem' padding={['1rem', '3rem']}>
                $ {user && user.donationAmount ? user.donationAmount / 100 : 0}
              </Text>
              <Text fontSize='1.3rem' marginBottom='2rem'>
                Public school teachers appreciate your contribution more than
                you know. Words do not do justice.
              </Text>
              <div className='mb3'>
                <div className='white tf-lato b tc pa3 w-75 w-50-ns m-auto br-pill pointer btn-primary'>
                  <Link href='donate' legacyBehavior>
                    <label className='ttu pointer'>
                      {user && user.donationAmount
                        ? 'donate again'
                        : 'Donate today'}
                    </label>
                  </Link>
                </div>
              </div>
              <div className='mb3'>
                <a
                  className='white no-underline pa3 db ttu br-pill tf-lato b v-mid w-75 w-50-ns m-auto tc btn-teal'
                  href={tweet}
                  data-size='large'
                  target='_blank'
                >
                  Spread the Word
                </a>
              </div>
              {user && user.customerId && (
                <div className='mb3'>
                  <Button
                    color='white'
                    isLoading={cancelLoading}
                    backgroundColor='red.500'
                    borderRadius='9999px'
                    paddingTop='1rem'
                    _hover={{ bg: 'white' }}
                    paddingBottom='1rem'
                    height='56px'
                    width={['75%', '50%']}
                    className='tf-lato btn-red ttu b tc pa2 w-50 m-auto'
                    onClick={cancelReccuringDonation}
                  >
                    <label>Cancel donation</label>
                  </Button>
                </div>
              )}
              {user && user.customerId && <TaxReceiptButton />}
            </Box>
          </>
        )}
      </Flex>
    </PageWrapper>
  )
}

export default Account
