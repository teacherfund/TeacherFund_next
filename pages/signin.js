import React from 'react'
import {
  Box
} from '@chakra-ui/react'
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
      {...props}
    >
      <Box align='center' fontSize='28px' paddingBottom='2rem'>
        <h1>Sign in</h1>
      </Box>
      <LoginForm />
    </Box>
  </PageWrapper>
)

export default SignIn
