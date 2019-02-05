import React from 'react'
import Link from 'next/link'
import '../static/styles/main.scss'

const SubsectionImportant = (props) => (
  <div className="subsectionImportant">
    <img src={props.image} className="backgroundImage"/>
    <div className="subsectionContent">
      <h2 className="titleText">
        {props.titleText}
      </h2>
      <div className="descriptionText">
        {props.descriptionText}
      </div>
    </div>
    <img src={props.image} className="sectionImage"/>
  </div>
)

export default SubsectionImportant
