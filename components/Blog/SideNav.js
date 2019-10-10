import React from 'react'

function SideNav ({ schools, selectedSchool, onSchoolSelected }) {
  return (
    <div className='side-nav-blog flex flex-column w-40 self-center pa2'>
      {
        schools.map((school) => {
          const isCurrentSchoolSelected = school === selectedSchool
          const className = `${isCurrentSchoolSelected ? 'selected-school' : ''} pa2 tc ttc mb1 bg-card`
          return (
            <a className={className} key={school} data-school={school} onClick={(event) => onSchoolSelected(event.target.getAttribute('data-school'))}>
              {school}
            </a>
          )
        })
      }
    </div>
  )
}

export default SideNav
