import React from 'react'
import '../static/styles/main.scss'

class SubsectionImportant extends React.Component {
  render () {
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
        {this.props.children}
      </div>
    )
  }
}

export default SubsectionImportant
