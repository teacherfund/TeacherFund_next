import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'

import Footer from '../components/footer'
import '../static/styles/main.scss'

class Error extends React.Component {
  render () {
    return (
      <div className=''>
        <Head title='Error' />
        <Nav />
        <div className=''>
          <p>Error</p>
        </div>

        <Footer />
      </div>
    )
  }
}

export default Error
