import React, { Component } from 'react'
import '../static/styles/main.scss'

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      user: '',
      pass: ''
    }
  }

  render() {
    return (
      <div>
        <div class="heading">
          <h1 class="h35">Sign in</h1>
        </div>
        <form action="api/user/login" method="post">
          <div className="panel">
            <div className="input-wrapper">
              <input
                required="required"
                className="email"
                aria-required="true"
                placeholder="Email"
                type="email"
                name="user[email]"
                id="user_email"
                autoComplete="off"
              />
            </div>
            <div className="input-wrapper">
              <input
                className="password"
                autoComplete="off"
                placeholder="Password"
                type="password"
                name="user[password]"
                id="user_password"
              />
              <a className="toggle" data-hidden="true">Show</a>
            </div>
            <input
              type="submit"
              name="commit"
              value="Sign in"
              className="button button--large button--expand radius"
            />
            <a class="reset" href="/account/password/reset">Forgot password?</a>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
