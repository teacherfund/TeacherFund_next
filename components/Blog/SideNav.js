import React from 'react'

function SideNav ({ blogSchools, selectedSchool, onSchoolSelected }) {
  return (
    <div className='side-nav-blog pa1'>
      {
        blogSchools.map((school) =>
          <a className='pa2 tc ttc' key={school} data-school={school} onClick={(event) => onSchoolSelected(event.target.getAttribute('data-school'))}>
            {school}
          </a>
        )
      }
    </div>
  )
}

export default SideNav
