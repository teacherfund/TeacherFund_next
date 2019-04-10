import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

import Footer from '../components/footer'
import '../static/styles/main.scss'

const PostLogin = (props) => (
  <div className='main-container'>
    <Head title='Post Registration' />
    <Nav navColor='white' />
    <div className='body text-center'>
      <div className='login-container'>
        <div className='post-registration-box center'>
          <p className='pb-1'>
            Thank you. An email will be sent to <b>{props.context.email}</b> soon. You can close this tab.
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

export default PostLogin
