import React from "react"
import gql from "graphql-tag"
import { compose, graphql } from "react-apollo"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Map, Place, SideBar } from "./components"
import styled from "styled-components"
import Dock from "react-dock"

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
const Footer = styled.div`
  text-align: center;
  width: 100%;
  height: 40px;
  z-index: 10;
  position: absolute;
  bottom: 0px;
  left: 0px;
`

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route
            path="/p/:placeId"
            children={({ match, history }) => (
              <Container>
                <Map
                  activePlaceId={match && match.params.placeId}
                  onSelectPlace={placeId => history.push(`/p/${placeId}`)}
                />
                <Dock
                  position="right"
                  isVisible={!!match}
                  onVisibleChange={() => !!match && history.push("/")}
                >
                  {match && <Place id={match.params.placeId} />}
                </Dock>
                <Footer>
                  Built by{" "}
                  <a href="https://www.pathwright.com">The Pathwright Crew</a>{" "}
                  for <a href="https://goodfour.us">Good Four</a> 2018
                </Footer>
              </Container>
            )}
          />
        </div>
      </Router>
    )
  }
}

export default App
