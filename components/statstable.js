import React from 'react'
import '../static/styles/main.scss'

const stats = [
  {
    stat: '17',
    subtext: 'Local partner schools'
  },
  {
    stat: '>17000',
    subtext: 'Impacted children'
  }
].map((stat, idx) => {
  stat.key = `stat-${stat.stat}-${idx}`
  return stat
})

const StatsTable = (props) => (
  <div className='statstable--container'>
    <h2 className='statstable--title'>
      Our Progress
    </h2>
    <div className='statstable'>
      <div className='statstable--stat' key='stat-0-2'>
        <p className='p40 statstable--stat--number'>{1000 + props.context.globalAmountDonated}</p>
        <p className='p40 statstable-stat--subtext'>Dollars donated</p>
      </div>
      <div className='statstable--stat' key='stat-0-3'>
        <p className='p40 statstable--stat--number'>{props.context.globalAmountSpent}</p>
        <p className='p40 statstable-stat--subtext'>Dollars spent</p>
      </div>
      {stats.map(({ key, stat, subtext }) => (
        <div className='statstable--stat' key={key}>
          <p className='p40 statstable--stat--number'>{stat}</p>
          <p className='p40 statstable-stat--subtext'>{subtext}</p>
        </div>
      ))}
    </div>
  </div>
)

export default StatsTable
