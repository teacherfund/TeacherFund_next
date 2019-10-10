import React from 'react'
import './blog.scss'

function SideNav ({ blogCountries, selectedCountry, onCountrySelected }) {
  return (
    <div className='side-nav-blog'>
      {
        blogCountries.map((country) =>
          <a key={country} data-country={country} onClick={(event) => onCountrySelected(event.target.getAttribute('data-country'))}>
            {country}
          </a>
        )
      }
    </div>
  )
}

export default SideNav
