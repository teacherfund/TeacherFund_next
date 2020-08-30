import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Link,
  AlertIcon,
  Select,
  Textarea,
  Alert,
  Button
} from '@chakra-ui/core'

import { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import { sendSupportFeedback } from '../../client/api'
import TextInput from '../textInput.js'

const FBFormControl = ({ labelText, id, required, children, ...props }) => (
  <FormControl marginBottom='1.5rem' isRequired={required} {...props}>
    <FormLabel
      htmlFor={id}
      marginBottom='.5rem'
      fontWeight='400 !important'
      fontSize='1rem'
    >
      {labelText}
    </FormLabel>
    {children}
  </FormControl>
)

const topics = [
  'Contribute',
  'Partnerships',
  'Feedback',
  'Bug',
  'Other'
]

const ContactForm = ({ contactFormSubmitted }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [formError, setFormError] = useState('')

  const { register, handleSubmit, errors } = useForm()

  const formValid = ({ name, email, topic, body }) => {
    if (name.length > 128) {
      setFormError('Name cannot be longer than 128 characters')
      return false
    }
    if (email.length > 128) {
      setFormError('Email cannot be longer than 128 characters')
      return false
    }
    if (topic.length > 128) {
      setFormError('Topic cannot be longer than 128 characters')
      return false
    }
    if (body.length > 1024) {
      setFormError('Message cannot be longer than 1024 characters')
      return false
    }
    return true
  }

  const submit = async (values, e) => {
    e.preventDefault()

    const { name, email, topic, body } = values

    if (!formValid({ name, email, topic, body })) return

    setIsSubmitting(true)

    try {
      await sendSupportFeedback({ name, email, topic, body })
      setFormError('')
      setSent(true)
      contactFormSubmitted()
    } catch (e) {
      setFormError('There was an error submitting the form. Please try again!')
    } finally {
      setIsSubmitting(false)
    }
  }

  const AlertMessage = (msg) => <Alert
    status='error'
    marginBottom='1rem'
    backgroundColor='#ffe5e5'
    fontWeight='500'
    color='#b9423a'
    display='flex'
    flexDirection={{ base: 'column', md: 'row' }}
    alignItems='center'
    justifyContent='center'
  >
    <AlertIcon
      color='#b9423a'
      size={'1.5rem'}
      marginBottom={{ base: '1rem', md: 0 }}
    />
    <span>
      {msg}
    </span>
  </Alert>

  return (
    <Box aria-atomic='true'>
      {sent && !formError && (
        <Alert
          status='success'
          backgroundColor='puddle'
          color='ocean'
          fontWeight='500'
          marginBottom='1.5rem'
        >
          <AlertIcon color='ocean' />
          Your message was successfully sent! We'll get back to you soon.
        </Alert>
      )}
      {!sent && (
        <Box
          as='form'
          textAlign='left'
          color='boulder'
          textTransform='none'
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          {formError && (
            <>
              {AlertMessage(formError)}
            </>
          )}
          <FBFormControl labelText='Your name' id='your-name' required>
            <Box id='name-error' aria-atomic='true'>
              {errors.name && (
                <>
                  {AlertMessage("Don't forget to tell us your name!")}
                </>
              )}
            </Box>
            <TextInput
              id='your-name'
              type='text'
              name='name'
              register={register({ required: true })}
              aria-describedby='name-error'
            />
          </FBFormControl>
          <FBFormControl labelText='Email address' id='email' required>
            <Box id='email-error' aria-atomic='true'>
              {errors.email && (
                <>
                  {AlertMessage('Please enter a valid email address')}
                </>
              )}
            </Box>
            <TextInput
              id='email'
              type='email'
              name='email'
              aria-describedby='email-error'
              register={register({
                required: true,
                pattern: {
                  value: /^\S+@\S+$/i
                }
              })}
            />
          </FBFormControl>
          <FBFormControl labelText='Topic' id='topic' required>
            <Box id='topic-error' aria-atomic='true'>
              {errors.topic && (
                <>
                  {AlertMessage('Please select a topic that pertains to your message')}
                </>
              )}
            </Box>
            <Select
              id='topic'
              placeholder='What is this about?'
              variant='filled'
              backgroundColor='transparentGray'
              color='boulder'
              name='topic'
              aria-describedby='topic-error'
              _hover={{
                backgroundColor: '#f2f2f2'
              }}
              ref={register({ required: true })}
            >
              {topics.map((topic, i) => (
                <option value={topic} name={topic} key={i}>
                  {topic}
                </option>
              ))}
            </Select>
          </FBFormControl>
          <FBFormControl labelText='How can we help?' id='message' required>
            <Box id='message-error' aria-atomic='true'>
              {errors.body && (
                <>
                  {AlertMessage("Don't forget to enter your message. We'd love to hear from you!")}
                </>
              )}
            </Box>
            <Textarea
              id='message'
              name='body'
              backgroundColor='transparentGray'
              borderRadius='10px'
              resize='none'
              height='8rem'
              aria-describedby='topic-error'
              ref={register({ required: true })}
            />
          </FBFormControl>

          <Box marginTop='2rem'>
            <Button
              isLoading={isSubmitting}
              loadingText='Submitting...'
              type='submit'
              margin='0 0 1.5rem'
            >
              Submit
            </Button>
          </Box>
        </Box>
      )}
      <Text>
        You can also email us directly at{' '}
        <Link
          text='joelwass@theteacherfund.com'
          href='mailto:joelwass@theteacherfund.com'
        />
        .
      </Text>
    </Box>
  )
}

ContactForm.propTypes = {
  contactFormSubmitted: PropTypes.func.isRequired
}

export default ContactForm
