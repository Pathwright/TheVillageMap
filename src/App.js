import "./styles/reset.css"
import React from "react"
import gql from "graphql-tag"
import { compose, graphql } from "react-apollo"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import styled from "styled-components"
import {
  AirtableFormEmbed,
  DockRoute,
  IntroOverlay,
  FAQS,
  Map,
  Place,
  SideBar,
} from "./components"
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
  height: 40px;
  background-color: #97cc68;
  display: flex;
  align-items: center;
  border-radius: 4px;
  img {
    width: 30px;
  }
  h1,
  a {
    position: relative;
    font-size: 16px;
    font-family: "Mallory Black";
    margin: 0px 5px;
    color: #303541;
    text-decoration: none;
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
    font-family: "Mallory Black";
  }
`

class App extends React.Component {
  state = {
    showIntro: false,
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
            <Link to="/">The Village Map</Link>
          </Brand>
          <Brand style={{ left: 190 }}>
            <Link to="/faqs">About</Link>
          </Brand>
          <Route
            path="/p/:placeId"
            children={({ match, history }) => (
              <Map
                activePlaceId={match && match.params.placeId}
                onSelectPlace={placeUrl => history.push(placeUrl)}
                onSubmitPlace={formUrl => history.push(formUrl)}
              />
            )}
          />
          <DockRoute path="/p/:placeId" component={Place} />
          <DockRoute path="/faqs" component={FAQS} />
          <DockRoute path="/suggest" component={AirtableFormEmbed} />
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
          {this.state.showIntro && (
            <IntroOverlay onClose={this.handleEnterSite} />
          )}
        </Wrap>
      </Router>
    )
  }
}

export default App
