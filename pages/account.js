import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

import '../static/styles/main.scss'

class Account extends React.Component {
  dummyTransactions = [
    { date: new Date(1469947879632), amount: 135, status: 'completed' },
    { date: new Date(1509947879632), amount: 25, status: 'completed' },
    { date: new Date(1569947879632), amount: 10500, status: 'pending' }
  ];

  constructor (props) {
    super(props)

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

  render () {
    return (
      <div>
        <Head title='Account' />
        <Nav />
        <main>
          <div className='w-100 h-100 flex pa5'>
            <img
              src='/static/images/man-woman-reading.jpg'
              className='absolute w-100 h-100 top-0 left-0 z-minus-1'
            />
            <div className='flex flex-row-reverse m-auto'>
              <div className='bg-white w6 pb3 br3 tc tf-lato'>
                <div className='tf-oswald ts-subtext pv2 tc'>Donations</div>
                <ul className='pa1'>
                  {this.renderTransactionList(this.dummyTransactions)}
                </ul>
                <div className='mb2 mt2'>
                  <div className='white bg-tf-yellow tf-lato b tc pa2 w5 m-auto br-pill pointer'>
                    <Link href='donate'>
                      <label className='ttu'>donate again</label>
                    </Link>
                  </div>
                </div>
                <div className='mb2 mt3'>
                  <div className='white bg-tf-teal tf-lato b tc pa2 w-50 m-auto br-pill pointer'
                    onClick={this.cancelReccuringDonation}>
                    <label className='ttu'>Cancel recurring donation</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Account
