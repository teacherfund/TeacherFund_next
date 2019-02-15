import Nav from '../components/nav'
import Footer from '../components/footer'
import Head from '../components/head'
import '../static/styles/main.scss'

const About = () => (
  <div className='main-container'>
    <Nav />
    <Head title='About' />

    <div className='body'>
      <h1>About Us</h1>
      <div className='description' />
    </div>
    <Footer />
  </div>
)

export default About
