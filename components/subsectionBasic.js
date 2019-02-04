import React from 'react'
import Link from 'next/link'

const SubsectionBasic = (props) => (
  <div className="subsection">
    <div className="subsectionText">
      <h2 className="titleText">
        {props.titleText}
      </h2>
      <div className="descriptionText">
        {props.descriptionText}
      </div>
      <div className="button" onClick={props.actionHandler}>
        <Link href={props.destination}>
          <label>{props.buttonText.toUpperCase()}</label>
        </Link>
      </div>
    </div>
    <img src={props.image} className="backgroundImage"/>

    <style jsx>{`
      .subsection {
        width: 100%;
        margin-top: 0;
        overflow: hidden;
      }
      .subsection > div {
        color: white;
        background-color: #434343;
      }
      .backgroundImage {
        width: 100%;
        z-index: -1;
      }
      .subsectionText {
        padding: 80px 5%;
        text-align: center;
      }

      @media only screen and (min-width: 800px) { 
        .subsectionText {
          width: 400px;
          padding: 15% 12%;
        }
        .backgroundImage {
          position: absolute;
        }
      }
    `}</style>
  </div>
)

export default SubsectionBasic
