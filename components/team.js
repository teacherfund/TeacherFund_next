import React from 'react'
import TeamMember from './teamMember'

const teamMembers = [
  {
    name: 'Joel Wasserman',
    src: 'joel.jpg',
    bio: `A software engineer at Google, Joel formerly worked
          at two education startups and is passionate about public education and technology.`
  },
  {
    name: 'Christine Woeller',
    src: 'christine.jpeg',
    bio: `With a degree in secondary education, Christine seeks to improve public schools
          and ensure teachers have the best resources available.`
  },
  {
    name: 'Peter Squicciarini',
    src: 'pete.jpeg',
    bio: ` A software developer at Amazon and loving father of two, Peter strives to
          help all children and teachers succeed in an educational environment.`
  }
]

const Team = (props) =>
  (
    <section className='h-section mb5 mb0-ns pb5-ns bg-card'>
      <div className='flex flex-column z-100'>
        <div className='bg-tf-gray o-10 dn db-ns dn-m h-section w-100 absolute' />
        <h2 className='f1-l f2-m mv3-m tf-oswald center'>
        Meet the Team
        </h2>
        <ul className='list flex flex-row flex-wrap justify-center w-auto mt3 mb0 pv0 ph0 center'>
          {teamMembers.map(member =>
            <TeamMember name={member.name} src={member.src} bio={member.bio} />)
          }
        </ul>
      </div>
    </section>
  )

export default Team
