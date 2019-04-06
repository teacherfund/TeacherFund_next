import Swiper from 'react-id-swiper'
import React from 'react'
import GPS from './icons/gps'
import Teacher from './icons/teacher'
import School from './icons/school'

class CustomSwiper extends React.Component {
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
      <div className='swiper_container'>
        <Swiper {...params}>
          <div className='slide'>
            <div className='slide-inner'>
              <div className='always-show'>
                <div className='slide--icon'>
                  <Teacher />
                </div>
                <h4 className='mission-title p40 pt-1 ttu'>Real Teachers</h4>
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
                <div className='slide--icon'>
                  <School />
                </div>
                <h4 className='mission-title p40 pt-1 ttu'>Local Schools</h4>
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
                <div className='slide--icon'>
                  <GPS />
                </div>
                <h4 className='mission-title p40 pt-1 ttu'>We prove every project</h4>
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
    )
  }
}

export default CustomSwiper
