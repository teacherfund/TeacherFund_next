import React from 'react'

const Subsection = (props) => (
  <div className="subsection">
    <img src={props.image} className="backgroundImage"/>
    <div>
      <div className="titleText">
        {props.titleText}
      </div>
      <div className="descriptionText">
        {props.descriptionText}
      </div>
    </div>
    <div className="button">
      <label></label>
    </div>

    <style jsx>{`
      .subsection {
        
      }
      .subsection > div {
        color: white;
      }
      .backgroundImage {

      }
      .titleText {

      }
      .descriptionText {

      }

      @media only screen and (min-width: 600px) { 
        .subsection {
          margin: 10% 10%;
        }
      }
    `}</style>
  </div>
)

export default Subsection
