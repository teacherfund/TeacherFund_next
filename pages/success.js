import React from 'react'
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
        <Head title='Donation Successful – The Teacher Fund' />
        <Nav navColor='black' />
        <main>
          <div className='w-100 h-100 flex'>
            <div className='w-100 h-100 absolute bg-tf-gray o-10 z-minus-1' />
            <div className='bn ba br2 flex flex-column pa4-ns pa2 pb4 w-50-ns tf-lato tc m-auto'>
              <p className='pb1'><b>Thank you!</b></p>
              <p className='pb1'>Your donation helps teachers and students across the country.</p>
              <p className='pb1'>If you have an account, we'll be in touch when your funds are spent so you can see exactly what your money is being spent on.</p>
              <div>
                <a className='white no-underline pa3 db br-pill tf-lato b v-mid bg-tf-teal w-50 m-auto tc' href={this.props.tweet} data-size='large' target='_blank'>Spread the Word</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}
export default Success
