import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { login } from '../hooks/useAuth'
import {
  Button,
  Box
} from '@chakra-ui/core'
import '../public/styles/main.scss'

import Card from './card'

const LoginForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { elements } = e.target

    const { ok } = await login({ email: elements.email.value })

    setIsLoading(false)

    if (ok) {
      router.push('/account')
    } else {
      setError('Unable to login! Please email support@theteacherfund.com for help!')
    }
  }

  return (
    <Card width='100%' maxWidth='45rem'>
      <div className='tc'>
        <div className='panel'>
          <div className='tf-lato'>
            <p className='red'>{error}</p>
          </div>
          <Box marginButtom='1rem'>
            <p className='tf-lato'>{message}</p>
          </Box>
          <form onSubmit={handleSubmit}>
            <div className='mb2'>
              <input
                required='required'
                className='ba b--black pa2 w5 ma1 br2'
                onChange={e => setEmail(e.target.value)}
                value={email}
                aria-required='true'
                aria-label='Email Address'
                placeholder='Email'
                type='email'
                name='email'
                id='user_email'
                autoComplete='off'
              />
            </div>
            <Button
              type='submit'
              isLoading={isLoading}
              backgroundColor='pencilYellow'
              color='white'
              _hover={{ bg: 'eraserPink' }}
              textTransform='uppercase'
              margin='auto'
              className='tf-lato w5 br-pill'
              id='submit_btn'
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </Card>
  )
}

export default LoginForm
