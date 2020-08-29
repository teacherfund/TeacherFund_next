import React from 'react'
import PageWrapper from '../components/pageWrapper'
import useAuth from '../hooks/useAuth'
import Link from 'next/link'

const Account = (props) => {
  const { user, loading } = useAuth()

  const renderTransactionList = () => {
  //   return userDonations.map((tran, idx) => {
  //     return (
  //       <li className='flex justify-around' key={idx}>
  //         <p>{tran.date.getMonth()}/{tran.createdAt.getDate()}/{tran.createdAt.getFullYear()}</p>
  //         <p>${tran.amount.toLocaleString()}</p>
  //         <p>Status: Success</p>
  //       </li>
  //     )
  //   })
  }

  const cancelReccuringDonation = () => {
    // TODO implement cancelling donation
  }

  return (
    <PageWrapper title='Account – The Teacher Fund'>
      <div className='w-100 h-100 flex pa5'>
        <img
          src='/static/images/man-woman-reading.jpg'
          className='absolute w-100 h-100 top-0 left-0 z-minus-1'
          alt='People reading'
        />
        {loading ? 'Loading...' : (
          <div className='flex flex-row-reverse m-auto'>
            <div className='bg-white w6 pb3 br3 tc tf-lato'>
              <h1>{user.email}</h1>
              <div className='tf-oswald ts-subtext pv2 tc'>Donations</div>
              <ul className='pa1'>
                {renderTransactionList([])}
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
                  onClick={cancelReccuringDonation}>
                  <label className='ttu'>Cancel recurring donation</label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}

export default Account
