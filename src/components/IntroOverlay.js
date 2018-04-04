import React from "react"
import styled from "styled-components"

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 50px 20px;
`

const IntroOverlay = ({ onClose }) => {
  return (
    <Modal>
      <h1>The Village Map</h1>
      <button onClick={onClose}>Enter Site</button>
    </Modal>
  )
}

export default IntroOverlay
