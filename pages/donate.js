import Nav from '../components/nav'
import DonateForm from '../components/donateform'
import Head from '../components/head'
import { Elements, StripeProvider } from 'react-stripe-elements'
import { Component } from 'react'
import '../static/styles/main.scss'

class Donate extends Component {
  titleText = '100% of your money brings school supplies to public school teachers in need.';
  descriptionText = 'You can give knowing your whole gift will help equip classrooms.';

  render () {
    return (
      <div>
        <Head title='Donate' />
        <Nav />

        <div className='w-100 h-100 flex pa5-ns pa3'>
          <img className='absolute di-ns w-100 h-100 top-0 left-0 z-minus-1 dn' src='/static/images/pencils.jpg' />
          { process.browser && <div className='flex flex-row-reverse-ns flex-column m-auto justify-between'>
            <div className='flex flex-column pa4-ns pa2 pb4 w-50-ns tf-lato tc mv-auto'>
              <h2 className=''>
                {this.titleText}
              </h2>
              <div className=''>
                {this.descriptionText}
              </div>
            </div>
            <StripeProvider apiKey='pk_live_FYwjfNktzq3upZRFbxA9hyc8'>
              <div className='flex flex-column'>
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
