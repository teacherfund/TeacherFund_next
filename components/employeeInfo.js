import React from 'react'
import '../static/styles/main.scss'

const EmployeeInfo = (props) => (
  <div key={props.name} className='employee--container'>
    <div className='employee--image'>
      <img className='employee--image--img' src={props.image} />
    </div>
    <div className='employee--text'>
      <div className='employee--name ttu'>
        {props.name}
      </div>
      <div className='employee--description p40 pt-1 pb-1'>
        {props.description}
      </div>
    </div>
  </div>
)

export default EmployeeInfo
