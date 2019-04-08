import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

import Footer from '../components/footer'
import '../static/styles/main.scss'

const PostRegistration = (props) => (
  <div className='main-container'>
    <Head title='Post Registration' />
    <Nav navColor='white' />
    <div className='body text-center'>
      <div className='login-container'>
        <div className='post-registration-box'>
          <p className='pb-1'>
            Hi {props.firstname}, you've reigstered in our website successfully.
          </p>
          <p className='pb-1'>
            An email will be sent to your email address {props.email} soon.
          </p>
          <div className='button--subsection white'>
            <Link href='/'>
              <label className='ttu'>Home</label>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

export default PostRegistration
