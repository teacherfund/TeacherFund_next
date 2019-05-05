import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

import '../static/styles/main.scss'

class Account extends React.Component {
  render () {
    return (
      <div>
        <Head title='Account' />
        <Nav />

        <div className='w-100 h-100 flex pa5'>
          <img src='/static/images/man-woman-reading.jpg' className='absolute w-100 h-100 top-0 left-0 z-minus-1' />
          <div className='flex flex-row-reverse m-auto'>
            <div className='bg-white w6 pb3 br3 tc tf-lato'>
              <p className='pb1'>You've donated <b>${this.props.context.userAmountDonated}</b> to TeacherFund thus far.</p>
              <div className='white bg-tf-yellow tf-lato b tc pa2 w5 m-auto br-pill pointer'>
                <Link href='donate'>
                  <label className='ttu'>donate again</label>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Account
