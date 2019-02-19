import React from 'react'
import '../static/styles/main.scss'

// pull stats from API
const stats = [
  {
    stat: '4000',
    subtext: 'Dollars towards teacher supplies'
  },
  {
    stat: '4000',
    subtext: 'Dollars towards life readiment courses'
  },
  {
    stat: '4',
    subtext: 'Local partner schools'
  },
  {
    stat: '1269',
    subtext: 'Impacted children'
  }
]

const StatsTable = (props) => (
  <div className='statstable'>
    {stats.map(({ key, stat, subtext }) => (
      <div className='statstable--stat' key={key}>
        <p className='p40 statstable--stat--number'>{stat}</p>
        <p className='p40 statstable-stat--subtext'>{subtext}</p>
      </div>
    ))}
  </div>
)

export default StatsTable
