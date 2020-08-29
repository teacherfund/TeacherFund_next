import React, { Component } from 'react'
import PageWrapper from '../components/pageWrapper'
import Link from 'next/link'

class Account extends Component {
  dummyTransactions = [
    { date: new Date(1469947879632), amount: 135, status: 'completed' },
    { date: new Date(1509947879632), amount: 25, status: 'completed' },
    { date: new Date(1569947879632), amount: 10500, status: 'pending' }
  ];

  constructor (props) {
    super(props)
    this.tweet = 'https://twitter.com/intent/tweet?url=https%3A%2F%2Ftheteacherfund.com%2f&text=Support%20teachers%20by%20donating%20to%20The%20Teacher%20Fund%20at'
    this.verifyUser()
  }

  static getInitialProps ({ query }) {
    return { query }
  }

  verifyUser = async () => {
    try {
      await this.props.helpers.handleVerify({
        email: this.props.query.email,
        auth: this.props.query.auth
      })
    } catch (e) {
      console.log('error', e)
      // TODO Do something with stats
    }
  }

  renderTransactionList = () => {
    return this.props.context.userDonations.map((tran, idx) => {
      return (
        <li className='flex justify-around' key={idx}>
          <p>{tran.date.getMonth()}/{tran.createdAt.getDate()}/{tran.createdAt.getFullYear()}</p>
          <p>${tran.amount.toLocaleString()}</p>
          <p>Status: Success</p>
        </li>
      )
    })
  }

  cancelReccuringDonation = () => {
    // TODO implement cancelling donation
  }

  getImpact = () => {
    return this.props.context.userDonations.reduce((acc, don) => {
      return acc + don.amount
    }, 0)
  }

  render () {
    return (
      <PageWrapper title='Account – The Teacher Fund'>
        <div className='w-100 h-100 flex pa5'>
          <img
            src='/static/images/man-woman-reading.jpg'
            className='absolute w-100 h-100 top-0 left-0 z-minus-1'
            alt='People reading'
          />
          <div className='flex flex-row-reverse m-auto'>
            <div className='bg-white w6 pb4 br2 pt4 tc tf-lato'>
              <p className='center tf-lato'>Teachers need your support now more than ever. Thank you.</p>
              <div className='tf-oswald ts-subtext pv2 tc'>Your Impact</div>
              <ul className='pa1'>
                $ {this.getImpact()}
              </ul>
              <div className='mb2 mt2'>
                <div className='white bg-tf-yellow tf-lato b tc pa3 w5 m-auto br-pill pointer'>
                  <Link href='donate'>
                    <label className='ttu pointer'>donate again</label>
                  </Link>
                </div>
              </div>
              <div className='mt3'>
                <a className='white no-underline pa3 db ttu br-pill tf-lato b v-mid bg-tf-teal w-50 m-auto tc'
                  href={this.tweet}
                  data-size='large'
                  target='_blank'>
                     Spread the Word
                </a>
              </div>
              <div className='mb2 mt3'>
                <div className='white bg-tf-teal tf-lato b tc pa2 w-50 m-auto br-pill pointer'
                  onClick={this.cancelReccuringDonation}>
                  <label className='ttu pointer'>Cancel recurring donation</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    )
  }
}

export default Account
