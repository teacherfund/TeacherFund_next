// import React from 'react'
// import Nav from '../components/nav'
// import Footer from '../components/footer'
// import Head from '../components/head'
// import SubsectionImportant from '../components/subsectionImportant'
// import StatsTable from '../components/statstable'
// // import TFTable from '../components/tfTable'
// import MapGraphic from '../components/mapgraphic'
// import '../static/styles/main.scss'
// const APIKEY = process.env.GOOGLE_API_KEY

// const subsectionText = `We believe public school teachers don't
// receive the recognition they deserve. We're working to change that. Teacher Fund hopes to encourage students to pursue their
// passions while providing resources and support for STEM related fields.`

// class Ourwork extends React.Component {
//   render () {
//     return (
//       <div className='main-container'>
//         <Nav navColor='white' />
//         <Head title='Our Work' />

//         <div className='body'>
//           <SubsectionImportant
//             backgroundImageClasses='fade-wht full-height'
//             titleText='How we work'
//             image='/static/images/beakers.jpg'
//             descriptionText={subsectionText}
//           >
//             <StatsTable globalAmountDonated={this.props.context.globalAmountDonated} globalAmountSpent={this.props.context.globalAmountSpent} />
//             {/* <TFTable data={this.state.data} /> */}
//           </SubsectionImportant>

//           <div className='mapgraphic--container'>
//             <h2 className='white center pb-3'>Where we operate</h2>
//             <MapGraphic
//               isMarkerShown
//               googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${APIKEY}&callback=initMap`}
//               loadingElement={<div style={{ height: `100%` }} />}
//               containerElement={<div style={{ height: `400px` }} />}
//               mapElement={<div style={{ height: `100%` }} />}
//             />
//           </div>
//         </div>
//         <Footer />
//       </div>
//     )
//   }
// }

// export default Ourwork
