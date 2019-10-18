import React from 'react'

const TeamMember = (props) =>
  (
    <li className='bg-white mv3 ma2-m ma4-l w-80 w-30-m w-25-l pa3 ph0-ns'>
      <div className='w-100 bg-transparent pa4-l'>
        <div className='pa2-l tc'>
          <div className='center br-100 ba b--black-05 ma3 h4 h3-m w4 w3-m bg-white overflow-hidden'>
            <img src={'/static/images/people/' + props.src} alt='' />
          </div>
          <h3 className='tf-lato ts-subtext f4 pv2 tc ma0'>
            {props.name}
          </h3>
          <h4 className='tf-lato-lite ma0 f3-l'>
            {props.title}
          </h4>
          <p className='tf-lato-lite f4-l tc f5 ma3-m pb2 pa2-ns lh-title'>
            {props.bio}
          </p>
        </div>
      </div>
    </li>
  )

export default TeamMember
