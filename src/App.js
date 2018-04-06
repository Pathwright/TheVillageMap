import "./styles/reset.css"
import React from "react"
import gql from "graphql-tag"
import { compose, graphql } from "react-apollo"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import styled from "styled-components"
import { IntroOverlay, Map, Place, SideBar } from "./components"
import Dock from "react-dock"

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #97cc68;
  header {
    position: absolute;
    z-index: 10;
    padding: 10px;
    h1 {
      font-size: 16px;
      font-family: "Mallory Black";
      margin: 0px;
      text-align: center;
      padding: 5px 10px;
      color: #303541;
      /* border-radius: 8px; */
      background-color: #97cc68;
    }
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.19) 8px 12px 40px,
    rgba(0, 0, 0, 0.23) 8px 6px 12px;
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
  state = {
    showIntro: true
  }

  componentWillMount() {
    if (window.localStorage && !window.localStorage.getItem("visited")) {
      this.setState({ showIntro: true })
    }
  }

  handleEnterSite = () => {
    this.setState({ showIntro: false })
    if (window.localStorage) {
      window.localStorage.setItem("visited", true)
    }
  }

  render() {
    return (
      <Router>
        <Wrap>
          <header>
            <h1>The Village Map</h1>
          </header>

          <Route
            path="/p/:placeId"
            children={({ match, history }) => (
              <Container>
                <Map
                  activePlaceId={match && match.params.placeId}
                  onSelectPlace={placeId => history.push(`/p/${placeId}`)}
                />
                <Dock
                  dockStyle={{
                    backgroundColor: "#303541",
                    color: "white"
                  }}
                  position="right"
                  size={window.innerWidth < 480 ? 0.9 : 400}
                  fluid={window.innerWidth < 480}
                  isVisible={!!match}
                  onVisibleChange={() => !!match && history.push("/")}
                >
                  {match && <Place id={match.params.placeId} />}
                </Dock>
                <Footer>
                  Built by{" "}
                  <a href="https://www.pathwright.com" target="_blank">
                    The Pathwright Crew
                  </a>{" "}
                  for{" "}
                  <a href="https://goodfour.us" target="_blank">
                    Good Four
                  </a>{" "}
                  2018
                </Footer>
              </Container>
            )}
          />
          {this.state.showIntro && (
            <IntroOverlay onClose={this.handleEnterSite} />
          )}
        </Wrap>
      </Router>
    )
  }
}

export default App
