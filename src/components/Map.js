import React from "react"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"
import gql from "graphql-tag"
import { compose, graphql } from "react-apollo"
import { withRouter } from "react-router-dom"
import mapStyles from "../map-styles.json"
import { GOOGLE_MAPS_API_KEY, VILLAGE_MAP_CENTER } from "../constants"

const Map = ({ places, history }) => {
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={VILLAGE_MAP_CENTER}
      defaultOptions={{ styles: mapStyles, disableDefaultUI: true }}>
      {places.map(place => (
        <Marker
          key={place.id}
          onClick={() => history.push(`/p/${place.id}`)}
          position={{
            lat: Number(place.latitude),
            lng: Number(place.longitude),
          }}
        />
      ))}
    </GoogleMap>
  )
}

const withPlaces = graphql(
  gql`
    query {
      Places {
        name
        id
        address
        latitude
        longitude
        stories {
          title
          story
        }
      }
    }
  `,
  {
    props: ({ data }) => ({
      places: data.Places || [],
    }),
  },
)

const ConnectedMap = compose(withPlaces, withScriptjs, withGoogleMap)(Map)

ConnectedMap.defaultProps = {
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing`,
  containerElement: <div style={{ height: `100vh` }} />,
  loadingElement: <div style={{ height: `100%` }} />,
  mapElement: <div style={{ height: `100%` }} />,
}

export default ConnectedMap
