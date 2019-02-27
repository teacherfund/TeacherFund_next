import Nav from '../components/nav'
import Footer from '../components/footer'
import Head from '../components/head'
import SubsectionImportant from '../components/subsectionImportant'
import StatsTable from '../components/statstable'
import MapGraphic from '../components/mapgraphic'
import '../static/styles/main.scss'

const Ourwork = () => (
  <div className='main-container'>
    <Nav navColor='white' />
    <Head title='Our Work' />

    <div className='body'>
      <SubsectionImportant
        backgroundImageClasses='fade-wht'
        titleText='How we work'
        image='./static/images/beakers.jpg'
        descriptionText="We believe public school teachers don't receive the recognition they deserve. We're working to change that."
      >
        <StatsTable />
      </SubsectionImportant>

      <div className='mapgraphic--container'>
        <MapGraphic
          isMarkerShown
          googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
    <Footer />
  </div>
)

export default Ourwork
