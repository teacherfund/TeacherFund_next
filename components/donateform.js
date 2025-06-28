/* global fetch */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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

const StripePaymentElement = ({ handleChange, update, onStripeChange }) => {
  const checkout = useCheckout()

  if (!checkout) {
    return <h2 className='tc tf-lato'>Loading payment options...</h2>
  }

  useEffect(() => update(checkout), [])

  return (
    <div className='bg-white bn ba pa3 mb2'>
      <PaymentElement
        options={{ layout: 'tabs' }}
        onChange={onStripeChange}
        handleChange={handleChange}
        name='cardNumber'
      />
    </div>
  )
}

export default function DonateForm () {
  const router = useRouter()
  const [statuses, setStatuses] = useState({
    loading: false,
    redirectSuccess: false,
    error: '',
    isCheckoutSessionReady: false
  })
  const [checkoutSession, setCheckoutSession] = useState(null)
  const [checkout, setCheckout] = useState(null)

  const getInitialFrequency = () => {
    if (!router.isReady) return 0
    const frequency = router.query.frequency
    return frequency === 'monthly' ? 1 : 0
  }

  const initialFormValues = {
    frequencyIdx: getInitialFrequency(),
    firstName: '',
    lastName: '',
    email: '',
    amount: ''
  }

  const setLocalState = (state) => {
    if (!state.error) state.error = ''
    setStatuses(prev => ({ ...prev, ...state }))
  }

  const handleStripeChange = () => {
    if (statuses.error) {
      setTimeout(() => setLocalState({ error: '' }), 300)
    }
  }

  const customOnFrequencyChange = (event, setFieldValue) => {
    const frequencyIdx = parseInt(event.target.value)

    // Update form state
    setFieldValue('frequencyIdx', frequencyIdx)

    // Update URL
    const frequencyParam = frequencyIdx === 1 ? 'monthly' : 'single'
    router.push({
      pathname: router.pathname,
      query: { ...router.query, frequency: frequencyParam }
    }, undefined, { shallow: true })
  }

  const createStripeSession = async (formValues) => {
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
      setLocalState({ error: error.message || 'Failed to create checkout session', loading: false })
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
      enableReinitialize
      onSubmit={async (values, opts) => {
        await (statuses.isCheckoutSessionReady ? confirmCheckout() : createStripeSession(values))
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
            name='frequencyIdx'
            updateFrequency={(e) => customOnFrequencyChange(e, setFieldValue)}
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
              maxLength={320}
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
                onWheel={(e) => {
                  e.target.blur()
                }}
                onKeyDown={(e) => {
                  // Block minus key, plus key, and 'e' (scientific notation)
                  if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                    e.preventDefault()
                  }
                }}
                min='0'
                fontFamily='inherit'
                bg='white'
                _placeholder={{ color: 'grey' }}
                aria-label='Amount' />
            </InputGroup>
            <Field.ErrorText>{errors.amount}</Field.ErrorText>
          </Field.Root>
          <div className='error tf-lato tc'>
            <p className='red' aria-live='assertive'>{statuses.error}</p>
          </div>

          { statuses.loading && <h2 className='tc tf-lato mb3 mb3-m'>Loading...</h2>}
          {(statuses.isCheckoutSessionReady && checkoutSession) && (
            <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret: () => checkoutSession.clientSecret }}>
              <StripePaymentElement
                handleChange={handleChange}
                update={setCheckout}
                onStripeChange={handleStripeChange}
              />
            </CheckoutProvider>
          )}
          <button
            type='submit'
            disabled={isSubmitting || statuses.loading}
            className='white btn-donate tf-lato b tc pa3 mt3 mt3-m mh-auto br-pill pointer w-50'
          >
            {statuses.loading ? 'Processing...' : statuses.isCheckoutSessionReady ? 'Confirm Payment' : 'Load Payment Form'}
          </button>
        </Form>
      )}
    </Formik>
  )
}
