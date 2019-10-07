import React from 'react'

const TeamMember = (props) =>
  (
    <li className='bg-white z-1 ma4-l w-50-m w-25-l w-80'>
      <div className='w-100 bg-transparent pa4-l'>
        <div className='pa2-l tc'>
          <div className='center br-100 ba b--black-05 ma3 h4 w4 bg-white overflow-hidden'>
            <img src={'/static/images/people/' + props.src} alt='' />
          </div>
          <h3 className='tf-oswald ts-subtext pv2 tc mv0'>
            {props.name}
          </h3>
          <p className='tf-lato-lite ts-subtext pt2 tc mv0'>
            {props.bio}
          </p>
        </div>
      </div>
    </li>
  )

export default TeamMember
