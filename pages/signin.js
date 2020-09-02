import React from 'react'
import {
  Box,
  PseudoBox
} from '@chakra-ui/core'
import PageWrapper from '../components/pageWrapper'
import LoginForm from '../components/loginform'

const SignIn = (props) => (
  <PageWrapper title='Sign In – The Teacher Fund'>
    <Box
      as='section'
      display='flex'
      justifyItems='center'
      flexDirection='column'
      alignItems='center'
      padding={{ base: '3rem 1.5rem', lg: '6rem 7.5rem' }}
      backgroundColor='gray.50'
      height='100vh'
      {...props}>
      <PseudoBox align='center' fontSize='28px' paddingBottom='2rem'>
        <h1>Sign in</h1>
      </PseudoBox>
      <LoginForm />
    </Box>
  </PageWrapper>
)

export default SignIn
