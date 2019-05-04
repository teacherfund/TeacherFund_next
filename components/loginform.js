import React, { Component } from 'react'
// import TwoItemSwitcher from './twoItemSwitcher'
import '../static/styles/main.scss'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      register: false,
      loginType: props.type || 'donor'
    }
  }

  updateFirstname = (e) => {
    this.setState({ firstName: e.target.value })
  }

  updateLastname = (e) => {
    this.setState({ lastName: e.target.value })
  }

  updateEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  updateLoginType = (newVal) => {
    this.setState({ loginType: newVal })
  }

  updateFormType = () => {
    this.setState((prevState) => ({ register: !prevState.register }))
  }

  handleSubmit = () => {
    if (!this.state.register) {
      this.login()
    } else {
      this.signup()
    }
  }

  login = () => {
    // clear any errors that may have occurred up to this point
    this.clearError()
    this.props.onLogin({
      email: this.state.email,
      role: this.state.loginType
    }).catch((e) => {
      console.error(e)
      this.showError()
    })
  }

  signup = () => {
    // clear any errors that may have occurred up to this point
    this.clearError()
    this.props.onSignup({
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      role: this.state.loginType
    }).catch((e) => {
      console.error(e)
      this.showError()
    })
  }

  clearError = () => {
    this.setState({ error: '' })
  }

  showError = () => {
    this.setState({ error: 'An error occurred, please try again ' })
  }

  render () {
    return (
      <div className='bg-white w6 pb3 br3'>
        <div className='ts-title tf-lato tc mt3'>
          <h2 className='h35 tf-dark-gray'>{ this.state.register ? 'Sign up' : 'Sign in' }</h2>
        </div>
        {/* <div className='donorTeacherSwitcher'>
          <TwoItemSwitcher
            switchOneText="i'm a donor"
            className='donorTeacherSwitcher'
            color='white'
            selectedToggle={this.state.loginType === 'donor' ? 1 : 2}
            switchTwoText="i'm a teacher"
            switchOneClicked={() => this.updateLoginType('donor')}
            switchTwoClicked={() => this.updateLoginType('teacher')}
          />
        </div> */}
        <div className='tc'>
          <div className='panel'>
            <div className='error'>
              <p className='error--message'>{this.state.error}</p>
            </div>
            <div className='instruction'>
              <p className='instruction--message'>{this.state.message}</p>
            </div>
            {this.state.register &&
            <div className=''>
              <input
                className='ba b--black pa2 w5 ma1 br2'
                required='required'
                placeholder='First name'
                name='first name'
                id='first_name'
                autoComplete='off'
                aria-required='true'
                value={this.state.firstName}
                onChange={this.updateFirstName}
              />
              <input
                required='required'
                className='ba b--black pa2 w5 ma1 br2'
                onChange={this.updateLastname}
                value={this.state.lastName}
                aria-required='true'
                placeholder='Last name'
                name='last name'
                id='last_name'
                autoComplete='off'
              />
            </div>}
            <div className='mb2'>
              <input
                required='required'
                className='ba b--black pa2 w5 ma1 br2'
                onChange={this.updateEmail}
                value={this.state.email}
                aria-required='true'
                placeholder='Email'
                type='email'
                name='email'
                id='user_email'
                autoComplete='off'
              />
            </div>
            <div className='white bg-tf-yellow tf-lato b tc pa2 w5 m-auto br-pill' onClick={this.handleSubmit}>
              <label className='ttu'>{this.state.register ? 'Sign up' : 'Sign in'}</label>
            </div>
            <div className='mt2'>
              <a className='tf-lato' onClick={this.updateFormType}>{this.state.register ? 'or sign in' : 'or sign up'}</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
