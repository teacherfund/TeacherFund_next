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

  renderTransactionList = trans => {
    return trans.map((tran, idx) => {
      return (
        <li className='flex justify-around' key={idx}>
          <p>{tran.date.getMonth()}/{tran.date.getDate()}/{tran.date.getFullYear()}</p>
          <p>${tran.amount.toLocaleString()}</p>
          <p>Status: {tran.status}</p>
        </li>
      )
    })
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
              alt='People reading'
            />
            <div className='flex flex-row-reverse m-auto'>
              <div className='bg-white w6 pb3 br3 tc tf-lato'>
                <div class='tf-oswald ts-subtext pv2 tc'>Donations</div>
                <ul className='pa1'>
                  {this.renderTransactionList(this.dummyTransactions)}
                </ul>
                <div className='white bg-tf-yellow tf-lato b tc pa2 w5 m-auto br-pill pointer'>
                  <Link href='donate'>
                    <label className='ttu'>donate again</label>
                  </Link>
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
