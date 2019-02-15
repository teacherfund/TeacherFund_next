import React from 'react'
import '../static/styles/main.scss'
import Swiper from 'react-id-swiper'

class SubsectionImportant extends React.Component {
  render () {
    const params = {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      initialSlide: 1,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }
    }
    return (
      <div className='subsectionImportant'>
        <img src={this.props.image} className='backgroundImage' />
        <div className='subsectionContent'>
          <h2 className='titleText'>
            {this.props.titleText}
          </h2>
          <div className='descriptionText'>
            {this.props.descriptionText}
          </div>
        </div>
        <img src={this.props.image} className='sectionImage' />
        <div className='swiper_container'>
          <Swiper {...params}>
            <div className='slide'>
              <div className='slide-inner'>
                <div className='always-show'>
                  <h4 className='mission-title p40 pt-1'>{'Real Teachers'.toUpperCase()}</h4>
                </div>
                <div className='show-only-when-active'>
                  <p className='mission-description  pt-1 pb-1 p40'>
                    The teachers we support have all earned the highest merits, and we believe in
                    rewarding hard work and dedication that profoundly impacts students.
                  </p>
                </div>
              </div>
            </div>
            <div className='slide'>
              <div className='slide-inner'>
                <div className='always-show'>
                  <h4 className='mission-title p40 pt-1'>{'Local Schools'.toUpperCase()}</h4>
                </div>
                <div className='show-only-when-active'>
                  <p className='mission-description  pt-1 pb-1 p40'>
                    We partner with local schools we have connections with to ensure we're providing exactly
                    what's needed to the teachers who need it.
                  </p>
                </div>
              </div>
            </div>
            <div className='slide'>
              <div className='slide-inner'>
                <div className='always-show'>
                  <h4 className='mission-title p40 pt-1'>{'We prove every project'.toUpperCase()}</h4>
                </div>
                <div className='show-only-when-active'>
                  <p className='mission-description pt-1 pb-1 p40'>
                    We prove and monitor the projects you fund with GPS so you can
                    see the direct impact your dollars have on classrooms.
                  </p>
                </div>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    )
  }
}

export default SubsectionImportant
