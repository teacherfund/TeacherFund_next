import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

import '../static/styles/main.scss'

const PendingLogin = (props) => (
  <div className=''>
    <Head title='Post Registration' />
    <Nav />
    <main>
      <div className='w-100 h-100 flex pa5'>
        <img className='absolute w-100 h-100 top-0 left-0 z-minus-1' src='/static/images/einstein.jpg' />
        <div className='flex flex-row-reverse m-auto'>
          <div className='bg-white w6 pb3 br3 tf-lato tc'>
            <p className='pb1'>
              Thank you. If you've signed up, you will receive an email shortly. You can close this tab.
            </p>
            <p className='pb1'>
              If you haven't signed up yet you will not receive an email.
            </p>
            <div className='white bg-tf-yellow tf-lato b tc pa2 w5 m-auto br-pill pointer'>
              <Link href='/signinregister?type=donor'>
                <label className='ttu'>Go back</label>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
)

export default PendingLogin
