import React, { Component } from 'react'
import TwoItemSwitcher from './twoItemSwitcher'
import '../static/styles/main.scss'

class LoginForm extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      user: '',
      pass: '',
      register: false,
      loginType: 'donor'
    }
  }

  updateLoginType = (newVal) => {
    this.setState({ loginType: newVal })
  }

  updateFormType = () => {
    this.setState({ register: !this.state.register })
  }

  handleSubmit = () => {
    /* TODO SETUP APPROPRIATE ACTION CALL FOR SIGNIN OR SIGNUP */
    if (this.state.register) {
      this.login()
    } else {
      this.signup()
    }
  }

  login = () => {

  }

  signup = () => {

  }

  render () {
    return (
      <div>
        <div className='heading'>
          <h1 className='h35 white'>Sign in</h1>
        </div>
        <div className='donorTeacherSwitcher'>
          <TwoItemSwitcher
            switchOneText="i'm a donor"
            className='donorTeacherSwitcher'
            color='white'
            selectedToggle={this.state.loginType === this.props.type ? 1 : 2}
            switchTwoText="i'm a teacher"
            switchOneClicked={() => this.updateLoginType('donor')}
            switchTwoClicked={() => this.updateLoginType('teacher')}
          />
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className='panel'>
            {this.state.register &&
            <div className='input-wrapper'>
              <input
                required='required'
                className='name'
                aria-required='true'
                placeholder='Full Name'
                name='user[name]'
                id='user_name'
                autoComplete='off'
              />
            </div>}
            <div className='input-wrapper'>
              <input
                required='required'
                className='email'
                aria-required='true'
                placeholder='Email'
                type='email'
                name='user[email]'
                id='user_email'
                autoComplete='off'
              />
            </div>
            <div className='input-wrapper'>
              <input
                className='password'
                autoComplete='off'
                placeholder='Password'
                type='password'
                name='user[password]'
                id='user_password'
              />
              <a className='toggle' data-hidden='true'>Show</a>
            </div>
            <input
              type='submit'
              name='commit'
              value={this.state.register ? 'Sign up' : 'Sign in'}
              className='button button--large button--expand radius'
            />
            <a className='reset' onClick={this.updateFormType}>{this.state.register ? 'or sign in' : 'or sign up'}</a> <br />
            {!this.state.register && <a className='reset' href='/account/password/reset'>Forgot password?</a>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
