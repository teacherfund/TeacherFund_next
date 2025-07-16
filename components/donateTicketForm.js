/* global fetch */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { PaymentElement, CheckoutProvider, useCheckout } from '@stripe/react-stripe-js'
import DonationFrequency from './donationFrequency'
import { Input, Text, InputGroup, Field } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { validateEmail, validateText } from '../utils/validation.util'
import { fundraisingEventTicket, fundraisingEventTicketPatron, stripePromise } from '../lib/constants'

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

export default function DonateTicketForm () {
  const router = useRouter()
  const [statuses, setStatuses] = useState({
    loading: false,
    redirectSuccess: false,
    error: '',
    currentQuantity: 1
  })
  const [checkoutSession, setCheckoutSession] = useState(null)
  const [checkout, setCheckout] = useState(null)

  const getInitialFrequency = () => {
    if (!router.isReady) return 0
    const frequency = router.query.frequency
    return frequency === 'patron' ? 1 : 0
  }

  const getInitialAmount = () => {
    const frequencyIdx = getInitialFrequency()
    return availableFrequencies[frequencyIdx].amount
  }

  const initialFormValues = {
    frequencyIdx: getInitialFrequency(),
    firstName: '',
    lastName: '',
    quantity: 1,
    email: '',
    amount: getInitialAmount()
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

  const customOnFrequencyChange = (event, setFieldValue, values) => {
    const frequencyIdx = parseInt(event.currentTarget.value)

    // Update form state
    const newAmount = availableFrequencies[frequencyIdx].amount * values.quantity
    setFieldValue('frequencyIdx', frequencyIdx)
    setFieldValue('amount', newAmount)

    // Update URL
    const frequencyParam = frequencyIdx === 1 ? 'patron' : 'regular'
    router.push({
      pathname: router.pathname,
      query: { ...router.query, frequency: frequencyParam }
    }, undefined, { shallow: true })
  }

  const customOnQuantityChange = (event, setFieldValue, values) => {
    let inputValue = event.currentTarget.value

    // Handle empty field or remove leading zeros
    if (inputValue === '') {
      setFieldValue('quantity', '')
      setFieldValue('amount', 0)
      setStatuses(prev => ({ ...prev, currentQuantity: 0 }))
      return
    }

    inputValue = inputValue.replace(/^0+/, '')

    // Parse as decimal integer, then validate
    const newQuantity = parseInt(inputValue, 10)

    // Only proceed if it's a valid number >= 1
    if (isNaN(newQuantity) || newQuantity < 1) {
      return
    }

    const newAmount = availableFrequencies[values.frequencyIdx].amount * newQuantity

    // Update both form fields directly
    setFieldValue('quantity', newQuantity)
    setFieldValue('amount', newAmount)

    // Update local state for UI purposes
    setStatuses(prev => ({ ...prev, currentQuantity: newQuantity }))

    event.currentTarget.value = newQuantity.toString()
  }

  const createStripeSession = async (formValues) => {
    setLocalState({ loading: true })

    try {
      const { frequencyIdx, firstName, lastName, email, amount, quantity } = formValues
      const response = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          amount: (amount / quantity) * 100, // Convert to cents
          mode: 'payment', // Must be payment or subscription, since tickets are always solo payments, hard code this.
          isTicket: true,
          frequency: availableFrequencies[frequencyIdx].name,
          quantity
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
            updateFrequency={(e) => customOnFrequencyChange(e, setFieldValue, values)}
            frequencyIdx={values.frequencyIdx}
            availableFrequencies={availableFrequencies}
          />
          <Field.Root
            className='form-control'
            invalid={errors.firstName && touched.firstName}
            disabled={statuses.isCheckoutSessionReady}
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
            disabled={statuses.isCheckoutSessionReady}
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
            disabled={statuses.isCheckoutSessionReady}
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
            disabled={statuses.isCheckoutSessionReady}
          >
            <Text>Quantity:</Text>
            <Input
              type='number'
              name='quantity'
              placeholder='Quantity'
              value={values.quantity}
              onChange={(e) => customOnQuantityChange(e, setFieldValue, values)}
              onBlur={handleBlur}
              onWheel={(e) => {
                e.target.blur()
              }}
              onKeyDown={(e) => {
                // Block minus key, plus key, and 'e' (scientific notation)
                if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E' || e.key === '.') {
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
            disabled={statuses.isCheckoutSessionReady}
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
            {statuses.loading ? 'Processing...' : statuses.isCheckoutSessionReady ? 'Purchase Ticket' : 'Load Payment Form'}
          </button>
        </Form>
      )}
    </Formik>
  )
}
