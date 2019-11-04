import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import DonationFrequency from './donationFrequency'
import Router from 'next/router'
import * as Api from '../api/api'

class DonateForm extends Component {
  constructor (props) {
    super(props)
    this.donate = this.donate.bind(this)
    this.state = {
      loading: false,
      redirectSuccess: false,
      firstName: '',
      lastName: '',
      amount: '',
      email: '',
      frequency: 'once',
      error: ''
    }
  }

  setLocalState = (state) => {
    if (!state.error) state.error = ''
    this.setState(state)
  }

  updateStateKey = (e) => {
    this.setLocalState({
      [e.target.name]: e.target.value
    });
  }

  updateFrequency = (ev) => {
    this.setLocalState({ frequency: ev.target.value })
  }

  donate = async (ev) => {
    ev.preventDefault()
    this.setLocalState({ loading: true })
    let token
    try {
      const res = await this.props.stripe.createToken()
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
      const stripDollarSignAmount = parseInt(this.state.amount.replace('$', ''))
      const responseStream = await Api.donate({
        source: token,
        firstName: this.state.firstName,
        frequency: this.state.frequency,
        lastName: this.state.lastName,
        amount: stripDollarSignAmount,
        email: this.state.email
      })
      const response = await responseStream.json()
      if (response.ok) {
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
    }

    if (redirectSuccess) return (<div />)

    return (
      <form className='flex flex-column f4-m ph2' onSubmit={this.donate}>
        <div className='error tf-lato tc'>
          <p className='red' aria-live='assertive'>{this.state.error}</p>
        </div>

        <DonationFrequency updateFrequency={this.updateFrequency} frequency={this.state.frequency} />
        <input type='text' required className='bn ba pa3 mv2' placeholder='First name' value={this.state.firstName} name="firstName" onChange={this.updateStateKey} aria-label='First Name' />
        <input type='text' required className='bn ba pa3 mv2' placeholder='Last name' value={this.state.lastName} name="lastName" onChange={this.updateStateKey} aria-label='Last Name' />
        <input type='email' required className='bn ba pa3 mv2' placeholder='Email' value={this.state.email} name="email" onChange={this.updateStateKey} aria-label='Email' />
        <input type='text' required className='bn ba pa3 mv2' placeholder='$ Amount' value={this.state.amount} name="amount" onChange={this.updateStateKey} aria-label='Amount' />
        <div className='bg-white bn ba pa3 mv2'>
          <CardElement />
        </div>
        { loading && <h2 className='tc tf-lato'>Loading...</h2>}
        <button type='submit' className='white btn-donate tf-lato b tc pa3 mt3 mt3-m mh-auto br-pill pointer w-50'>Donate</button>
      </form>
    )
  }
}

export default injectStripe(DonateForm)
