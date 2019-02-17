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
        <p className='p40 title' />
        <p className='p40 description' />
      </div>
    ))}
  </div>
)

export default StatsTable
