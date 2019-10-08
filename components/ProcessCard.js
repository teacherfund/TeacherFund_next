import 'react'

export default function ProcessCard ({ title, children, icon }) {
  return (
    <div className='ma3 ma3-m w-25-m w-25-l'>
      <div className='w-100 pa3 pt3-m bg-card h5-25'>
        <div className='pa2 tc'>
          <div className='center br-100 pa4 pa2-m ba b--black-05 mb2 ma3-m h4 h3-m w4 w3-m bg-white'>
            {icon}
          </div>
          <div className='tf-oswald f3-l f4-m pv2 tc'>{title}</div>
          <div className='tf-lato-lite f3-l pt2 tc f5-m'>{children}</div>
        </div>
      </div>
    </div>
  )
}
