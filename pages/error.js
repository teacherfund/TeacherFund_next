import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'

import Footer from '../components/footer'
import '../static/styles/main.scss'

class Error extends React.Component {
  render () {
    return (
      <div className='main-container'>
        <Head title='Error' />
        <Nav navColor='black' />
        <div className='body'>
          <p>Error</p>
        </div>

        <Footer />
      </div>
    )
  }
}

export default Error
