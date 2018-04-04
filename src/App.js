import React from "react"
import gql from "graphql-tag"
import { compose, graphql } from "react-apollo"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Map } from "./components"
import Dock from "react-dock"

class App extends React.Component {
  state = {
    selectedPlace: null,
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Map} />
          <Route
            path="/p/:id"
            children={({ match, history }) => (
              <Dock
                position="right"
                isVisible={!!match}
                onVisibleChange={() => !!match && history.push("/")}>
                "tes"
              </Dock>
            )}
          />
        </div>
      </Router>
    )
  }
}

export default App
