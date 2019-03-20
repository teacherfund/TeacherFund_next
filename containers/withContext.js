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
      // app state goes here
      loggedIn: false
    }
    this.helpers = autobind([
      // methods to alter state go here
      'handleLogin'
    ], this)
  }
  handleLogin () {
    // call these global helper functions from pages
    //   this.props.helpers.handleLogin({ ... })
    // this handler calls API methods directly
    //   api.login({ ... })
    // then sets state with result
    //   this.setState({ loggedIn: true })
    // app state can be accessed in page with
    //   this.props.context.loggedIn
    this.setState({ loggedIn: true })
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
