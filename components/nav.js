import React, { useState } from 'react'
import Hamburger from './icons/hamburger'
import X from './icons/x'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'

const Nav = () => {
  const { user, loading } = useAuth()

  const links = [
    { href: '/mission', label: 'Our Mission', key: 'our-mission' },
    { href: '/contact', label: 'Contact Us', key: 'contact' },
    { href: '/blog', label: 'Blog', key: 'blog' },
    { href: '/donate', label: 'Donate', key: 'donate' }
  ]
  let buttons = [
    { href: '/signin', label: 'Login', key: 'login' }
  ]

  if (user && !loading) {
    links.push({ href: '/account', label: 'Account', key: 'account' })
    buttons = [
      { href: '/logout', label: 'Logout', key: 'logout' }
    ]
  }

  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawerOpen = () => {
    if (!drawerOpen) {
      document.body.classList.add('no-scroll')
      document.getElementById('hamburger-icon').classList.add('dn')
    } else {
      document.body.classList.remove('no-scroll')
      document.getElementById('hamburger-icon').classList.remove('dn')
    }

    setDrawerOpen(!drawerOpen)
  }

  return (
    <nav>
      <div className='f6 f5-m tf-lato bg-white pv4 flex fl w-100 pl5-ns pr5-ns pl4 pr3'>
        <div className='w-70-l mh-auto b--tf-yellow flex justify-between flex-row w-100'>
          <div className='pointer tc'>
            <Link href='/'>
              <img src='/images/Logo_with_text.png' className='w4' alt='The Teacher Fund – Home' />
            </Link>
          </div>
          <div className='fr dn db-l flex-column flex-auto-ns mv-auto'>
            {links.map(({ key, href, label }) => (
              <div key={key} className='db center w-auto fr ph2'>
                <Link href={href}>
                  <a className='nav-item tf-dark-gray no-underline black pa3'>{label}</a>
                </Link>
              </div>
            ))}
          </div>
          <div className='fr dn db-l tf-yellow mv-auto ml4'>
            {buttons.map(({ key, href, label }) => (
              <div key={key} className='db center w-auto fr ph2'>
                <Link href={href} key={key}>
                  <a className='btn-alt no-underline black pv3 ph4 br3'>{label}</a>
                </Link>
              </div>
            ))}
          </div>
          <div className='fr dn-l db'>
            <div className='pa3 f2-m' onClick={toggleDrawerOpen}>
              <Hamburger />
            </div>
          </div>
        </div>
      </div>
      {drawerOpen && <div className='w-100 h-100 bg-tf-dark-gray z-1 fixed o-90 white tf-lato tc pv4 pl5-ns pr5-ns'>
        <div className='fr pa2 pr3 mr1 pt2-m pr2-m mr1-m mt1-m' onClick={toggleDrawerOpen}>
          <X />
        </div>
        <div className='flex-column flex justify-around h5 mt6 pt4 f3'>
          {links.map(({ key, href, label }) => (
            <div key={key} className='db center w-auto fr ph2' onClick={toggleDrawerOpen}>
              <Link href={href}>
                <a className='white no-underline mv4 w5 center'>{label}</a>
              </Link>
            </div>
          ))}
          {buttons.map(({ key, href, label }) => (
            <div key={key} className='btn-menu no-underline pv3 br3 mv4 w4 w5-m center' onClick={toggleDrawerOpen}>
              <Link href={href} key={key}>
                <a className=''>{label}</a>
              </Link>
            </div>
          ))}
        </div>
      </div>}

    </nav>
  )
}

export default Nav
