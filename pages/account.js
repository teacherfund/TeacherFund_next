import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'

import Footer from '../components/footer'
import '../static/styles/main.scss'

class Account extends React.Component {
  constructor() {
    super()
    this.state = {
      amountDonated: 0,
      amountSpent: 0
    }
  }

  render() {
    return (
      <div className='main-container'>
        <Head title='Account' />
        <Nav navColor='black' />
        <div className='body'>
          <div className='account-stats'>
            <p>You've donated {this.state.amountDonated} to TeacherFund thus far</p>
            <p>{this.state.amountSpent} of which has been spent on the following items</p>  
          </div>
        </div>
    
        <Footer />
      </div>
    )
  }
}

export default Account
