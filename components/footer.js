import React from 'react'
import Link from 'next/link'
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

const nonprofitInfoText = `© Copyright ${new Date().getFullYear()}. The Teacher Fund is a 501 (c)(3) | EIN: 22-3936753`

const Footer = (props) => (
  <div className="footer">
    <hr/>
    <div className="footerLinks">
      {links.map(({ key, href, label }) => (
        <div key={key}>
          <Link href={href}>
            <a>{label.toUpperCase()}</a>
          </Link>
        </div>
      ))}
    </div>
    <div className="nonprofitInfo">
      {nonprofitInfoText}
    </div>
  </div>
)

export default Footer
