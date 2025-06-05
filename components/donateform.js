/* global fetch */
import React, { useEffect, useState } from 'react'
import DonationFrequency from './donationFrequency'
import { Input, InputGroup, Field } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { validateCurrency, validateEmail, validateText } from '../utils/validation.util'
import { PaymentElement, CheckoutProvider, useCheckout } from '@stripe/react-stripe-js'
import { stripePromise } from '../lib/constants'

const availableFrequencies = [
  {
    name: 'payment',
    text: 'One Time'
  },
  {
    name: 'subscription',
    text: 'Monthly'
  }
]

const validateForm = (values) => {
  const { firstName, lastName, email, amount } = values
  const errors = {}
  const firstNameError = validateText(firstName)
  if (firstNameError) {
    errors.firstName = firstNameError
  }
  const lastNameError = validateText(lastName)
  if (lastNameError) {
    errors.lastName = lastNameError
  }
  const emailError = validateEmail(email)
  if (emailError) {
    errors.email = emailError
  }
  const amountError = validateCurrency(amount)
  if (amountError) {
    errors.amount = amountError
  }
  return errors
}

const initialFormValues = {
  frequencyIdx: 0,
  firstName: '',
  lastName: '',
  email: '',
  amount: ''
}

const ConfirmCheckout = ({ handleChange, update }) => {
  const checkout = useCheckout()
  if (!checkout) {
    return <h2 className='tc tf-lato'>Loading payment options...</h2>
  }

  useEffect(() => update(checkout), [])

  return (
    <div className='bg-white bn ba pa3 mb2'>
      <PaymentElement
        options={{ layout: 'tabs' }}
        handleChange={handleChange}
        name='cardNumber'
      />
    </div>
  )
}

export default function DonateForm () {
  const [statuses, setStatuses] = useState({
    loading: false,
    redirectSuccess: false,
    error: '',
    isCheckoutSessionReady: false
  })
  const [checkoutSession, setCheckoutSession] = useState(null)
  const [checkout, setCheckout] = useState(null)

  const setLocalState = (state) => {
    if (!state.error) state.error = ''
    setStatuses(prev => ({ ...prev, ...state }))
  }

  const donate = async (formValues) => {
    setLocalState({ loading: true })

    try {
      const { frequencyIdx, firstName, lastName, email, amount } = formValues
      const response = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          amount: amount * 100, // Convert to cents
          mode: availableFrequencies[frequencyIdx].name
        })
      })

      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to create checkout session')
      }

      setLocalState({ isCheckoutSessionReady: true, loading: false })
      setCheckoutSession(responseData)
    } catch (error) {
      setLocalState({ error: 'Failed to create checkout session', loading: false })
    }
  }

  const confirmCheckout = async () => {
    setLocalState({ loading: true })
    try {
      const result = await checkout.confirm()
      if (result.error) {
        throw new Error(result.error.message || 'Payment confirmation failed')
      }
    } catch (error) {
      setLocalState({ error: error.message, loading: false })
    }
  }

  return (
    <Formik
      initialValues={initialFormValues}
      validate={validateForm}
      onSubmit={async (values, opts) => {
        await (statuses.isCheckoutSessionReady ? confirmCheckout() : donate(values))
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
        isSubmitting
      }) => (
        <Form className='flex flex-column f4-m ph2' onSubmit={handleSubmit}>
          <div className='error tf-lato tc'>
            <p className='red' aria-live='assertive'>{statuses.error}</p>
          </div>

          <DonationFrequency
            name='frequencyIdx'
            updateFrequency={handleChange}
            frequencyIdx={values.frequencyIdx}
            availableFrequencies={availableFrequencies}
          />
          <Field.Root
            className='form-control'
            invalid={errors.firstName && touched.firstName}
            disabled={statuses.isCheckoutSessionReady}
          >
            <Input
              type='text'
              name='firstName'
              maxLength={64}
              placeholder='First name'
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              fontFamily='inherit'
              fontSize='md'
              bg='white'
              _placeholder={{ color: 'grey' }}
              aria-label='First Name' />
            <Field.ErrorText>{errors.firstName}</Field.ErrorText>
          </Field.Root>
          <Field.Root
            className='form-control'
            invalid={errors.lastName && touched.lastName}
            disabled={statuses.isCheckoutSessionReady}
          >
            <Input
              type='text'
              name='lastName'
              maxLength={64}
              placeholder='Last name'
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              fontFamily='inherit'
              fontSize='md'
              bg='white'
              _placeholder={{ color: 'grey' }}
              aria-label='Last Name' />
            <Field.ErrorText>{errors.lastName}</Field.ErrorText>
          </Field.Root>
          <Field.Root
            className='form-control'
            invalid={errors.email && touched.email}
            disabled={statuses.isCheckoutSessionReady}
          >
            <Input
              type='email'
              name='email'
              maxLength={320} // max email address len
              placeholder='Email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fontFamily='inherit'
              fontSize='md'
              bg='white'
              _placeholder={{ color: 'grey' }}
              aria-label='Email'
            />
            <Field.ErrorText>{errors.email}</Field.ErrorText>
          </Field.Root>
          <Field.Root
            className='form-control'
            invalid={errors.amount && touched.amount}
            disabled={statuses.isCheckoutSessionReady}
          >
            <InputGroup startElement='$' endElement='USD'>
              <Input
                style={{ paddingLeft: '2rem' }}
                type='number'
                name='amount'
                placeholder='Amount'
                maxLength={10}
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  // Block minus key, plus key, and 'e' (scientific notation)
                  if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                    e.preventDefault()
                  }
                }}
                min='0'
                fontFamily='inherit'
                fontSize='md'
                bg='white'
                _placeholder={{ color: 'grey' }}
                aria-label='Amount' />
            </InputGroup>
            <Field.ErrorText>{errors.amount}</Field.ErrorText>
          </Field.Root>
          { statuses.loading && <h2 className='tc tf-lato mb3 mb3-m'>Loading...</h2>}
          {(statuses.isCheckoutSessionReady && checkoutSession) && (
            <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret: () => checkoutSession.clientSecret }}>
              <ConfirmCheckout handleChange={handleChange} update={setCheckout} />
            </CheckoutProvider>
          )}
          <button
            type='submit'
            disabled={isSubmitting || statuses.loading}
            className='white btn-donate tf-lato b tc pa3 mt3 mt3-m mh-auto br-pill pointer w-50'
          >
            {statuses.loading ? 'Processing...' : statuses.isCheckoutSessionReady ? 'Confirm Payment' : 'Donate'}
          </button>
        </Form>
      )}
    </Formik>
  )
}
