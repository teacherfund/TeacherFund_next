import React from 'react'
import '../static/styles/main.scss'

const TwoItemSwitcher = (props) => (
  <div className='flex flex-row tf-lato justify-between ma1'>
    <div className={`w-100 h2 tc mt1 br--left br2 flex flex-column justify-center ${props.color} ${props.selectedToggle === 1 ? 'tf-dark-gray bg-white' : 'bg-tf-yellow white'}`} onClick={props.switchOneClicked}>
      <label className='ttu v-mid'>{props.switchOneText}</label>
    </div>
    <div className={`w-100 h2 tc mt1 br--right br2 flex flex-column justify-center ${props.color} ${props.selectedToggle === 2 ? 'tf-dark-gray bg-white' : 'bg-tf-yellow white'}`} onClick={props.switchTwoClicked}>
      <label className='ttu v-mid'>{props.switchTwoText}</label>
    </div>
  </div>
)

export default TwoItemSwitcher
