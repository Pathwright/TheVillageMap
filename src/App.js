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
`

const Brand = styled.div`
  position: absolute;
  z-index: 10;
  left: 4px;
  top: 4px;
  padding: 5px;
  background-color: #97cc68;
  display: flex;
  align-items: center;
  border-radius: 4px;
  img {
    width: 30px;
  }
  h1 {
    position: relative;
    font-size: 16px;
    font-family: "Mallory Black";
    margin: 0px 5px;
    color: #303541;

    /* border-radius: 8px; */
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  > div:nth-child(2) > div:nth-child(2) {
    -webkit-overflow-scrolling: touch;
  }
`
const Footer = styled.footer`
  text-align: center;
  width: 100%;
  height: 40px;
  z-index: 10;
  position: absolute;
  bottom: 0px;
  left: 0px;
  a,
  a:link,
  a:visited {
    color: #000;
  }
`

class App extends React.Component {
  state = {
    showIntro: false
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
          <Brand>
            <img src={require("./assets/logo-blue.svg")} />
            <h1>The Village Map</h1>
          </Brand>

          <Route
            path="/place/:placeId"
            children={({ match, history }) => (
              <Container>
                <Map
                  activePlaceId={match && match.params.placeId}
                  onSelectPlace={placeId => history.push(`/place/${placeId}`)}
                />
                <Dock
                  dockStyle={{
                    backgroundColor: "#303541",
                    color: "white",
                    "-webkit-overflow-scrolling": "touch"
                  }}
                  className="Doct__container"
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
