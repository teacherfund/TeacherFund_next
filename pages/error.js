import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'

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
      </div>
    )
  }
}

export default Error
