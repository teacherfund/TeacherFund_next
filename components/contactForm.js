/* global fetch */
import { Input, Textarea, Button, Field, Box, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import { Toaster, toaster } from './ui/toaster'
import { validateEmail, validateText } from '../utils/validation.util'

const MAX_RETRIES = 3
const initialFormValues = {
  name: '',
  email: '',
  subject: '',
  message: ''
}

const validateForm = (values) => {
  const { name, email, subject, message } = values
  const errors = {
    name: validateText(name),
    email: validateEmail(email),
    subject: validateText(subject),
    message: validateText(message)
  }

  // Remove any keys with undefined values
  Object.keys(errors).forEach((key) => {
    if (errors[key] === undefined) {
      delete errors[key]
    }
  })
  return errors
}

const ContactForm = () => {
  const [isSent, setIsSent] = useState(false)
  const [retries, setRetries] = useState(0)

  const hasExceededRetries = () => retries >= MAX_RETRIES

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    try {
      const response = fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setIsSent(true)
      setRetries(0) // Reset retries on successful submission

      toaster.create({
        title: 'Message Sent',
        description: 'Your message has been sent successfully.',
        type: 'success'
      })
    } catch (error) {
      if (!hasExceededRetries()) {
        setRetries((r) => r + 1)
        toaster.create({
          title: 'Error',
          description:
            error.message || 'An error occurred while sending your message.',
          type: 'error'
        })
      } else {
        toaster.create({
          title: 'Failed Attempts Exceeded',
          description:
            'We were unable to send your message after multiple attempts.',
          type: 'info',
          action: {
            label: 'Send Manually',
            onClick: () => {
              const subject = encodeURIComponent(values.subject)
              const message = encodeURIComponent(values.message)
              // Open the user's email client (on a new tab, if necessary) with pre-filled values
              window.open(
                `mailto:joel@theteacherfund.com?subject=${subject}&body=${message}`,
                '_blank'
              )
            }
          },
          duration: 10000,
          closable: false
        })
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (isSent) {
    return (
      <Box textAlign='center' p={4} bg='green.100' borderRadius='md'>
        <Text fontSize='xl' fontWeight='bold' color='green.700'>
          Message Sent
        </Text>
        <Text fontSize='lg' color='green.800'>
          Thank you for contacting us! We will get back to you soon.
        </Text>
      </Box>
    )
  }

  return (
    <>
      <Formik
        initialValues={initialFormValues}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          errors,
          touched
        }) => (
          <Form className='flex flex-column f4-m ph2' onSubmit={handleSubmit}>
            <Field.Root
              className='form-control'
              invalid={errors.name && touched.email}
              disabled={isSubmitting || hasExceededRetries()}
              required
            >
              <Field.Label htmlFor='name'>Name</Field.Label>
              <Input
                id='name'
                name='name'
                type='text'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Your Name'
                fontFamily='inherit'
                fontSize='md'
                bg='gray.100'
              />
              <Field.ErrorText>{errors.name}</Field.ErrorText>
            </Field.Root>

            <Field.Root
              className='form-control'
              invalid={errors.email && touched.email}
              disabled={isSubmitting || hasExceededRetries()}
              required
            >
              <Field.Label htmlFor='email'>Email</Field.Label>
              <Input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Your Email'
                fontFamily='inherit'
                fontSize='md'
                bg='gray.100'
              />
              <Field.ErrorText>{errors.email}</Field.ErrorText>
            </Field.Root>

            <Field.Root
              className='form-control'
              invalid={errors.subject && touched.subject}
              disabled={isSubmitting || hasExceededRetries()}
              required
            >
              <Field.Label htmlFor='subject'>Subject</Field.Label>
              <Input
                id='subject'
                name='subject'
                type='text'
                autoComplete='off'
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Subject of Your Message'
                maxLength={128}
                fontFamily='inherit'
                fontSize='md'
                bg='gray.100'
              />
              <Field.ErrorText>{errors.subject}</Field.ErrorText>
            </Field.Root>

            <Field.Root
              className='form-control'
              invalid={errors.message && touched.message}
              disabled={isSubmitting || hasExceededRetries()}
              required
            >
              <Field.Label htmlFor='message'>Message</Field.Label>
              <Textarea
                id='message'
                name='message'
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Your Message'
                rows={10}
                resize='none'
                fontFamily='inherit'
                fontSize='md'
                bg='gray.100'
              />
              <Field.ErrorText>{errors.message}</Field.ErrorText>
            </Field.Root>

            <Button
              mt={4}
              color='white'
              disabled={isSubmitting || hasExceededRetries()}
              type='submit'
              className='white btn-donate tf-lato b tc pa3 mt3 mt3-m mh-auto br-pill pointer w-50'
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </Form>
        )}
      </Formik>
      <Toaster />
    </>
  )
}

export default ContactForm
