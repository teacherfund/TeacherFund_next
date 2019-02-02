import React from 'react'
import Link from 'next/link'

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
      <div className="button" onClick={props.actionHandler}>
        <Link href={props.destination}>
          <label>{props.buttonText.toUpperCase()}</label>
        </Link>
      </div>
    </div>

    <style jsx>{`
      .subsection {
        width: 100%;
        margin-top: 0;
      }
      .subsection > div {
        color: white;
      }
      .backgroundImage {
        width: 100%;
        position: absolute;
        z-index: -1;
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
        .subsectionText {
          width: 400px;
          padding: 15% 12%;
        }
        .subsection {
          
        }
      }
    `}</style>
  </div>
)

export default SubsectionBasic
