import React from 'react'
import Link from 'next/link'

class Nav extends React.Component {
  constructor (props) {
    super(props)

    this.links = [
      // { href: '/', label: 'Home' },
      { href: '/signinregister?type=donor', label: 'Login', key: 'nav-link-login' }
      // { href: '/whyteachers', label: 'Why Teachers?' },
      // { href: '/ourwork', label: 'Our Work' },
      // { href: '/aboutus', label: 'About us' }
    ]

    this.buttons = [
      { href: '/donate', label: 'Donate', key: 'nav-link-donate' }
      // { href: '/signinregister?type=teacher', label: 'I\'m a teacher' }
    ]
    this.loggedIn = false
  }

  componentDidMount () {
    if (this.props.loggedIn && !this.loggedIn) this.switchLoginToAccount()
  }

  componentDidUpdate () {
    if (this.props.loggedIn && !this.loggedIn) this.switchLoginToAccount()
  }

  switchLoginToAccount = () => {
    // If user is logged in, splice out login button and add in an "account" button
    this.buttons.splice(1, 1,
      { key: 'nav-link-/account-account', href: '/account', label: 'Account' }
    )
    this.loggedIn = true
  }

  render () {
    return (
      <div className='h5-m f6 tf-lato bg-white pv4 flex fl w-100 pl5 pr5 pt4 z-1'>
        <div className='center b--tf-yellow flex flex-column flex-row-l w-100'>
          <div className='pointer tc'>
            <Link href='/'>
              <img src='/static/images/Logo_with_text.png' className='w4' />
            </Link>
          </div>
          <div className='fr flex-column flex-auto-ns m-auto'>
            {this.links.map(({ key, href, label }) => (
              <div key={key} className='db center w-auto fr ph2'>
                <Link href={href}>
                  <a className='tf-dark-gray no-underline black pa3'>{label}</a>
                </Link>
              </div>
            ))}
          </div>
          <div className='center fr tf-yellow m-auto'>
            {this.buttons.map(({ key, href, label }) => (
              <div key={key} className='db center w-auto fr ph2'>
                <Link href={href} key={key}>
                  <a className='b--tf-yellow tf-yellow no-underline black pa3 ba bw2 br3'>{label}</a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Nav
