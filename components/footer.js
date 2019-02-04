import React from 'react'
import Link from 'next/link'

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

    <style jsx>{`
      .footer {
        padding: 10%;
        height: 200px; 
        background-color: #434343;
      }
      .footer > div {
        color: white;
      }
      .footerLinks {
        margin-top: 100px;
        margin-button: 10px;
        display: flex;
        justify-content: center;
      }
      .nonprofitInfo {
        text-align: center;
        margin: auto;
      }
      .footerLinks > div {
        margin: 20px;
      }
      a {
        color: white;
        text-decoration: none;
        font-size: 13px;
      }

      @media only screen and (min-width: 600px) { 
        .footer {
          width: 80%;
        }
      }
    `}</style>
  </div>
)

export default Footer
