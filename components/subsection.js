import React from 'react'

const Subsection = (props) => (
  <div className="subsection">
    <img src={props.image} className="backgroundImage"/>
    <div className="subsectionText">
      <h2 className="titleText">
        {props.titleText}
      </h2>
      <div className="descriptionText">
        {props.descriptionText}
      </div>
      <div className="button">
        <label>{props.buttonText.toUpperCase()}</label>
      </div>
    </div>

    <style jsx>{`
      .subsection {
        width: 100%; 
      }
      .subsection > div {
        color: white;
      }
      .backgroundImage {
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
        .subsectionText {
          width: 400px;
        }
        .subsection {
          margin: 80px 80px;
        }
      }
    `}</style>
  </div>
)

export default Subsection
