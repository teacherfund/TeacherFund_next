import React from 'react'
import '../static/styles/main.scss'

const EmailCapture = (props) => (
  <div className='email-capture__content'>
    <div className='email-capture__input'>
      <input placeholder='First name' />
    </div>
    <div className='email-capture__input'>
      <input placeholder='Last name' />
    </div>
    <div className='email-capture__input'>
      <input placeholder='Email' />
    </div>
    <div className='email-capture__button'>
      <label className='ttu'>Get our emails</label>
    </div>
  </div>
)

export default EmailCapture
