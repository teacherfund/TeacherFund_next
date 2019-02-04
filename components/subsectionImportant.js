import React from 'react'
import Link from 'next/link'

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
        display: none;
      }
      .titleText {
        width: 100%;
      }
      .sectionImage {
        width: 100%;
        z-index: -1;
      }

      @media only screen and (min-width: 800px) { 
        .backgroundImage {
          position: absolute;
          display: block;
          width: 100%;
          z-index: -1;
        }
        .subsectionImportant > div {
          background-color: transparent;
          height: 400px;
          padding: 20px 5%;
        }
        .sectionImage {
          display: none;
        }
      }
    `}</style>
  </div>
)

export default SubsectionImportant
