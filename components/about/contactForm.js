/* global fetch */
import { useState } from 'react'
import { Input, Textarea, Button, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    const data = {
      name,
      email,
      subject,
      message
    }

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.status === 200) {
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
      }
    }).catch((err) => {
      // TODO: Add error handling
      console.log('ERROR:', err)
    })
  }

  return (
    <form>
      <FormControl mt={3} id='name'>
        <FormLabel>Name</FormLabel>
        <Input
          type='text'
          onChange={(e) => {
            setName(e.target.value)
          }}
          value={name}
        />
      </FormControl>
      <FormControl mt={3} id='email'>
        <FormLabel>Email</FormLabel>
        <Input
          type='email'
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl mt={3} id='subject'>
        <FormLabel>Subject</FormLabel>
        <Input
          type='text'
          onChange={(e) => {
            setSubject(e.target.value)
          }}
        />
      </FormControl>
      <FormControl mt={3} id='message'>
        <FormLabel>Message</FormLabel>
        <Textarea
          h={60}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        />
      </FormControl>
      <Button
        color='white'
        bg='orange.300'
        mt={5}
        w='100%'
        h={12}
        onClick={(e) => {
          submitHandler(e)
        }}
      >
        Submit
      </Button>
    </form>
  )
}

export default ContactForm
