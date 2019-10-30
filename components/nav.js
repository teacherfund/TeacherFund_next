import React from 'react'
import Hamburger from './icons/hamburger'
import X from './icons/x'
import Link from 'next/link'

class Nav extends React.Component {
  constructor (props) {
    super(props)

    this.links = [
      { href: '/mission', label: 'Our Mission', key: 'our-mission' }
    ]

    this.buttons = [
      { href: '/donate', label: 'Donate', key: 'nav-link-donate' }
    ]
    this.state = {
      drawerOpen: false
    }
  }

  toggleDrawerOpen = () => {
    const { drawerOpen } = this.state
    if (!drawerOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    this.setState({ drawerOpen: !drawerOpen })
  }

  render () {
    return (
      <nav>
        <div className='f6 f5-m tf-lato bg-white pv4 flex fl w-100 pl5-ns pr5-ns pl3 pr3 z-1'>
          <div className='w-70-l mh-auto b--tf-yellow flex justify-between flex-row w-100'>
            <div className='pointer tc'>
              <Link href='/'>
                <img src='/static/images/Logo_with_text.png' className='w4' alt='The Teacher Fund – Home' />
              </Link>
            </div>
            <div className='fr dn db-l flex-column flex-auto-ns mv-auto'>
              {this.links.map(({ key, href, label }) => (
                <div key={key} className='db center w-auto fr ph2'>
                  <Link href={href}>
                    <a className='tf-dark-gray no-underline black pa3'>{label}</a>
                  </Link>
                </div>
              ))}
            </div>
            <div className='fr dn db-l tf-yellow mv-auto'>
              {this.buttons.map(({ key, href, label }) => (
                <div key={key} className='db center w-auto fr ph2'>
                  <Link href={href} key={key}>
                    <a className='btn-alt no-underline black pv3 ph4 br3'>{label}</a>
                  </Link>
                </div>
              ))}
            </div>
            <div className='fr dn-l db'>
              <div className='pa3 f2-m' onClick={this.toggleDrawerOpen}>
                <Hamburger />
              </div>
            </div>
          </div>
        </div>
        {this.state.drawerOpen && <div className='w-100 h-100 bg-tf-dark-gray o-90 absolute white tf-lato tc'>
          <div className='fr ma3 ma4-m' onClick={this.toggleDrawerOpen}>
            <X />
          </div>
          <div className='flex-column flex justify-around h5 mt6 pt4 f3'>
            <p><a href='/' className='white no-underline mv2'>Home</a></p>
            <p><a href='/donate' className='white no-underline mv2'>Donate</a></p>
            <p><a href='/mission' className='white no-underline mv2'>Our Mission</a></p>
          </div>
        </div>}

      </nav>
    )
  }
}

export default Nav
