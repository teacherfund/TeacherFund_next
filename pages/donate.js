import PageWrapper from '../components/pageWrapper'
import DonateForm from '../components/donateform'
import { Elements, StripeProvider } from 'react-stripe-elements'
import { Component } from 'react'

class Donate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPaypalButton: true
    }
  }

  render () {
    return (
      <PageWrapper title='Donate – The Teacher Fund'>
        <div className='w-100 h-100 flex'>
          <div className='w-100 h-100 absolute bg-tf-gray o-10 z-minus-1' />
          {process.browser && <div className='flex flex-column m-auto justify-between pa3 pa4-ns'>
            <div className='flex flex-column pa4-ns pa2 pb4 tf-lato tc mv-auto'>
              <h1 className='tf-dark-gray f1 tf-oswald fl pb3 mv0'>
                Fund Teachers. Help Students.
              </h1>
              <p className='tf-gray tf-lato-lite f3-m pa1 w-75-ns m-auto mv0 lh-5 lh-copy'>
                With 100 percent of your donation funding public school teachers in need, you can
                give knowing that your entire gift will help equip classrooms and help students.
              </p>
            </div>
            <StripeProvider apiKey='pk_live_FYwjfNktzq3upZRFbxA9hyc8'>
              <div className='flex flex-column w5-l w-100 w-60-m m-auto'>
                <Elements>
                  <DonateForm />
                </Elements>
              </div>
            </StripeProvider>
            {this.state.showPaypalButton && <div className='flex flex-column w-120 m-auto'>
              <div className='tf-lato ttu v-mid m-auto pb4 pt3'>
                  -Or Donate With PayPal-
              </div>
              <div className='m-auto'>
                <form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'>
                  <input type='hidden' name='cmd' value='_s-xclick' />
                  <input type='hidden' name='hosted_button_id' value='W235G2KHKQLP8' />
                  <input type='image' src='https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif' border='0' name='submit' title='PayPal - The safer, easier way to pay online!' alt='Donate with PayPal button' />
                  <img alt='' border='0' src='https://www.paypal.com/en_US/i/scr/pixel.gif' width='1' height='1' />
                </form>
              </div>
            </div>}
          </div>
          }
        </div>
      </PageWrapper>
    )
  }
}

export default Donate
