/* global fetch */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Magic } from 'magic-sdk'
import '../static/styles/main.scss'

const LoginForm = (props) => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [message] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
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
  }

  return (
    <div className='bg-white w6 pb3 br3'>
      <div className='ts-title tf-lato tc mt3'>
        <h2 className='h35 tf-dark-gray'>Sign in</h2>
      </div>
      <div className='tc'>
        <div className='panel'>
          <div className='tf-lato'>
            <p className='red'>{error}</p>
          </div>
          <div>
            <p className='tf-lato'>{message}</p>
          </div>
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
            <input
              type='submit'
              className='white bg-tf-yellow ttu tf-lato b tc pa2 w5 m-auto br-pill pointer'
              id='submit_btn'
              value='Sign in'
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
