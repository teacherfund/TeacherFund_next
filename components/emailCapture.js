import React from 'react'

const EmailCapture = (props) => (
  <div className="emailCaptureContent">
    <div className="captureInput">
      <input placeholder="First name" />
    </div>
    <div className="captureInput">
      <input placeholder="Last name" />
    </div>
    <div className="captureInput">
      <input placeholder="Email" />
    </div>
    <div className="captureButton">
      <label>{'Sign up'.toUpperCase()}</label>
    </div>
    <style jsx>{`
      .emailCaptureContent {
        display: flex;
        flex-direction: column;
        margin-right: 4%;
        margin-left: 4%;
        border-radius: 5px;
      }
      .captureInput {
        display: flex;
        flex-grow: 1;
      }
      .captureButton {
        margin:0;
        padding: 10px 10px;
        color: white;
        justify-content: center;
        display: inline-flex;
        background-color: #F6B333;
      }
      .captureInput > input {
        display: flex;
        flex-grow: 1;
        text-decoration: none;
        font-size: 16px;
        padding: 10px 0 10px 10px;
        border: 0;
        border-right: 1px solid #95A4A6;
      }
      input {
        
      }
      .firstNameCapture {

      }
      .lastNameCapture {

      }
      @media only screen and (min-width: 600px) { 
        .emailCaptureContent {
          display: flex;
          flex-direction: row;
          max-width: 900px;
          margin-right: auto;
          margin-left: auto;
          border-radius: 5px;
        }
        .captureButton {
          justify-content: left;
        }
      }
    `}</style>
  </div>
)

export default EmailCapture
