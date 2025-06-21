/* global fetch */
import React, { useState } from 'react'
import { CardElement } from '@stripe/react-stripe-js'
import DonationFrequency from './donationFrequency'
import Router from 'next/router'
import { Input, Text, InputGroup, Field } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { validateEmail, validateText } from '../utils/validation.util'
import { fundraisingEventTicket, fundraisingEventTicketPatron } from '../lib/constants'

const availableFrequencies = [
  {
    name: fundraisingEventTicket,
    text: '2025 Ticket',
    amount: '100'
  },
  {
    name: fundraisingEventTicketPatron,
    text: '2025 Patron',
    amount: '200'
  }
]

const validateForm = (values) => {
  const { firstName, lastName, email, quantity } = values
  const errors = {}
  const firstNameError = validateText(firstName)
  if (firstNameError) {
    errors.firstName = firstNameError
  }
  if (!quantity || quantity <= 0) {
    errors.quantity = 'Quantity must be > 0'

  }
  const lastNameError = validateText(lastName)
  if (lastNameError) {
    errors.lastName = lastNameError
  }
  const emailError = validateEmail(email)
  if (emailError) {
    errors.email = emailError
  }
  return errors
}

export default function DonateTicketForm ({ initialFrequency = 0, stripe, elements }) {
  const [statuses, setStatuses] = useState({
    loading: false,
    redirectSuccess: false,
    error: '',
    currentQuantity: 1
  })

  const initialFormValues = {
    frequencyIdx: initialFrequency,
    firstName: '',
    lastName: '',
    quantity: 1,
    email: '',
    amount: availableFrequencies[initialFrequency].amount
  }

  const setLocalState = (state) => {
    if (!state.error) state.error = ''
    setStatuses(prev => ({ ...prev, ...state }))
  }

  const customOnFrequencyChange = (e, handleChange, setFieldValue, values) => {
    const newFrequencyIdx = parseInt(e.currentTarget.value)

    const newAmount = availableFrequencies[newFrequencyIdx].amount * values.quantity
    setFieldValue('amount', newAmount)
    handleChange(e)
  }

  const customOnQuantityChange = (e, handleChange, setFieldValue, values) => {
    const newQuantity = parseInt(e.currentTarget.value) || 0
    // if (!newQuantity) {
    //   handleChange(e)
    //   return
    // }
    const newAmount = availableFrequencies[values.frequencyIdx].amount * newQuantity
    setStatuses(prev => ({ ...prev, currentQuantity: newQuantity }))
    setFieldValue('amount', newAmount)
    handleChange(e)
  }
  const donate = async (formValues) => {
    setLocalState({ loading: true })
    let token
    try {
      const cardElement = elements.getElement(CardElement)
      const res = await stripe.createToken(cardElement)
      token = res.token
    } catch (e) {
      setLocalState({ error: e.message, loading: false })
      return
    }

    if (!token) {
      setLocalState({ error: 'Invalid CC info!', loading: false })
      return
    }

    try {
      const { frequencyIdx, firstName, lastName, email, amount, quantity } = formValues
      const responseStream = await fetch('/api/donations/purchase-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          source: token,
          firstName,
          frequency: availableFrequencies[frequencyIdx].name,
          quantity,
          lastName,
          amount: amount * 100,
          email
        })
      })
      const response = await responseStream.json()
      if (response.success) {
        setLocalState({ redirectSuccess: true, loading: false })
      } else {
        setLocalState({ error: `Donation failed: ${response.message}`, loading: false })
      }
    } catch (e) {
      setLocalState({ error: e.message, loading: false })
    }
  }

  const { redirectSuccess, loading, error } = statuses

  if (redirectSuccess) {
    Router.push('/ticket-success')
    return <div />
  }

  return (
    <Formik
      initialValues={initialFormValues}
      validate={validateForm}
      enableReinitialize
      onSubmit={async (values, opts) => {
        await donate(values)
        opts.setSubmitting(false)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting
      }) => (
        <Form className='flex flex-column f4-m ph2' onSubmit={handleSubmit}>
          <DonationFrequency
            updateFrequency={(e) => customOnFrequencyChange(e, handleChange, setFieldValue, values)}
            frequencyIdx={values.frequencyIdx}
            availableFrequencies={availableFrequencies}
          />
          <Field.Root
            className='form-control'
            invalid={errors.firstName && touched.firstName}
          >
            <Text>First Name:</Text>
            <Input
              type='text'
              name='firstName'
              maxLength={64}
              placeholder='First name'
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              fontFamily='inherit'
              bg='white'
              _placeholder={{ color: 'grey' }}
              aria-label='First Name'
            />
            <Field.ErrorText>{errors.firstName}</Field.ErrorText>
          </Field.Root>
          <Field.Root
            className='form-control'
            invalid={errors.lastName && touched.lastName}
          >
            <Text>Last Name:</Text>
            <Input
              type='text'
              name='lastName'
              maxLength={64}
              placeholder='Last name'
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              fontFamily='inherit'
              bg='white'
              _placeholder={{ color: 'grey' }}
              aria-label='Last Name'
            />
            <Field.ErrorText>{errors.lastName}</Field.ErrorText>
          </Field.Root>
          <Field.Root
            className='form-control'
            invalid={errors.email && touched.email}
          >
            <Text>Email:</Text>
            <Input
              type='email'
              name='email'
              maxLength={320} // max email address len
              placeholder='Email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fontFamily='inherit'
              bg='white'
              _placeholder={{ color: 'grey' }}
              aria-label='Email'
            />
            <Field.ErrorText>{errors.email}</Field.ErrorText>
          </Field.Root>
          <Field.Root
            className='form-control'
            invalid={errors.quantity && touched.quantity}
          >
            <Text>Quantity:</Text>
            <Input
              type='number'
              name='quantity'
              placeholder='Quantity'
              value={values.quantity}
              onChange={(e) => customOnQuantityChange(e, handleChange, setFieldValue, values)}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                // Block minus key, plus key, and 'e' (scientific notation)
                if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                  e.preventDefault()
                }
              }}
              min='1'
              fontFamily='inherit'
              bg='white'
              _placeholder={{ color: 'grey' }}
              aria-label='Quantity'
            />
            <Field.ErrorText>{errors.quantity}</Field.ErrorText>
          </Field.Root>
          <Field.Root
            className='form-control'
            invalid={errors.amount && touched.amount}
          >
            <Text>Amount:</Text>
            <InputGroup startElement='$' endElement='USD'>
              <Input
                style={{ paddingLeft: '2rem' }}
                type='text'
                name='amount'
                placeholder='Amount'
                maxLength={10}
                readOnly
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                fontFamily='inherit'
                bg='white'
                _placeholder={{ color: 'grey' }}
                aria-label='Amount'
              />
            </InputGroup>
            <Field.ErrorText>{errors.amount}</Field.ErrorText>
          </Field.Root>
          <div className='error tf-lato tc'>
            <p className='red' aria-live='assertive'>{error}</p>
          </div>

          <Text>Payment Info:</Text>
          <div className='bg-white bn ba pa3 mb2'>
            <CardElement handleChange={handleChange} name='cardNumber' />
          </div>
          { loading && <h2 className='tc tf-lato'>Loading...</h2>}
          <button
            type='submit'
            disabled={isSubmitting}
            className='white btn-donate tf-lato b tc pa3 mt3 mt3-m mh-auto br-pill pointer w-50'
          >
            Purchase ticket
          </button>
        </Form>
      )}
    </Formik>
  )
}
