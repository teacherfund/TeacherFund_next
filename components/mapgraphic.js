import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const MapGraphic = withScriptjs(withGoogleMap((props) => (
  <div className='mapgraphic'>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 47.673, lng: -116.781 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: 47.673, lng: -116.781 }} />}
    </GoogleMap>
  </div>
)))

export default MapGraphic
