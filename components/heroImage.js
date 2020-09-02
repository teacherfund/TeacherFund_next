import React from 'react'

class HeroImage extends React.Component {
  render () {
    return (
      <section className='index__header h-section pv7 ph2 pr7-l cover-l'>
        <div className='fr flex flex-column mt5 ml6-l mt0-l w-90-m'>
          <div className='white f2 tf-oswald fl ml-4-l f-5-l'>
            Funding Teachers.<br />
            Empowering Students.
          </div>
          <div className='ts-subtext fl tf-lato-lite white'>
            <p>We provide funding to classrooms so teachers don't have to.</p>
          </div>
        </div>
      </section>
    )
  }
}

export default HeroImage
