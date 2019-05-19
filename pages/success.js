import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

import '../static/styles/main.scss'

class Success extends React.Component {
  render () {
    return (
      <div className='main-container'>
        <Head title='Success' />
        <Nav navColor='black' />
        <div className='w-100 h-100 flex pa5-ns pa3'>
          <img src='/static/images/einstein.jpg' className='absolute di-ns w-100 h-100 top-0 left-0 z-minus-1 dn' />
          <div className='bn-ns ba br2 flex flex-column pa4-ns pa2 pb4 w-50-ns tf-lato tc bg-white m-auto'>
            <p className='pb1'><b>Thank you!</b></p>
            <p className='pb1'>Your donation helps teachers and students across the country.</p>
            <p className='pb1'>If you have an account, we'll be in touch when your funds are spent so you can see exactly what your money is being spent on.</p>
            <div className='button--subsection white'>
              <Link href='/'>
                <label className='ttu'>Home</label>
              </Link>
            </div>
            {/* <div className='button--subsection white'>
              <div onClick={this.tweet}>
                <label className='ttu'>Spread the word</label>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Success
