import React, {Component} from 'react'
import '../static/styles/main.scss'
import * as Api from '../api/api'

class EmailCapture extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      error: '',
      success: false
    }
  }

  subscribe = async () => {
    if (!this.state.firstName) return this.setLocalState({ error: 'First name required' })
    if (!this.state.lastName) return this.setLocalState({ error: 'Last name required' })
    if (!this.state.email) return this.setLocalState({ error: 'Email is required' })

    // Make api call to subscribe
    const reqBody = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    }
    try {
      const responseStream = await Api.subscribe(reqBody)
      const response = await responseStream.json()
      
      // If error, prompt to try again
      if (!response.ok) return this.setLocalState({ error: 'Whoops, please try again' })

      // Reset form and notify user of success
      this.setLocalState({
        firstName: '',
        lastName: '',
        email: '',
        success: true
      })
    } catch (e) {
      console.error(e)
    }
  }

  setLocalState = (state) => {
    if (!state.error) state.error = ''
    this.setState(state)
  }

  updateFirstName = (e) => {
    this.setLocalState({ firstName: e.target.value })
  }

  updateLastName = (e) => {
    this.setLocalState({ lastName: e.target.value })
  }

  updateEmail = (e) => {
    this.setLocalState({ email: e.target.value })
  }

  render() {
    return (
      <div className=''>
        {this.state.error && <div className='validation--error error'>
          {this.state.error}
        </div>}
        {this.state.success && <div className='email-capture__success'>
          <p className='center pb-1 pt-1'>Thanks! You're in the loop!</p>
        </div>}
        <div className='email-capture__content'>
          <div className='email-capture__input'>
            <input placeholder='First name' value={this.state.firstName} onChange={this.updateFirstName}/>
          </div>
          <div className='email-capture__input'>
            <input placeholder='Last name' value={this.state.lastName} onChange={this.updateLastName}/>
          </div>
          <div className='email-capture__input'>
            <input placeholder='Email' value={this.state.email} onChange={this.updateEmail}/>
          </div>
          <div className='email-capture__button' onClick={this.subscribe}>
            <label className='ttu'>Get our emails</label>
          </div>
        </div>
      </div>
    )
  }
}

export default EmailCapture
