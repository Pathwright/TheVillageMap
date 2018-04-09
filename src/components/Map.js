/*global google:true*/
/*eslint no-undef: "error"*/

import React from "react"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
  OverlayView
} from "react-google-maps"
import gql from "graphql-tag"
import { compose, graphql } from "react-apollo"
import { withRouter } from "react-router-dom"
import mapStyles from "../map-styles.json"
import NewPlace from "./NewPlace"
import { GOOGLE_MAPS_API_KEY, VILLAGE_MAP_CENTER } from "../constants"

class Map extends React.Component {
  state = {
    suggestingLatLng: null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activePlaceId) {
      if (
        nextProps.activePlaceId !== this.props.activePlaceId ||
        nextProps.places.length !== this.props.places.length
      ) {
        const place = nextProps.places.find(
          p => p.id === nextProps.activePlaceId
        )
        if (place) {
          this.map.panTo({
            lat: Number(place.latitude),
            lng: Number(place.longitude)
          })
        }
      }
    } else {
      this.map.panTo(VILLAGE_MAP_CENTER)
    }
  }

  render() {
    const { activePlaceId } = this.props

    const places = activePlaceId
      ? this.props.places.filter(p => p.id === activePlaceId)
      : this.props.places
    return (
      <div>
        <GoogleMap
          ref={m => (this.map = m)}
          defaultZoom={15}
          onClick={({ latLng }) => this.setState({ suggestingLatLng: latLng })}
          defaultCenter={VILLAGE_MAP_CENTER}
          defaultOptions={{ styles: mapStyles, disableDefaultUI: true }}
        >
          {places.map(place => (
            <Marker
              key={place.id}
              onClick={e => {
                this.setState({ suggestingLatLng: null })
                this.props.onSelectPlace(`/p/${place.id}`)
              }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillOpacity: 1.0,
                fillColor: "#97cc68",
                strokeOpacity: 1.0,
                strokeColor: "#303541",
                strokeWeight: 3.0,
                scale: 10.0
              }}
              position={{
                lat: Number(place.latitude),
                lng: Number(place.longitude)
              }}
            />
          ))}
          {this.state.suggestingLatLng && (
            <OverlayView
              position={this.state.suggestingLatLng}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <NewPlace
                latLng={this.state.suggestingLatLng}
                onSubmit={formUrl => this.props.onSubmitPlace(formUrl)}
                onClose={() => this.setState({ suggestingLatLng: null })}
              />
            </OverlayView>
          )}
        </GoogleMap>
      </div>
    )
  }
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
      places: data.Places || []
    })
  }
)

const ConnectedMap = compose(withPlaces, withScriptjs, withGoogleMap)(Map)

ConnectedMap.defaultProps = {
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing`,
  containerElement: <div style={{ height: `100vh`, width: "100%" }} />,
  loadingElement: <div style={{ height: `100%`, width: "100%" }} />,
  mapElement: <div style={{ height: `100%`, width: "100%" }} />
}

export default ConnectedMap
