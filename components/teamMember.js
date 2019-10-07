import React from 'react'

const TeamMember = (props) =>
  (
  <li className='bg-white z-1 ma4-l ma3-m w-25-ns w-80'>
    <div className='w-100 bg-transparent pa4-l'>
      <div className='pa2-l tc'>
        <div className='center br-100 ba b--black-05 ma3 h4 h3-m w4 w3-m bg-white overflow-hidden'>
          <img src={'/static/images/people/' + props.src} alt='' />
        </div>
        <h3 className='tf-oswald f3-l f4-m pv2 tc'>
          {props.name}
        </h3>
        <p className='tf-lato-lite f3-l pt2 tc f5-m ma3-m'>
          {props.bio}
        </p>
      </div>
    </div>
  </li>
  )

  

export default TeamMember
