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

const buttons = [
  { href: '/imateacher', label: 'I\'m a Teacher' },
  { href: '/donate', label: 'Donate' },
].map(butt => {
  butt.key = `nav-link-${butt.href}-${butt.label}`
  return butt
})

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
    </div>


    <style jsx>{`
      :global(body) {
        margin: 0;
        background-color: #d9d9d9;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      .navItems {
        display: none;
      }

      @media only screen and (min-width: 800px) {
        .navBarSection {
          position: relative;
          max-width: 1000px;
          margin-right: auto;
          margin-left: auto;
          display: flex;
          flex-direction: row;
          background-color: transparent;
        }
        .nav {
          padding: 10px 0;
          position: absolute;
          width: 100%;
        }
        .navBarSection > div, .navBarSection > div > div {
          padding: 5px 10px;
          margin: 0 4px;
        }
        .homeNav {
          display: flex; 
        }
        .navItems {
          flex-grow: 1;
          flex-direction: row;
          display: flex;
        }
        .navButtons {
          display: flex;
          flex-direction: row;
        }
        .navButtons > div {
          border: 1px solid white;
          border-radius: 4px;
        }
        a {
          color: white;
          text-decoration: none;
          font-size: 13px;
        }
      }
    `}</style>
  </div>
)

export default Nav
