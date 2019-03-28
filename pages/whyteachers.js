import Nav from '../components/nav'
import Footer from '../components/footer'
import Head from '../components/head'
import SubsectionImportant from '../components/subsectionImportant'
import StatsTable from '../components/statstable'
import '../static/styles/main.scss'

const Whyteachers = () => (
  <div className='main-container'>
    <Nav navColor='white' />
    <Head title='Our Work' />

    <div className='body'>
      <SubsectionImportant
        backgroundImageClasses='fade-wht full-height'
        titleText='How we work'
        image='/static/images/beakers.jpg'
        descriptionText="We believe public school teachers don't receive the recognition they deserve. We're working to change that."
      >
        <StatsTable />
      </SubsectionImportant>
    </div>
    <Footer />
  </div>
)

export default Whyteachers
