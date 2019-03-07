import React from 'react'
import Link from 'next/link'
import X from './icons/x'
import Hamburger from './icons/hamburger'
import Drawer from 'react-motion-drawer'
import '../static/styles/main.scss'

const links = [
  { href: '/', label: 'Home' },
  // { href: '/whyteachers', label: 'Why Teachers?' },
  { href: '/ourwork', label: 'Our Work' },
  { href: '/aboutus', label: 'About us' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const buttons = [
  { href: '/donate', label: 'Donate' },
  { href: '/signinregister', label: 'Login' },
  { href: '/signinregister', label: 'I\'m a teacher' }
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
    return (
      <div className='nav'>
        <div className='navBarSection'>
          {this.props.navColor === 'white' && <div className='navBarSection_logo'>
            <Link href='/'>
              <img src='/static/images/Logo_transparent.png' className='navItems_logo' />
            </Link>
          </div>}
          {this.props.navColor === 'black' && <div className='navBarSection_logo'>
            <Link href='/'>
              <img src='/static/images/Logo_with_text.png' className='navItems_logo' />
            </Link>
          </div>}
          <div className='navItems'>
            {links.map(({ key, href, label }) => (
              <div key={key}>
                <Link href={href}>
                  <a className={`${this.props.navColor} ttu`}>{label}</a>
                </Link>
              </div>
            ))}
          </div>
          <div className='navButtons'>
            {buttons.map(({ key, href, label }) => (
              <div key={key}>
                <Link href={href}>
                  <a className={`${this.props.navColor} ttu`}>{label}</a>
                </Link>
              </div>
            ))}
          </div>
          <div className='hamburgerContainer' onClick={this.toggleDrawer}>
            <Hamburger className='hamburger' />
          </div>
          <img src='/static/images/Logo.png' className='imageLogo' />
        </div>
        <Drawer open={this.state.drawerOpen} width={250} right className='drawer'>
          <img src='/static/images/Logo.png' className='imageLogo' />
          <div className='drawerXClose' onClick={this.toggleDrawer}>
            <X width='34'
              height='32'
            />
          </div>
          <div className='navigationDrawerLinks'>
            <Link href='/'><a className='black ttu'>home</a></Link>
            <Link href='/aboutus'><a className='black ttu'>about</a></Link>
            {/* <Link href='/whyteachers'><a className='black ttu'>Why teachers</a></Link> */}
            <Link href={{pathname:'/signinregister', query:{type:'donor'}}}><a className='black ttu'>Login</a></Link>
            <Link href={{pathname:'/signinregister', query:{type:'teacher'}}}><a className='black ttu'>I'm a teacher</a></Link>
            <Link href='/donate'><a className='black ttu'>Donate</a></Link>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default Nav
