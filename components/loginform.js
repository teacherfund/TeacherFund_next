/* global fetch */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Magic } from 'magic-sdk'
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

    // the .loginWithMagicLink causes an email to be sent to the user
    // after they click the magic link, this function call returns us a
    // magic ID; if we have a magic ID returned to us, the user has
    // successfully authenticated
    const magicId = await new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY)
      .auth
      .loginWithMagicLink({ email: elements.email.value })

    // we can now pass the magic ID to our own backend (a vercel lambda)
    // which knows our magic secret. the lambda will ask Magic to translate
    // the magic ID into an email address
    const authRequest = await fetch('/api/login', {
      method: 'POST',
      headers: { Authorization: `Bearer ${magicId}` }
    })

    if (authRequest.ok) {
      router.push('/account')
    } else {
      setError('Unable to login! Please email support@theteacherfund.com for help!')
    }
    setIsLoading(false)
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
