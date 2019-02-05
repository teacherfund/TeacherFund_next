import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {CardElement, injectStripe} from 'react-stripe-elements'
import '../static/styles/main.scss'

const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://teacherfund.herokuapp.com' : 'http://localhost:9000'

class DonateForm extends Component {
  constructor(props) {
    super(props)
    this.donate = this.donate.bind(this)
    this.state = {
      loading: false,
      redirect: false
    }
  }

  async donate(ev) {
    this.setState({ loading: true })
    let token
    try {
      let res = await this.props.stripe.createToken(options)
      token = res.token
    } catch (e) {
      console.log(e)
      this.setState({ redirectError: true, loading: false })
      return
    }

    if (!token) {
      return
    }
    const bodyObject = {
      token, 
    }
    try {
      let response = await fetch(`${ENDPOINT}/donate`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyObject)
      })
      if (response.ok) {
        console.log("Donation Complete!")
        this.setState({ redirectSuccess: true, loading: false })
      } else {
        this.setState({ redirectError: true, loading: false })
      }
    } catch (e) {
      this.setState({ redirectError: true, loading: false })
    }
  }

  render() {
    const {redirectError, redirectSuccess, loading} = this.state

    if (redirectError) {
      return <Redirect to='/error'/>
    } else if (redirectSuccess) {
      return <Redirect to='/success'/>
    }
    return (
      <div className="donate">
        <div className="donate__form">
          <CardElement />
        </div>
        { loading && <h2>Loading...</h2>}
        <button className="donate__button" onClick={this.donate}>
          Donate
        </button>
      </div>
    )
  }
}

export default injectStripe(DonateForm)