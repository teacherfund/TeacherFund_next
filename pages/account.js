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

  // Gist to get window size taken from https://gist.github.com/nma/33f8057e4899bdb55440a693a02c431b
  constructor(props) {
    super(props);
    this.state = { height: 512 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener("resize", this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  getImageSize() {
    if ( this.state.width >= 1080 ) {
      return '/static/images/man-woman-reading-1920x1280.jpg'
    } else if ( this.state.width >= 720 ) {
      return '/static/images/man-woman-reading-1080x720.jpg'
    } else if ( this.state.width >= 480 ) {
      return '/static/images/man-woman-reading-720x720.jpg'
    }
    return '/static/images/man-woman-reading-480x720.jpg'
  }

  render () {
    return (
      <div>
        <Head title='Account' />
        <Nav />
        <main>
          
          <div className='w-100 h-100 flex pa5'>
            <img
              src={this.getImageSize()} 
              className='absolute w-100 h-100 top-0 left-0 z-minus-1'
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
