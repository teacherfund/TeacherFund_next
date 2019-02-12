import React from 'react'
import '../static/styles/main.scss'
import Swiper from 'react-id-swiper';

class SubsectionImportant extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    const params = {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 3,
      initialSlide: 1,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true,
      }
    }
    return (
      <div className="subsectionImportant">
        <img src={this.props.image} className="backgroundImage"/>
        <div className="subsectionContent">
          <h2 className="titleText">
            {this.props.titleText}
          </h2>
          <div className="descriptionText">
            {this.props.descriptionText}
          </div>
        </div>
        <div className="swiper_container">
          <Swiper {...params}>
            <div className="slide">Slide 1</div>
            <div className="slide">Slide 2</div>
            <div className="slide">Slide 3</div>
          </Swiper>
        </div>
        <img src={this.props.image} className="sectionImage"/>
      </div>
    )
  }
} 

export default SubsectionImportant
