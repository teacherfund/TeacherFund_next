import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import SubsectionBasic from '../components/subsectionBasic'
import SubsectionImportant from '../components/subsectionImportant'
import EmailCapture from '../components/emailCapture'

import Footer from '../components/footer'
import CustomSwiper from '../components/swiper'
import '../static/styles/main.scss'

const emailTitle = 'Help us change the world.'

class Home extends React.Component {
  static async getInitialProps ({ query }) {
    return { query }
  }

  componentDidMount () {
    const { email, auth } = this.props.query
    console.log('props', this.props)
    console.log(email, auth)
    if (email && auth) {
      this.props.helpers.handleVerify({ email, auth })
        .catch((e) => { console.error(e) })
    }
  }

  render () {
    return (
      <div className='main-container'>
        <Head title='Home' />
        <Nav navColor='white' loggedIn={this.props.context.loggedIn} />
        <div className='body'>
          <SubsectionBasic
            titleText='100% of your money brings school supplies and resources to teachers and students in need.'
            descriptionText='You can help aleviate economic pressure on public school teachers across
              the country. Every penny will help bring school supplies to schools in need and provide resources
              to allow children to pursue their passions.'
            buttonText='Give monthly'
            image='/static/images/apple-blur-book-stack.jpg'
            destination='donate'
          />
          <div className='emailCapture'>
            <h2 className='emailCapture--title'>
              {emailTitle}
            </h2>
            <EmailCapture />
          </div>

          <SubsectionImportant
            titleText='Ninety-four percent of public school teachers say they spent their own money on notebooks, pens and other supplies in the 2014-15 school year without reimbursement.'
            descriptionText="We're on a mission to change that. Here's how."
            image='/static/images/blur-child-classroom.jpg'>
            <CustomSwiper />
          </SubsectionImportant>
        </div>

        <Footer />
      </div>
    )
  }
}

export default Home
