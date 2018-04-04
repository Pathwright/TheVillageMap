import React from "react"
import gql from "graphql-tag"
import { compose, graphql } from "react-apollo"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { IntroOverlay, Map, Place, SideBar } from "./components"
import Dock from "react-dock"

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
        <div>
          <Route
            path="/p/:placeId"
            children={({ match, history }) => (
              <React.Fragment>
                <Map
                  activePlaceId={match && match.params.placeId}
                  onSelectPlace={placeId => history.push(`/p/${placeId}`)}
                />
                <Dock
                  position="right"
                  isVisible={!!match}
                  onVisibleChange={() => !!match && history.push("/")}>
                  {match && <Place id={match.params.placeId} />}
                </Dock>
              </React.Fragment>
            )}
          />
          {this.state.showIntro && (
            <IntroOverlay onClose={this.handleEnterSite} />
          )}
        </div>
      </Router>
    )
  }
}

export default App
