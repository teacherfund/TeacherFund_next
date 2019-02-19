import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import '../static/styles/main.scss'

const MapGraphic = withScriptjs(withGoogleMap((props) => (
  <div className='mapgraphic'>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
  </div>
)))

export default MapGraphic
