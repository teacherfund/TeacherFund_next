import Nav from '../components/nav'
import Footer from '../components/footer'
import Head from '../components/head'
import SubsectionImportant from '../components/subsectionImportant'
import '../static/styles/main.scss'

const Ourwork = () => (
  <div className='main-container'>
    <Nav />
    <Head title='Our Work' />

    <div className='body'>
      <div className='description' />
      <SubsectionImportant
        titleText='How we work'
        descriptionText="We believe public school teachers don't receive the recognition they deserve. We're working to change that."
      />
    </div>
    <Footer />
  </div>
)

export default Ourwork
