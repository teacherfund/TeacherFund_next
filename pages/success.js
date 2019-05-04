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
        <div className='body success--body'>
          <img src='/static/images/einstein.jpg' className='backgroundImage full-height' />
          <div className='success'>
            <p className='pb-1'>Thank you! Your donation helps teachers and students across the country.</p>
            <p className='pb-1'>If you have an account, we'll be in touch when your funds are spent so you can see exactly what your money is being spent on.</p>
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
