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

    <style jsx>{`
      .subsectionImportant {
        width: 100%; 
        overflow: hidden;
      }
      .subsectionImportant > div {
        color: white;
        text-align: center;
        padding: 10% 20% 30% 20%;
      }
      .backgroundImage {
        width: 100%;
        position: absolute;
        z-index: -1;
      }
      .titleText {
        width: 100%;
      }
      .button {
        padding: 10px 10px;
        margin: 30px 0;
        border-radius: 4px;
        width: auto;
        display: inline-flex;
        background-color: #F6B333
      }

      @media only screen and (min-width: 800px) { 
        
      }
    `}</style>
  </div>
)

export default SubsectionImportant
