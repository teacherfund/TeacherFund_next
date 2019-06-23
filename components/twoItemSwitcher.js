import React from 'react'
import '../static/styles/main.scss'

const TwoItemSwitcher = (props) => (
  <div className='flex flex-row tf-lato justify-between ma1'>
    <div className={`w-100 h2 tc mt1 bn ba b--black flex flex-column justify-center ${props.selectedToggle === 1 ? 'bg-tf-yellow white' : 'tf-dark-gray bg-white pointer'}`} onClick={props.switchOneClicked}>
      <label className={`ttu v-mid ${props.selectedToggle === 1 ? '' : 'pointer'}`}>{props.switchOneText}</label>
    </div>
    <div className={`w-100 h2 tc mt1 bn ba b--black flex flex-column justify-center ${props.selectedToggle === 2 ? 'bg-tf-yellow white' : 'tf-dark-gray bg-white pointer'}`} onClick={props.switchTwoClicked}>
      <label className={`ttu v-mid ${props.selectedToggle === 2 ? '' : 'pointer'}`}>{props.switchTwoText}</label>
    </div>
  </div>
)

export default TwoItemSwitcher
