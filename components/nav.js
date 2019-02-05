import React from 'react'
import Link from 'next/link'
import X from './icons/x'
import Hamburger from './icons/hamburger'
import Drawer from 'react-motion-drawer';
import '../static/styles/main.scss'

const links = [
  { href: '/', label: 'Home' },
  { href: '/whyteachers', label: 'Why Teachers?' },
  { href: '/ourwork', label: 'Our Work' },
  { href: '/about', label: 'About us' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const buttons = [
  { href: '/donate', label: 'Donate' },
  { href: '/imateacher', label: 'I\'m a teacher' },
].map(butt => {
  butt.key = `nav-link-${butt.href}-${butt.label}`
  return butt
})

const toggleDrawer = () => {
  
}

const Nav = () => (
  <div className="nav">
    <div className="navBarSection">  
      <div className="navItems">
        {links.map(({ key, href, label }) => (
          <div key={key}>
            <Link href={href}>
              <a>{label.toUpperCase()}</a>
            </Link>
          </div>
        ))}
      </div>
      <div className="navButtons">
        {buttons.map(({ key, href, label }) => (
          <div key={key}>
            <Link href={href}>
              <a>{label.toUpperCase()}</a>
            </Link>
          </div>
        ))}
      </div>
      <div className="hamburgerContainer">
        <Hamburger className="hamburger" />
      </div>
      <img src="/static/images/Logo.png" className="imageLogo"/> 
      <Drawer open={false} onChange={toggleDrawer}>
        <div className="drawer-IconsNav">
          <bag className="icon bag" width="22" height="27" />
          <div className="quantity-in-bag"></div>
          <X className="icon x" width="34" height="32"/>
        </div>
        <div className="navigation">
          <ul>
            <li><a onClick="go('shop')">SHOP</a></li>
            <li><a onClick="go('about')">ABOUT</a></li>
          </ul>
        </div><br/>
        <div className="drawer-footer">
          <hr/>
          <div className="checkout-button-drawer" onClick="checkout">
            <p className="checkout-button-drawer__text"><b>CHECKOUT</b></p>
          </div>
        </div>
      </Drawer>
    </div>
  </div>
)

export default Nav
