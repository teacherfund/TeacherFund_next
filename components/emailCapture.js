import React from 'react'

const EmailCapture = (props) => (
  <div className="emailCapture">
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
      .emailCapture {
        display: flex;
        flex-direction: row;
        margin: 20% 80px;
      }
      .captureInput {
        flex: 1;
        margin-right: 11px;
      }
      .captureButton {
        margin: 0 10px;
        padding: 10px 10px;
        border-radius: 4px;
        color: white;
        display: inline-flex;
        background-color: #F6B333
      }
      .captureInput > input {
        text-decoration: none;
        width: 100%;
        font-size: 16px;
        border-radius: 4px;
        padding: 10px 10px;
        border: 1px solid #95A4A6;
      }
      .firstNameCapture {

      }
      .lastNameCapture {

      }
      @media only screen and (min-width: 600px) { 

      }
    `}</style>
  </div>
)

export default EmailCapture
