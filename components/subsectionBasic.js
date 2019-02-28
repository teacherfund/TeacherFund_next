import React from 'react'
import Link from 'next/link'
import '../static/styles/main.scss'

const SubsectionBasic = (props) => {
  const conditionallyShowButton = {
    display: !props.buttonText ? 'none' : 'block'
  }
  return (
    <div className='subsection'>
      <img src={props.image} className='backgroundImage' />
      <div className='subsectionText'>
        <h2 className='titleText'>
          {props.titleText}
        </h2>
        <div className='descriptionText'>
          {props.descriptionText}
        </div>
        <div style={conditionallyShowButton} className='button--subsection' onClick={props.actionHandler}>
          <Link href={props.destination}>
            <label className='ttu'>{props.buttonText}</label>
          </Link>
        </div>
      </div>
      <img src={props.image} className='sectionImage' />
    </div>
  )
}

export default SubsectionBasic
