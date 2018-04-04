import React from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import SideBar from "./SideBar"

const Place = ({ error, loading, place }) => {
  if (error) {
    return "An unexpected error occurred."
  }

  if (loading) {
    return "Loading..."
  }

  if (place) {
    return <SideBar>{JSON.stringify(place, null, 2)}</SideBar>
  }

  return null
}

export default graphql(
  gql`
    query($id: String!) {
      Place(id: $id) {
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
    options: ({ id }) => ({
      variables: { id },
    }),
    props: ({ data }) => ({
      error: data.error,
      loading: data.loading,
      place: data.Place,
    }),
  },
)(Place)
