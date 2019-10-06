import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import TwoItemSwitcher from './twoItemSwitcher'
import Router from 'next/router'
import * as Api from '../api/api'
import '../static/styles/main.scss'

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

  updateFirstName = (e) => {
    this.setLocalState({ firstName: e.target.value })
  }

  updateFrequency = (newVal) => {
    this.setLocalState({ frequency: newVal })
  }

  updateLastName = (e) => {
    this.setLocalState({ lastName: e.target.value })
  }

  updateEmail = (e) => {
    this.setLocalState({ email: e.target.value })
  }

  updateAmount = (e) => {
    this.setLocalState({ amount: `${e.target.value.includes('$') ? '' : '$'}${e.target.value}` })
  }

  donate = async (ev) => {
    ev.preventDefault()
    this.setLocalState({ loading: true })
    let token
    try {
      const res = await this.props.stripe.createToken()
      token = res.token
    } catch (e) {
      console.log(e)
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
        console.log('Donation Complete!')
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
      <form className='flex flex-column' onSubmit={this.donate}>
        <div className='error tf-lato tc'>
          <p className='red'>{this.state.error}</p>
        </div>
        <TwoItemSwitcher
          color='black'
          switchOneText='Give Once'
          selectedToggle={this.state.frequency === 'once' ? 1 : 2}
          switchTwoText='Monthly'
          switchOneClicked={() => this.updateFrequency('once')}
          switchTwoClicked={() => this.updateFrequency('monthly')}
        />
        <input className='bn ba pa2 ma1' placeholder='First name' value={this.state.firstName} onChange={this.updateFirstName} aria-label='First Name' />
        <input className='bn ba pa2 ma1' placeholder='Last name' value={this.state.lastName} onChange={this.updateLastName} aria-label='Last Name' />
        <input className='bn ba pa2 ma1' placeholder='Email' value={this.state.email} onChange={this.updateEmail} aria-label='Email' />
        <input className='bn ba pa2 ma1' placeholder='$ Amount' value={this.state.amount} onChange={this.updateAmount} aria-label='Amount' />
        <div className='bg-white bn ba pa2 ma1'>
          <CardElement />
        </div>
        { loading && <h2 className='tc tf-lato'>Loading...</h2>}
        <button type='submit' className='white bg-tf-teal tf-lato b tc pa2 ma3 br-pill ttu'>Donate</button>
      </form>
    )
  }
}

export default injectStripe(DonateForm)
