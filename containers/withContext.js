/* global fetch */
import React, { Component } from 'react'

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
      globalAmountDonated: 0
    }
    this.helpers = autobind([
      'fetchGlobalStats'
    ], this)
  }

  async fetchGlobalStats () {
    const resStream = await fetch('/api/donations')
    const res = await resStream.json()
    if (res && res.length) {
      const amountDonated = res.reduce((acc, val) => {
        return acc + (val.amount / 100)
      }, 0)
      // set stats
      this.setState({
        globalAmountDonated: amountDonated || 0
      })
    }
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
