import React, { Component } from 'react'
import Router from 'next/router'
import * as Api from '../api/api'

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
      userAmountDonated: 0,
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

    this.fetchGlobalStats()
  }
  handleSignup ({ email, firstName, lastName, role }) {
    return Api.register({ email, firstName, lastName, role })
      .then((res) => res.json())
      .then((res) => {
        // request fails, fall into component's catch block
        if (!res.ok) throw new Error('signup failed')
        // should redirect to a post-registration page
        Router.push('/post-login')
      })
  }
  fetchGlobalStats () {
    return Api.fetchAllDonations()
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok) {
          throw new Error('fetching global stats failed')
        }
        if (res.donations) {
          const amountDonated = res.donations.reduce((acc, val) => {
            return acc + (val.amount / 100)
          }, 0)
          // set stats
          this.setState({ globalAmountDonated: amountDonated || 0, globalAmountSpent: res.amountSpent || 0 })
        }
      })
  }
  handleLogin ({ email, role }) {
    return Api.login({ email, role })
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok) throw new Error('login failed')
        this.setState({ email })
        // redirect to a post-login page (since email has been sent)
        Router.push('/post-login')
      })
  }
  handleVerify ({ email, auth }) {
    return Api.verify({ email, auth })
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok) {
          this.setState({ loggedIn: false })
          throw new Error('authentication failed')
        }
        // mark them as logged in
        this.setState({ loggedIn: true, email, auth })
        console.log('here')
        return this.fetchUserStats()
      })
  }
  fetchUserStats () {
    return Api.fetchUserStats({ email: this.state.email, auth: this.state.auth })
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok) {
          throw new Error('fetching user stats failed')
        }
        // set user stats
        console.log(res.donations)
        this.setState({ userAmountDonated: res.donations })
      })
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
