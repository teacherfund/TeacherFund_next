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
      <div className='nav f6 tf-sans-serif bg-white pv4 flex flex-row fl w-100 pl5 pr5 pt4'>
        <div className='center b--tf-yellow flex flex-row w-100'>
          <div>
            <Link href='/'>
              <img src='/static/images/Logo_with_text.png' className='w4' />
            </Link>
          </div>
          <div className='fr flex-auto nav__items'>
            {this.links.map(({ key, href, label }) => (
              <div key={key} className='db center w-auto fr ph2'>
                <Link href={href}>
                  <a className='tf-dark-gray no-underline black pa3'>{label}</a>
                </Link>
              </div>
            ))}
          </div>
          <div className='center fr nav__buttons'>
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
