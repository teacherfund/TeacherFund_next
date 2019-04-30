import React from 'react'
import Link from 'next/link'
import X from './icons/x'
import Hamburger from './icons/hamburger'
import Drawer from 'react-motion-drawer'
import '../static/styles/main.scss'

const links = [
  // { href: '/', label: 'Home' },
  { href: '/signinregister?type=donor', label: 'Login' }
  // { href: '/whyteachers', label: 'Why Teachers?' },
  // { href: '/ourwork', label: 'Our Work' },
  // { href: '/aboutus', label: 'About us' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const buttons = [
  { href: '/donate', label: 'Donate' }
  // { href: '/signinregister?type=teacher', label: 'I\'m a teacher' }
].map(butt => {
  butt.key = `nav-link-${butt.href}-${butt.label}`
  return butt
})

class Nav extends React.Component {
  constructor (props) {
    super(props)
    this.state = { drawerOpen: false }
  }

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  render () {
    // If user is logged in, splice out login button and add in an "account" button
    if (this.props.loggedIn) {
      buttons.splice(1, 1, { key: 'nav-link-/account-account', href: '/account', label: 'Account' })
    }

    return (
      <div className='nav pv4 flex flex-row fl w-100 pl5 pr5 pt4'>
        <div className='nav__buttons flex flex-row w-100'>
          {this.props.navColor === 'white' && <div className='nav__logo__container'>
            <Link href='/'>
              <img src='/static/images/Logo_transparent.png' className='nav__logo w-100' />
            </Link>
          </div>}
          {(this.props.navColor === 'black' || !this.props.navColor) && <div className='nav__logo__container'>
            <Link href='/'>
              <img src='/static/images/Logo_with_text.png' className='nav__logo w-100' />
            </Link>
          </div>}
          {!this.props.navColor === 'black' && <div className='nav__logo__container'>
            <Link href='/'>
              <img src='/static/images/Logo_with_text.png' className='nav__logo w-100' />
            </Link>
          </div>}
          <div className='nav__items fr flex-auto'>
            {links.map(({ key, href, label }) => (
              <div key={key} className='w-auto fr ph2'>
                <Link href={href}>
                  <a className='nav__items__item pa3'>{label}</a>
                </Link>
              </div>
            ))}
          </div>
          <div className='nav__buttons fr'>
            {buttons.map(({ key, href, label }) => (
              <div key={key} className='w-auto fr ph2'>
                <Link href={href} key={key}>
                  <a className='nav__buttons__button pa3 ba bw2 br3'>{label}</a>
                </Link>
              </div>
            ))}
          </div>
          <div className='nav__hamburger__container' onClick={this.toggleDrawer}>
            <Hamburger className='hamburger' />
          </div>
          <img src='/static/images/Logo.png' className='nav__logo__mobile' />
        </div>
        <Drawer open={this.state.drawerOpen} width={250} right className='nav__drawer'>
          <img src='/static/images/Logo.png' className='image__logo' />
          <div className='drawer__x' onClick={this.toggleDrawer}>
            <X width='34'
              height='32'
            />
          </div>
          <div className='nav__drawer__links'>
            <Link href='/'><a className='black ttu'>home</a></Link>
            {/* <Link href='/aboutus'><a className='black ttu'>about</a></Link> */}
            {/* <Link href='/whyteachers'><a className='black ttu'>Why teachers</a></Link> */}
            <Link href='/signinregister?type=donor'><a className='black ttu'>Login</a></Link>
            {/* <Link href='/signinregister?type=teacher'><a className='black ttu'>I'm a teacher</a></Link> */}
            <Link href='/donate'><a className='black ttu'>Donate</a></Link>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default Nav
