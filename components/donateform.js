import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { CardElement, injectStripe } from 'react-stripe-elements'
import TwoItemSwitcher from './twoItemSwitcher'
import * as Api from '../api/api'
import '../static/styles/main.scss'

class DonateForm extends Component {
  constructor (props) {
    super(props)
    this.donate = this.donate.bind(this)
    this.state = {
      loading: false,
      redirect: false,
      firstName: '',
      lastName: '',
      amount: 0,
      email: '',
      frequency: 'once'
    }
  }

  updateFirstName = (e) => {
    this.setState({ firstName: e.target.value })
  }

  updateFrequency = (newVal) => {
    this.setState({ frequency: newVal })
  }

  updateLastName = (e) => {
    this.setState({ lastName: e.target.value })
  }

  updateEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  updateAmount = (e) => {
    this.setState({ amount: parseInt(e.target.value) })
  }

  donate = async (ev) => {
    console.log(this.state)
    this.setState({ loading: true })
    let token
    try {
      let res = await this.props.stripe.createToken()
      token = res.token
    } catch (e) {
      console.log(e)
      this.setState({ redirectError: true, loading: false })
      return
    }

    if (!token) {
      this.setState({ redirectError: true, loading: false })
      return
    }
    try {
      let response = await Api.donate({ token })
      if (response.ok) {
        console.log('Donation Complete!')
        this.setState({ redirectSuccess: true, loading: false })
      } else {
        this.setState({ redirectError: true, loading: false })
      }
    } catch (e) {
      this.setState({ redirectError: true, loading: false })
    }
  }

  render () {
    const { redirectError, redirectSuccess, loading } = this.state

    if (redirectError) {
      return <Redirect to='/error' />
    } else if (redirectSuccess) {
      return <Redirect to='/success' />
    }
    return (
      <div className='donate'>
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
          <label>{'Donate'.toUpperCase()}</label>
        </div>
      </div>
    )
  }
}

export default injectStripe(DonateForm)
