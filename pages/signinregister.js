import React from 'react'
import Nav from '../components/nav'
import Head from '../components/head'
import LoginForm from '../components/loginform'
import '../static/styles/main.scss'

class SignInSignUp extends React.Component {
  // Gist to get window size taken from https://gist.github.com/nma/33f8057e4899bdb55440a693a02c431b
  constructor (props) {
    super(props)
    this.state = { height: 512 }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount () {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this))
  }

  updateWindowDimensions () {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  getImageSize () {
    if (this.state.width >= 1080) {
      return '/static/images/large/einstein-1920x1280.jpg'
    } else if (this.state.width >= 720) {
      return '/static/images/medium/einstein-1080x720.jpg'
    } else if (this.state.width >= 480) {
      return '/static/images/medium/einstein-720x720.jpg'
    }
    return '/static/images/small/einstein-480x720.jpg'
  }

  getInitialProps = async ({ query }) => {
    return {
      teacher: query.type
    }
  }

  render () {
    return (
      <div>
        <Nav />
        <Head title='Sign In' />
        <main>
          <div className='w-100 h-100 flex pa5'>
            <img className='absolute w-100 h-100 top-0 left-0 z-minus-1' src={this.getImageSize()} />
            <div className='flex flex-row-reverse m-auto'>
              <LoginForm
                type={this.props.teacher}
                onSignup={this.props.helpers.handleSignup}
                onLogin={this.props.helpers.handleLogin}
              />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default SignInSignUp
