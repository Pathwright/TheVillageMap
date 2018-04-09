import React from "react"
import styled from "styled-components"
import { Button } from "./ui"

const Box = styled.div`
  padding: 20px;
  background-color: #303541;
  color: white;

  a {
    padding: 3px;
  }

  h2 {
    margin: 0;
    font-weight: normal;
  }

  footer {
    display: flex;
    align-items: baseline;
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

const NewPlace = ({ latLng, onClose, onSubmit }) => {
  let formUrl = "/suggest"
  formUrl += "?prefill_Latitude=" + latLng.lat()
  formUrl += "&prefill_Longitude=" + latLng.lng()

  const handleSelectNewPlace = e => {
    e.preventDefault()
    e.stopPropagation()
    onSubmit(formUrl)
    onClose()
  }

  return (
    <Box>
      <Circle />
      <h2 style={{ marginBottom: 10 }}>Submit a story for this location?</h2>
      <footer>
        <Button onClick={handleSelectNewPlace}>Yes</Button>
        <a
          href="#"
          onClick={onClose}
          style={{ color: "rgba(255,255,255,.6)", marginLeft: 10 }}
        >
          Cancel
        </a>
      </footer>
    </Box>
  )
}

export default NewPlace
