/* global fetch */
import React, { Component } from 'react'
import { CardElement } from '@stripe/react-stripe-js'
import DonationFrequency from './donationFrequency'
import Router from 'next/router'
import { Input, FormControl, FormErrorMessage, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { validateCurrency, validateEmail, validateText } from '../utils/validation.util'
import { fundraisingEventTicket, fundraisingEventTicketPatron } from '../lib/constants'

class DonateTicketForm extends Component {
  constructor (props) {
    super(props)
    this.donate = this.donate.bind(this)
    this.frequenciesAvailable = [fundraisingEventTicket, fundraisingEventTicketPatron]
    this.state = {
      loading: false,
      redirectSuccess: false,
      previousFrequency: fundraisingEventTicket
    }
  }

  setLocalState = (state) => {
    if (!state.error) state.error = ''
    this.setState(state)
  }

  customOnFrequencyChange = (e, handleChange, setFieldValue) => {
    const frequency = e.currentTarget.value
    console.log('here values', frequency)
    if (frequency !== this.state.previousFrequency) {
      this.state.previousFrequency = frequency
      if (frequency === fundraisingEventTicket) {
        setFieldValue('amount', '100')
      } else if (frequency === fundraisingEventTicketPatron) {
        setFieldValue('amount', '200')
      }
    }
    handleChange(e)
  }

  donate = async (formValues) => {
    this.setLocalState({ loading: true })
    let token
    try {
      const cardElement = this.props.elements.getElement(CardElement)
      const res = await this.props.stripe.createToken(cardElement)
      token = res.token
    } catch (e) {
      this.setState({ error: e.message, loading: false })
      return
    }

    if (!token) {
      this.setState({ error: 'Invalid CC info!', loading: false })
      return
    }
    try {
      const { frequency, firstName, lastName, email, amount } = formValues
      const responseStream = await fetch('/api/purchase-ticket', {
        method: 'POST',
        body: JSON.stringify({
          source: token,
          firstName,
          frequency,
          lastName,
          amount: amount * 100,
          email
        })
      })
      const response = await responseStream.json()
      if (response.success) {
        this.setState({ redirectSuccess: true, loading: false })
      } else {
        this.setState({ error: `Donation failed: ${response.message}`, loading: false })
      }
    } catch (e) {
      this.setState({ error: e.message, loading: false })
    }
  }

  render () {
    const { redirectSuccess, loading } = this.state

    if (redirectSuccess) {
      Router.push('/ticket-success')
      return (
        <div />
      )
    }

    return (
      <Formik
        initialValues={{
          frequency: fundraisingEventTicket,
          firstName: '',
          lastName: '',
          email: '',
          amount: '100'
        }}
        validate={(values, actions) => {
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
        }}
        onSubmit={async (values, opts) => {
          await this.donate(values)
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
            <div className='error tf-lato tc'>
              <p className='red' aria-live='assertive'>{this.state.error}</p>
            </div>

            <DonationFrequency
              name='frequency'
              updateFrequency={(e) => this.customOnFrequencyChange(e, handleChange, setFieldValue)}
              frequency={values.frequency}
              frequenciesAvailable={this.frequenciesAvailable}
            />
            <FormControl
              className='form-control'
              isInvalid={errors.firstName && touched.firstName}
            >
              <Input
                type='text'
                name='firstName'
                maxLength={64}
                placeholder='First name'
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-label='First Name' />
              <FormErrorMessage>{errors.firstName}</FormErrorMessage>
            </FormControl>
            <FormControl
              className='form-control'
              isInvalid={errors.lastName && touched.lastName}
            >
              <Input
                type='text'
                name='lastName'
                maxLength={64}
                placeholder='Last name'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-label='Last Name' />
              <FormErrorMessage>{errors.lastName}</FormErrorMessage>
            </FormControl>
            <FormControl
              className='form-control'
              isInvalid={errors.email && touched.email}
            >
              <Input
                type='email'
                name='email'
                maxLength={320} // max email address len
                placeholder='Email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-label='Email' />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              className='form-control'
              isInvalid={errors.amount && touched.amount}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children='$'
                  color='lightGray'
                  style={{ height: '100%', width: '2.6rem' }}
                />
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
                  aria-label='Amount' />

              </InputGroup>
              <FormErrorMessage>{errors.amount}</FormErrorMessage>
            </FormControl>
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
}

export default DonateTicketForm
