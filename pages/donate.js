import Nav from '../components/nav'
import DonateForm from '../components/donateform'
import Head from 'next/head'
import { Elements, StripeProvider } from 'react-stripe-elements'
import { Component } from 'react'
import '../static/styles/main.scss'

class Donate extends Component {
  render() {
    return (
      <div>
        <Head>
          <script src="https://js.stripe.com/v3/" />
        </Head>
        <Nav />

        <div className='title'>
          <h1>Donate</h1>
          { process.browser && <div>
              <StripeProvider apiKey='pk_test_MppaPpdtCIVpYJNuLgU0chUa'>
                <div className=''>
                  <Elements>
                    <DonateForm />
                  </Elements>
                </div>
              </StripeProvider>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Donate