import React from 'react'
import '../static/styles/main.scss'

const TFTable = (props) => (
  <div className='tfTable--container'>
    <h2 className='tfTable--title'>
      {props.title}
    </h2>
    <div className='tfTable--table'>
      {
        props.data[0] && Object.keys(props.data[0]).map((key) => (
          <div className='tfTable--row'>
            <span className='tfTable--row--span'><strong>{key}</strong></span>
          </div>
        ))
      }
      {
        props.data.map(({ key, type, name, amount, date }) => (
          <div className='tfTable--row'>
            <span className='tfTable--row--span'>{type}</span>
            <span className='tfTable--row--span'>{name}</span>
            <span className='tfTable--row--span'>{amount}</span>
            <span className='tfTable--row--span'>{date}</span>
          </div>
        ))
      }
    </div>
  </div>
)

export default TFTable
