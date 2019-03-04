import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'

import Footer from '../components/footer'
import '../static/styles/main.scss'

class Success extends React.Component {
  render () {
    return (
      <div className='main-container'>
        <Head title='Success' />
        <Nav navColor='black' />
        <div className='body'>
          <p>Success</p>
        </div>

        <Footer />
      </div>
    )
  }
}

export default Success
