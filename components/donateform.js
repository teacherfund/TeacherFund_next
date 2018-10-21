import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {CardElement, injectStripe} from 'react-stripe-elements'
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
        <button className="donate__button" onClick={this.donate}>Donate</button>
        <style jsx>{`
          /**
           * The CSS shown here will not be introduced in the Quickstart guide, but shows
           * how you can use CSS to style your Element's container.
           */
          .donate__form {
            background-color: white;
            height: auto;
            font-size: 14px;
            width: 400px;
            margin: auto;
            padding: 10px 12px;
            border-radius: 4px;
            border: 1px solid transparent;
            box-shadow: 0 1px 3px 0 #8d9197;
            -webkit-transition: box-shadow 150ms ease;
            transition: box-shadow 150ms ease;
          }
          
          .donate__form--focus {
            box-shadow: 0 1px 3px 0 #cfd7df;
          }
          
          .donate__form--invalid {
            border-color: #fa755a;
          }
          
          .donate__form--webkit-autofill {
            background-color: #fefde5 !important;
          }
        `}</style>
      </div>
    )
  }
}

export default injectStripe(DonateForm)