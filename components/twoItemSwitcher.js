import React from 'react'
import '../static/styles/main.scss'

const TwoItemSwitcher = (props) => (
  <div className='switcher'>
    <div className={`switcher__leftItem ${props.color} ${props.selectedToggle === 1 ? 'selected' : ''}`} onClick={props.switchOneClicked}>
      <label>{props.switchOneText.toUpperCase()}</label>
    </div>
    <div className={`switcher__rightItem ${props.color} ${props.selectedToggle === 2 ? 'selected' : ''}`} onClick={props.switchTwoClicked}>
      <label>{props.switchTwoText.toUpperCase()}</label>
    </div>
  </div>
)

export default TwoItemSwitcher
