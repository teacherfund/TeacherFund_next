import React from 'react'
import '../static/styles/main.scss'

const stats = [
  {},
  {},
  {},
  {}
]

const StatsTable = (props) => (
  <div className='statstable'>
    {stats.map(({ key, title, subtext }) => (
      <div className='stat'>
        <p className='p40 title'>

        </p>
        <p className='p40 description'>
        </p>
      </div>
    ))}
  </div>
)

export default StatsTable
