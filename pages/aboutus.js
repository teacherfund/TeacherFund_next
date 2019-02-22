import Nav from '../components/nav'
import Footer from '../components/footer'
import Head from '../components/head'
import '../static/styles/main.scss'

const About = () => (
  <div className='main-container'>
    <Nav navColor='black' />
    <Head title='About' />

    <div className='body'>
      <div className='mission'>
        <div className='mission--header'>
          Our Mission
        </div>
        <div className='mission--body'>
          The Teacher Fund is a non-profit organization 
          bringing school supplies and supplemental 
          funding to public school teachers.
        </div>
      </div>
      <div className='factcards'>

      </div>
      <div className='us'>

      </div>
    </div>
    <Footer />
  </div>
)

export default About
