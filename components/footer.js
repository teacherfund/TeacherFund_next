import React from 'react'
import Link from 'next/link'
import '../static/styles/main.scss'

const links = [
  { href: '/', label: 'Home' },
  { href: '/ourwork', label: 'Our Work' },
  { href: '/aboutus', label: 'About us' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const nonprofitInfoText = `© Copyright ${new Date().getFullYear()}. The Teacher Fund is 501 (c)(3) pending | EIN: 83-2285506`

const Footer = (props) => (
  <div className='footer'>
    <hr />
    <div className='footerLinks footer__child'>
      {links.map(({ key, href, label }) => (
        <div key={key} className='footerLinks__child'>
          <Link href={href}>
            <a className='ttu'>{label}</a>
          </Link>
        </div>
      ))}
    </div>
    <div className='nonprofitInfo footer__child'>
      {nonprofitInfoText}
    </div>
  </div>
)

export default Footer
