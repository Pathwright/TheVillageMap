import React from "react"
import styled from "styled-components"
import { Button } from "./ui"

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  padding: 50px 20px;
  background-color: rgba(48, 53, 65, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  background-color: #3c424f;
  padding: 40px;

  p {
    font-size: 18px;
    line-height: 1.3em;
  }
`

const IntroOverlay = ({ onClose }) => {
  return (
    <Modal>
      <Content>
        <h1 style={{ marginTop: 0 }}>Welcome!</h1>
        <p>
          The Village Map is a place to explore and record the history of The
          Village of West Greenville.
        </p>
        <p>
          The Village, as we like to call it, is changing quickly. We hope that
          by telling some of the stories behind the places where we work and
          live, we can preserve the heritage that got us to where we are now
          appreciate more deeply the environment we work and play in.
        </p>
        <p>
          We're looking for more stories to share so don't hesitate to submit a
          story. Just click the map to start.
        </p>
        <Button onClick={onClose}>Enter</Button>
      </Content>
    </Modal>
  )
}

export default IntroOverlay
