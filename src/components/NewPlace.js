import React from "react"
import styled from "styled-components"

const Box = styled.div`
  padding: 10px;
  background-color: #303541;
  color: white;

  h2 {
    margin: 0;
    font-weight: normal;
  }

  footer {
    display: flex;
    align-items: baseline;

    a {
      margin-right: 10px;
      color: white;
      font-size: 16px;
    }
  }
`

const Circle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  transform: translate3d(-100%, -100%, 0);
  border-radius: 100%;
  border: 3px solid #303541;
`

const NewPlace = ({ latLng, onClose }) => {
  let formUrl = "https://airtable.com/shrFV5fChBDr5FDxB"
  formUrl += "?prefill_Latitude=" + latLng.lat()
  formUrl += "&prefill_Longitude=" + latLng.lng()

  return (
    <Box>
      <Circle />
      <h2>Submit a story for this location?</h2>
      <footer>
        <a target="_blank" href={formUrl}>
          Yes
        </a>
        <a href="javascript:void()" onClick={onClose}>
          Cancel
        </a>
      </footer>
    </Box>
  )
}

export default NewPlace
