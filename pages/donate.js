import React, { useState, useEffect } from 'react'
import PageWrapper from '../components/pageWrapper'
import DonateForm from '../components/donateform'

export default function Donate () {
  const [showPaypalButton] = useState(true)
  const [imgError, setImgError] = useState(false)
  const [initialFrequency, setInitialFrequency] = useState(0)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const frequency = urlParams.get('frequency')

    if (frequency === 'monthly') {
      setInitialFrequency(1)
    }
  }, [])

  return (
    <PageWrapper title='Donate – The Teacher Fund'>
      <React.Fragment>
        <div className='flex flex-column bg-trans-gray justify-between ph3 pv4 pv5-ns pa4-ns'>
          <div className='flex flex-column tf-lato tc mv-auto'>
            <h1 className='tf-dark-gray f2 f1-l tf-oswald fl'>
                  Fund Teachers. Help Students.
            </h1>
            <p className='tf-lato-lite f3-m pa1 w-75-m w-50-l m-auto lh-5 lh-copy mv2'>
                  With 100 percent of your donation funding public school teachers in need, you can
                  give knowing that your entire gift will help equip classrooms and help students.
            </p>
          </div>
          <div className='flex flex-column w-100 w-70-m w-30-l m-auto'>
            <DonateForm initialFrequency={initialFrequency} />
          </div>
        </div>
        {showPaypalButton &&
        <div className='flex flex-column pv4 pb5-ns'>
          <h3 className='tf-lato v-mid m-auto mv4 pb4 f4'>
            Or, Donate With PayPal
          </h3>
          <div className='m-auto'>
            <form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'>
              <input type='hidden' name='cmd' value='_s-xclick' />
              <input type='hidden' name='hosted_button_id' value='W235G2KHKQLP8' />
              <input
                type='image'
                src={imgError ? '/images/PayPal.gif' : 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif'}
                onError={() => setImgError(true)}
                border='0'
                name='submit'
                title='PayPal - The safer, easier way to pay online!'
                alt='Donate with PayPal button'
              />
              <img
                alt=''
                border='0'
                src='https://www.paypal.com/en_US/i/scr/pixel.gif'
                width='1'
                height='1' />
            </form>
          </div>
        </div>
        }
      </React.Fragment>
    </PageWrapper>
  )
}
