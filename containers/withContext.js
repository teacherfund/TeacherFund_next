import React, { Component } from 'react'
import Router from 'next/router'
import * as Api from '../client/api'

// bind functions to self and return them in an object
function autobind (funcs, self) {
  return funcs.reduce((output, f) => {
    self[f] = self[f].bind(self)
    output[f] = self[f]
    return output
  }, {})
}

export default (Page, pageProps) => class Context extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // app state goes here
      loggedIn: false,
      email: '',
      auth: '',
      userAmountSpent: 0,
      userDonations: [],
      globalAmountDonated: 0,
      globalAmountSpent: 0
    }
    this.helpers = autobind([
      // methods to alter state go here
      'handleSignup',
      'handleLogin',
      'handleVerify',
      'fetchUserStats',
      'fetchGlobalStats'
    ], this)
  }

  componentDidMount () {
    this.fetchGlobalStats()
  }

  async handleSignup ({ email, firstName, lastName, role }) {
    const resStream = await Api.register({ email, firstName, lastName, role })
    const res = await resStream.json()
    // request fails, fall into component's catch block
    if (!res.ok) throw new Error('signup failed')
    // should redirect to a post-registration page
    Router.push('/pending-login')
  }

  async fetchGlobalStats () {
    const resStream = await Api.fetchAllDonations()
    const res = await resStream.json()
    if (!res.ok) {
      throw new Error('fetching global stats failed')
    }
    if (res.donations) {
      const amountDonated = res.donations.reduce((acc, val) => {
        return acc + (val.amount / 100)
      }, 0)
      // set stats
      this.setState({
        globalAmountDonated: amountDonated || 0,
        globalAmountSpent: res.amountSpent || 0
      })
    }
  }

  async handleLogin ({ email, role }) {
    const resStream = await Api.login({ email, role })
    const res = await resStream.json()

    if (!res.ok) throw new Error('login failed')
    this.setState({ email })
    // redirect to a pending-login page (since email has been sent)
    Router.push('/pending-login')
  }

  async handleVerify ({ email, auth }) {
    const resStream = await Api.verify({ email, auth })
    const res = await resStream.json()
    if (!res.ok) {
      this.setState({ loggedIn: false })
      throw new Error('authentication failed')
    }
    // mark them as logged in
    this.setState({ loggedIn: true, email, auth })
    return this.fetchUserStats()
  }

  async fetchUserStats () {
    const resStream = await Api.fetchUserStats({ email: this.state.email, auth: this.state.auth })
    const res = await resStream.json()
    if (!res.ok) {
      throw new Error('fetching user stats failed')
    }
    // set user stats
    this.setState({ userDonations: res.donations })
  }

  render () {
    const allProps = {
      ...pageProps,
      context: this.state,
      helpers: this.helpers
    }
    return (
      <Page {...allProps} />
    )
  }
}
