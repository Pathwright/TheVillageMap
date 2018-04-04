import React from "react"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"
import { compose } from "react-apollo"
import mapStyles from "../map-styles.json"
import { VILLAGE_MAP_CENTER } from "../constants"

const Map = ({ places = [], onSelectPlace }) => {
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={VILLAGE_MAP_CENTER}
      defaultOptions={{ styles: mapStyles, disableDefaultUI: true }}>
      {places.map(place => (
        <Marker
          key={place.id}
          position={{
            lat: Number(place.latitude),
            lng: Number(place.longitude),
          }}
          onClick={() => onSelectPlace(place)}
        />
      ))}
    </GoogleMap>
  )
}

const ConnectedMap = compose(withScriptjs, withGoogleMap)(Map)

ConnectedMap.defaultProps = {
  googleMapURL:
    "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing",
  containerElement: <div style={{ height: `100vh` }} />,
  loadingElement: <div style={{ height: `100%` }} />,
  mapElement: <div style={{ height: `100%` }} />,
}

export default ConnectedMap
