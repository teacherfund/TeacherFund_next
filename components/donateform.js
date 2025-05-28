/* global fetch */
import React, { Component } from 'react'
import { PaymentElement } from '@stripe/react-stripe-js'
import DonationFrequency from './donationFrequency'
import Router from 'next/router'
import { Input, InputGroup, Field } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { validateCurrency, validateEmail, validateText } from '../utils/validation.util'

class DonateForm extends Component {
  constructor (props) {
    super(props)
    this.donate = this.donate.bind(this)
    this.availableFrequencies = [
      {
        name: 'once',
        text: 'Give Once'
      },
      {
        name: 'monthly',
        text: 'Monthly'
      }
    ]
    this.state = {
      loading: false,
      redirectSuccess: false
    }
  }

  setLocalState = (state) => {
    if (!state.error) state.error = ''
    this.setState(state)
  }

  donate = async (formValues) => {
    this.setLocalState({ loading: true })
    let token
    try {
      const cardElement = this.props.elements.getElement(PaymentElement)
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
      const { frequencyIdx, firstName, lastName, email, amount } = formValues
      const description = 'Donation'
      const responseStream = await fetch('/api/donate', {
        method: 'POST',
        body: JSON.stringify({
          source: token,
          firstName,
          frequency: this.availableFrequencies[frequencyIdx].name,
          lastName,
          amount: amount * 100,
          email,
          description
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
      Router.push('/success')
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
          email: '',
          amount: ''
        }}
        validate={values => {
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
          isSubmitting
        }) => (
          <Form className='flex flex-column f4-m ph2' onSubmit={handleSubmit}>
            <div className='error tf-lato tc'>
              <p className='red' aria-live='assertive'>{this.state.error}</p>
            </div>

            <DonationFrequency
              name='frequencyIdx'
              updateFrequency={handleChange}
              frequencyIdx={values.frequencyIdx}
              availableFrequencies={this.availableFrequencies}
            />
            <Field.Root
              className='form-control'
              invalid={errors.firstName && touched.firstName}
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
                border='none'
                bg='white'
                _invalid={{ borderColor: 'red.500' }}
                _placeholder={{ color: 'grey' }}
                _focus={{ boxShadow: 'none' }}
                _hover={{ border: 'none' }}
                aria-label='First Name'
              />
              <Field.ErrorText>{errors.firstName}</Field.ErrorText>
            </Field.Root>
            <Field.Root
              className='form-control'
              invalid={errors.lastName && touched.lastName}
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
                border='none'
                bg='white'
                _placeholder={{ color: 'grey' }}
                _focus={{ boxShadow: 'none' }}
                _hover={{ border: 'none' }}
                aria-label='Last Name'
              />
              <Field.ErrorText>{errors.lastName}</Field.ErrorText>
            </Field.Root>
            <Field.Root
              className='form-control'
              invalid={errors.email && touched.email}
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
                border='none'
                bg='white'
                _placeholder={{ color: 'grey' }}
                _focus={{ boxShadow: 'none' }}
                _hover={{ border: 'none' }}
                aria-label='Email'
              />
              <Field.ErrorText>{errors.email}</Field.ErrorText>
            </Field.Root>
            <Field.Root
              className='form-control'
              invalid={errors.amount && touched.amount}>
              <InputGroup startElement='$' endElement='USD'>
                <Input
                  style={{ paddingLeft: '2rem' }}
                  type='text'
                  name='amount'
                  placeholder='Amount'
                  maxLength={10}
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fontFamily='inherit'
                  fontSize='md'
                  border='none'
                  bg='white'
                  _placeholder={{ color: 'grey' }}
                  _focus={{ boxShadow: 'none' }}
                  _hover={{ border: 'none' }}
                  aria-label='Amount'
                />
              </InputGroup>
              <Field.ErrorText>{errors.amount}</Field.ErrorText>
            </Field.Root>
            <div className='bg-white bn ba pa3 mb2'>
              <PaymentElement handleChange={handleChange} name='cardNumber' />
            </div>
            { loading && <h2 className='tc tf-lato'>Loading...</h2>}
            <button
              type='submit'
              disabled={isSubmitting}
              className='white btn-donate tf-lato b tc pa3 mt3 mt3-m mh-auto br-pill pointer w-50'
            >
              Donate
            </button>
          </Form>
        )}
      </Formik>
    )
  }
}

export default DonateForm
