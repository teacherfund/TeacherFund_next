import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import '../static/styles/main.scss'
import HourGlass from '../components/hourGlass'

class Account extends React.Component {
  constructor () {
    super()
    this.state = {
      amountDonated: 0,
      amountSpent: 0
    }
  }

  render () {
    return (
      <div className='main-container'>
        <Head title='Account' />
        <Nav navColor='black' />
        <div className='body'>
          <img src='/static/images/man-woman-reading.jpg' className='backgroundImage' />
          <div className='account--stats'>
            <HourGlass />
            <p className='pb-1'>You've donated <b>{this.state.amountDonated}</b> to TeacherFund thus far</p>
            <p className='pb-1'><b>{this.state.amountSpent}</b> of which has been spent on the following items</p>
            <div className='button--subsection white'>
              <Link href='donate'>
                <label className='ttu'>donate</label>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

export default Account
