import React, { Component } from 'react'
import TwoItemSwitcher from './twoItemSwitcher'
import '../static/styles/main.scss'

class RegisterForm extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      user: '',
      pass: '',
      loginType: 'donor'
    }
  }

  updateLoginType = (newVal) => {
    this.setState({ loginType: newVal })
  }

  render () {
    return (
      <div>
        <div className='heading'>
          <h1 className='h35 white'>Sign up</h1>
        </div>
        <div className='donorTeacherSwitcher'>
          <TwoItemSwitcher
            switchOneText="i'm a donor"
            className='donorTeacherSwitcher'
            color='white'
            selectedToggle={this.state.loginType === 'donor' ? 1 : 2}
            switchTwoText="i'm a teacher"
            switchOneClicked={() => this.updateLoginType('donor')}
            switchTwoClicked={() => this.updateLoginType('teacher')}
          />
        </div>
        <form action='api/user/register' method='post'>
          <div className='panel'>
            <div className='input-wrapper'>
              <input
                required='required'
                className='name'
                aria-required='true'
                placeholder='Enter your full name'
                name='user[name]'
                id='user_name'
                autoComplete='off'
              />
            </div>
            <div className='input-wrapper'>
              <input
                required='required'
                className='email'
                aria-required='true'
                placeholder='Enter your email'
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
                placeholder='Enter a password'
                type='password'
                name='user[password]'
                id='user_password'
              />
              <a className='toggle' data-hidden='true'>Show</a>
            </div>
            <input
              type='submit'
              name='commit'
              value='Sign up'
              className='button button--large button--expand radius'
            />
            <a className='reset' href='/signinsignup'>Already Have An Account? Sign In</a>
          </div>
        </form>
      </div>
    )
  }
}

export default RegisterForm
