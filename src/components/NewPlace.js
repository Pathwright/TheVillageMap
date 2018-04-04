import React from "react"
import styled from "styled-components"

const Box = styled.div`
  background: white;
  padding: 20;
`

const NewPlace = ({ latLng, onClose }) => {
  return (
    <Box>
      <h1>Do you want to suggest a new place to feature?</h1>
      <button>Yes</button>
      <button onClick={onClose}>No</button>
    </Box>
  )
}

export default NewPlace
