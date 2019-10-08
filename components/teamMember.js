import React from 'react'

const TeamMember = (props) =>
  (
    <li className='bg-white z-1 ma3 ma0-m ma4-l ma3-m w-25-ns w-80 pa3 ph0-ns'>
      <div className='w-100 bg-transparent pa4-l'>
        <div className='pa2-l tc'>
          <div className='center br-100 ba b--black-05 ma3 h4 h3-m w4 w3-m bg-white overflow-hidden'>
            <img src={'/static/images/people/' + props.src} alt='' />
          </div>
          <h3 className='tf-lato f3-l f4 pv2 tc ma0'>
            {props.name}
          </h3>
          <h4 className='tf-lato-lite ma0 f4-l'>
            {props.title}
          </h4>
          <p className='tf-lato-lite f3-l tc f5 ma3-m pa2 lh-title'>
            {props.bio}
          </p>
        </div>
      </div>
    </li>
  )

export default TeamMember
