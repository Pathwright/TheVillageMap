import React from "react"
import gql from "graphql-tag"
import { compose, graphql } from "react-apollo"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Map, Place, SideBar } from "./components"
import Dock from "react-dock"

class App extends React.Component {
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
        </div>
      </Router>
    )
  }
}

export default App
