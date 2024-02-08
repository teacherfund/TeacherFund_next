/* global fetch */
import React, { Component } from 'react'
import { CardElement } from '@stripe/react-stripe-js'
import DonationFrequency from './donationFrequency'
import Router from 'next/router'
import { Input, FormControl, Text, FormErrorMessage, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { validateEmail, validateText } from '../utils/validation.util'
import { fundraisingEventTicket, fundraisingEventTicketPatron } from '../lib/constants'

class DonateTicketForm extends Component {
  constructor (props) {
    super(props)
    this.donate = this.donate.bind(this)
    this.availableFrequencies = [
      {
        name: fundraisingEventTicket,
        text: 'Spring 2024 Ticket',
        amount: '100'
      },
      {
        name: fundraisingEventTicketPatron,
        text: 'Spring 2024 Patron',
        amount: '200'
      }
    ]
    this.state = {
      loading: false,
      redirectSuccess: false,
      currentFrequencyIdx: 0,
      currentQuantity: 1
    }
  }

  setLocalState = (state) => {
    if (!state.error) state.error = ''
    this.setState(state)
  }

  customOnFrequencyChange = (e, handleChange, setFieldValue) => {
    const newFrequencyIdx = e.currentTarget.value
    if (newFrequencyIdx !== this.state.currentFrequencyIdx) {
      this.state.currentFrequencyIdx = newFrequencyIdx
      setFieldValue('amount', this.availableFrequencies[newFrequencyIdx].amount * this.state.currentQuantity)
    }
    handleChange(e)
  }

  customOnQuantityChange = (e, handleChange, setFieldValue) => {
    const newQuantity = e.currentTarget.value
    if (!newQuantity) {
      handleChange(e)
      return
    }
    this.state.currentQuantity = newQuantity
    setFieldValue('amount', this.availableFrequencies[this.state.currentFrequencyIdx].amount * newQuantity)
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
      const { frequencyIdx, firstName, lastName, email, amount, quantity } = formValues
      const responseStream = await fetch('/api/purchase-ticket', {
        method: 'POST',
        body: JSON.stringify({
          source: token,
          firstName,
          frequency: this.availableFrequencies[frequencyIdx].name,
          quantity,
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
          frequencyIdx: 0,
          firstName: '',
          lastName: '',
          quantity: 1,
          email: '',
          amount: '100'
        }}
        validate={(values) => {
          const { firstName, lastName, email, quantity } = values
          const errors = {}
          const firstNameError = validateText(firstName)
          if (firstNameError) {
            errors.firstName = firstNameError
          }
          if (!quantity) {
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
              frequencyIdx={values.frequencyIdx}
              availableFrequencies={this.availableFrequencies}
            />
            <FormControl
              className='form-control'
              isInvalid={errors.firstName && touched.firstName}
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
                aria-label='First Name' />
              <FormErrorMessage>{errors.firstName}</FormErrorMessage>
            </FormControl>
            <FormControl
              marginTop='1.5rem'
              className='form-control'
              isInvalid={errors.lastName && touched.lastName}
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
                aria-label='Last Name' />
              <FormErrorMessage>{errors.lastName}</FormErrorMessage>
            </FormControl>
            <FormControl
              marginTop='1.5rem'
              className='form-control'
              isInvalid={errors.email && touched.email}
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
                aria-label='Email' />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              marginTop='1.5rem'
              className='form-control'
              isInvalid={errors.quantity && touched.quantity}
            >
              <Text>Quantity:</Text>
              <Input
                type='number'
                name='quantity'
                placeholder='Quantity'
                value={values.quantity}
                onChange={(e) => this.customOnQuantityChange(e, handleChange, setFieldValue)}
                onBlur={handleBlur}
                aria-label='Quantity' />
              <FormErrorMessage>{errors.quantity}</FormErrorMessage>
            </FormControl>
            <FormControl
              marginTop='1.5rem'
              className='form-control'
              isInvalid={errors.amount && touched.amount}>
              <Text>Amount:</Text>
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
            <Text marginTop='1.5rem'>Payment Info:</Text>
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
