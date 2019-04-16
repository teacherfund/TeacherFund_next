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
      amount: '$',
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
    this.setLocalState({ amount: `$ ${e.target.value}` })
  }

  donate = async (ev) => {
    console.log(this.state)
    this.setLocalState({ loading: true })
    let token
    try {
      let res = await this.props.stripe.createToken()
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
      <div className='donate'>
        <div className='error'>
          <p className='error--message'>{this.state.error}</p>
        </div>
        <TwoItemSwitcher
          color='black'
          switchOneText='Give Once'
          selectedToggle={this.state.frequency === 'once' ? 1 : 2}
          switchTwoText='Monthly'
          switchOneClicked={() => this.updateFrequency('once')}
          switchTwoClicked={() => this.updateFrequency('monthly')}
        />
        <div className='donate__name'>
          <input className='donate__name__input' placeholder='First name' onChange={this.updateFirstName} />
        </div>
        <div className='donate__name'>
          <input className='donate__name__input' placeholder='Last name' onChange={this.updateLastName} />
        </div>
        <div className='donate__name'>
          <input className='donate__name__input' placeholder='Email' onChange={this.updateEmail} />
        </div>
        <div className='donate__name'>
          <input className='donate__name__input' placeholder='Amount' onChange={this.updateAmount} />
        </div>
        <div className='donate__form'>
          <CardElement />
        </div>
        { loading && <h2>Loading...</h2>}
        <div className='donate__button button white' onClick={this.donate}>
          <label className='ttu'>Donate</label>
        </div>
      </div>
    )
  }
}

export default injectStripe(DonateForm)
