import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

import Footer from '../components/footer'
import '../static/styles/main.scss'

const PostLoginWelcome = (props) => (
  <div className='main-container'>
    <Head title='Post Login Welcome' />
    <Nav navColor='white' />
    <div className='body text-center'>
      <div className='login-container'>
        <div className='post-registration-box center'>
          <p className='pb-1'>
          Welcome back to The Teacher Fund, Your contribution is highly apriciated. Thank you.
          </p>
          <p className='pb-1'>
          Please press the home button to get Started.
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
export default PostLoginWelcome
