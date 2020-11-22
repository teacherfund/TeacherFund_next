import React from 'react'
import { Flex, Link } from '@chakra-ui/core'

function SideNav ({ schools, selectedSchool, onSchoolSelected }) {
  return (
    <Flex
      flexDirection='column'
      width='20rem'
      alignItems='center'
      position='fixed'
      display={{ base: 'none', lg: 'inherit' }}
      padding='2rem'
      top='15rem'
      left='4rem'
    >
      {
        schools.map((school) => {
          const isCurrentSchoolSelected = school === selectedSchool
          const className = `${isCurrentSchoolSelected
            ? 'blog-side-nav-school-selected'
            : 'blog-side-nav-school-non-selected'} pa2 tc ttc mb1`
          return (
            <Link className={className} width='100%' key={school} onClick={() => onSchoolSelected(school)}>
              {school}
            </Link>
          )
        })
      }
    </Flex>
  )
}

export default SideNav
