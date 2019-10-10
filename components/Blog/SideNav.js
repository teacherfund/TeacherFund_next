import React from 'react'
import './blog.scss'

function SideNav ({ blogSchools, selectedSchool, onSchoolSelected }) {
  return (
    <div className='side-nav-blog'>
      {
        blogSchools.map((school) =>
          <a key={school} data-school={school} onClick={(event) => onSchoolSelected(event.target.getAttribute('data-school'))}>
            {school}
          </a>
        )
      }
    </div>
  )
}

export default SideNav
