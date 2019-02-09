import React from 'react'
import Link from 'next/link'
import '../static/styles/main.scss'

const SubsectionBasic = (props) => (
  <div className="subsection">
    <img src={props.image} className="backgroundImage"/>
    <div className="subsectionText">
      <h2 className="titleText">
        {props.titleText}
      </h2>
      <div className="descriptionText">
        {props.descriptionText}
      </div>
      <div className="button--subsection" onClick={props.actionHandler}>
        <Link href={props.destination}>
          <label>{props.buttonText.toUpperCase()}</label>
        </Link>
      </div>
    </div>
    <img src={props.image} className="sectionImage"/>
  </div>
)

export default SubsectionBasic
