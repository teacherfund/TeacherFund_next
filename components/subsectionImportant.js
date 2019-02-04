import React from 'react'
import Link from 'next/link'

const SubsectionImportant = (props) => (
  <div className="subsectionImportant">
    <div className="subsectionContent">
      <h2 className="titleText">
        {props.titleText}
      </h2>
      <div className="descriptionText">
        {props.descriptionText}
      </div>
    </div>
    <img src={props.image} className="backgroundImage"/>

    <style jsx>{`
      .subsectionImportant {
        width: 100%; 
        overflow: hidden;
      }
      .subsectionImportant > div {
        color: white;
        text-align: center;
        padding: 80px 5%;
        background-color: #434343;
      }
      .backgroundImage {
        width: 100%;
        z-index: -1;
      }
      .titleText {
        width: 100%;
      }

      @media only screen and (min-width: 800px) { 
        .backgroundImage {
          position: absolute;
        }
      }
    `}</style>
  </div>
)

export default SubsectionImportant
