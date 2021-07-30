import React, { useState } from 'react'
import {
  Box,
  Text
} from '@chakra-ui/react'

import emailjs from 'emailjs-com'
import '../../public/styles/partials/contactform.scss'
import Card from '../card'
import { useAlert } from 'react-alert'

const ContactSection = ({ contactPage, hideHeading, ...props }) => {
  const alert = useAlert()
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  function sendEmail (e) {
    e.preventDefault()
    console.log('message is ', message)
    console.log('email is', email)
    if (message !== '' && email !== '') {
      emailjs
        .sendForm(
          // tutorial: https://www.youtube.com/watch?v=NgWGllOjkbs
          // log in to email js and replace these 3 string values
          'service_w1x9usr',
          'template_zr7n00h',
          e.target,
          'user_yfTXHaDPDno4ZanMepIr2'
        )
        .then(
          (result) => {
            console.log('emailJS success', result.text)
            alert.success('Email successfully sent!')
            setEmail('')
            setMessage('')
          },
          (error) => {
            console.log(error.text)
          }
        )
      e.target.reset()
    } else {
      alert.show('Enter missing fields')
    }
  }
  return (
    <Box
      as='section'
      display='flex'
      justifyItems='center'
      flexDirection='column'
      alignItems='center'
      padding={{ base: '3rem 1.5rem', lg: '6rem 7.5rem' }}
      {...props}
    >
      <Box align='center' fontSize='28px' paddingBottom='2rem' />
      <Card width='100%' maxWidth='45rem'>
        <Text
          textTransform='uppercase'
          textAlign={{ base: 'center', lg: 'left' }}
          color='ocean'
          fontWeight='bold'
          fontSize='0.875rem'
          marginBottom='2.5rem'
        >
          <Box as='span' display={{ base: 'block', md: 'inline-block' }}>
            Want to get in touch?{' '}
          </Box>
          <Box as='span'> Drop us a line.</Box>
        </Text>
        <React.Fragment>
          <div className='container'>
            <form id='my-form' onSubmit={sendEmail}>
              <div className='form-group'>
                <label htmlFor='firstName'> First Name</label>
                <input
                  className='textinput'
                  type='text'
                  id='firstName'
                  name='firstName'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='latsName'>Last Name</label>
                <input
                  className='textinput'
                  type='text'
                  id='lastName'
                  name='lastName'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  className='textinput'
                  type='email'
                  id='email'
                  name='email'
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='message'>Message</label>
                <textarea
                  className='textinput'
                  name='message'
                  id='message'
                  cols='30'
                  rows='5'
                  onChange={(event) => setMessage(event.target.value)}
                />
              </div>

              <button type='submit'>Submit</button>
            </form>
          </div>
          <div id='status' />
          {/* </div> */}
        </React.Fragment>
      </Card>
    </Box>
  )
}

export default ContactSection
