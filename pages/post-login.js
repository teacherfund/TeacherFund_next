import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

import '../static/styles/main.scss'

const PostLogin = (props) => (
  <div className=''>
    <Head title='Post Registration' />
    <Nav />
    <div className='m-auto flex flex-column'>
      <div className='tc'>
        <p className='pb1'>
          Thank you. If you've signed up, you will receive an email shortly. You can close this tab.
        </p>
        <p className='pb1'>
          If you haven't signed up yet you will not receive an email.
        </p>
        <div className='white'>
          <Link href='/signinregister?type=donor'>
            <label className='ttu'>Go back</label>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default PostLogin
