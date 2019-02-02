import React from 'react'
import Link from 'next/link'

const SubsectionImportant = (props) => (
  <div className="subsectionImportant">
    <img src={props.image} className="backgroundImage"/>
    <div className="subsectionContent">
      <h2 className="titleText">
        {props.titleText}
      </h2>
    </div>
    <div className="descriptionText">
      {props.descriptionText}
    </div>

    <style jsx>{`
      .subsectionImportant {
        width: 80%; 
        padding: 10%;
      }
      .subsectionImportant > div {
        color: white;
        text-align: center;
      }
      .backgroundImage {
        width: 100%;
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

      @media only screen and (min-width: 600px) { 
        .subsection {
          margin: 20% 80px;
        }
      }
    `}</style>
  </div>
)

export default SubsectionImportant
