import React from "react"
import styled from "styled-components"

const Box = styled.div`
  background: white;
  padding: 20;
  width: 300px;
`

const NewPlace = ({ latLng, onClose }) => {
  let formUrl = "https://airtable.com/shrFV5fChBDr5FDxB"
  formUrl += "?prefill_Latitude=" + latLng.lat()
  formUrl += "&prefill_Longitude=" + latLng.lng()

  return (
    <Box>
      <h1>Do you want to suggest a new place to feature?</h1>
      <a target="_blank" href={formUrl}>
        Yes
      </a>
      <button onClick={onClose}>No</button>
    </Box>
  )
}

export default NewPlace
