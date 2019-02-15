import Nav from '../components/nav'
import Footer from '../components/footer'
import DonateForm from '../components/donateform'
import Head from '../components/head'
import { Elements, StripeProvider } from 'react-stripe-elements'
import { Component } from 'react'
import '../static/styles/main.scss'

class Donate extends Component {
  titleText = '100% of your money brings school supplies to public school teachers in need.';
  descriptionText = 'Private donors cover our operating costs, so you can give knowing your whole gift will help equip classrooms.';

  render () {
    return (
      <div className='main-container'>
        <Head title='Donate' />
        <Nav navColor='black' />

        <div className='body'>
          <div className='donatePage'>
            <img className='backgroundImage' src='/static/images/pencils.jpg' />
            { process.browser && <div className='donatePage__content'>
              <div className='donatePage__subsection'>
                <h2 className='donatePage__subsection_titleText'>
                  {this.titleText}
                </h2>
                <div className='donatePage__subsection_descriptionText'>
                  {this.descriptionText}
                </div>
              </div>
              <StripeProvider apiKey='pk_test_MppaPpdtCIVpYJNuLgU0chUa'>
                <div className='donatePage____content__form'>
                  <Elements>
                    <DonateForm />
                  </Elements>
                </div>
              </StripeProvider>
            </div>
            }
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Donate
