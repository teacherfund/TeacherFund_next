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
      amountSpent: 0,
      amountDonated: 0
    }
    this.helpers = autobind([
      // methods to alter state go here
      'handleSignup',
      'handleLogin',
      'handleVerify'
    ], this)
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
        this.setState({ amountDonated: res.donations })
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
