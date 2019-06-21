import Nav from '../components/nav'
import DonateForm from '../components/donateform'
import Head from '../components/head'
import { Elements, StripeProvider } from 'react-stripe-elements'
import { Component } from 'react'
import '../static/styles/main.scss'

class Donate extends Component {
  render () {
    return (
      <div>
        <Head title='Donate' />
        <Nav />

        <div className='w-100 h-100 flex'>
          <div className='w-100 h-100 absolute bg-tf-gray o-10 z-minus-1' />
          { process.browser && <div className='flex flex-column m-auto justify-between pa3 pa4-ns'>
            <div className='flex flex-column pa4-ns pa2 pb4 tf-lato tc mv-auto'>
              <div className='tf-dark-gray ts-title tf-oswald fl pb3'>
                Fund Teachers. Help Students.
              </div>
              <div className='tf-gray tf-lato-lite pa1 w-75-ns m-auto'>
                With 100 percent of your donation funding public school teachers in need, you can
                give knowing that your entire gift will help equip classrooms and help students.
              </div>
            </div>
            <StripeProvider apiKey='pk_live_FYwjfNktzq3upZRFbxA9hyc8'>
              <div className='flex flex-column w-50-ns w-100 m-auto'>
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
