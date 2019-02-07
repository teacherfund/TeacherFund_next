import Nav from '../components/nav'
import DonateForm from '../components/donateform'
import Head from 'next/head'
import { Elements, StripeProvider } from 'react-stripe-elements'
import { Component } from 'react'
import '../static/styles/main.scss'

class Donate extends Component {
  titleText = '100% of your money brings school supplies to public school teachers in need.';
  descriptionText = 'Private donors cover our operating costs, so you can give knowing your whole gift will help supply classrooms.';

  render() {
    return (
      <div>
        <Head>
          <script src="https://js.stripe.com/v3/" />
        </Head>
        <Nav navColor="black"/>

        <div className="donatePage">
          <img className="backgroundImage" src="/static/images/pencils.jpg" />
          { process.browser && <div className="donatePage__content">
            <StripeProvider apiKey='pk_test_MppaPpdtCIVpYJNuLgU0chUa'>
              <div className="donatePage____content__form">
                <Elements>
                  <DonateForm />
                </Elements>
              </div>
            </StripeProvider>
            <div className="donatePage__subsection">
              <h2 className="donatePage__subsection_titleText">
                {this.titleText}
              </h2>
              <div className="donatePage__subsection_descriptionText">
                {this.descriptionText}
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    )
  }
}

export default Donate