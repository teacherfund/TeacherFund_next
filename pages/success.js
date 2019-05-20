import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

import '../static/styles/main.scss'

class Success extends React.Component {
  static defaultProps = {
    tweet: 'https://twitter.com/intent/tweet?url=https%3A%2F%2Ftheteacherfund.com%2f&text=I%20just%20donated%20to%20TeacherFund,%20check%20it%20out%20at'
  };
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
            <div>
              <a className='white no-underline pa3 db br-pill tf-lato b v-mid bg-tf-yellow w-20 m-auto tc' href={this.props.tweet} data-size='large' target='_blank'>Spread the Word</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Success
