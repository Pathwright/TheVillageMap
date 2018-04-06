import React from "react"
import { Route } from "react-router-dom"
import Dock from "react-dock"

const DockRoute = ({ path, component: Component }) => {
  return (
    <Route
      path={path}
      children={({ match, history, location }) => (
        <Dock
          dockStyle={{
            color: "white",
            backgroundColor: "#303541",
            WebkitOverflowScrolling: "touch",
          }}
          position="right"
          size={
            window.innerWidth < 480 ? 0.9 : window.innerWidth < 768 ? 0.6 : 0.4
          }
          isVisible={!!match}
          onVisibleChange={() => !!match && history.push("/")}>
          {match && (
            <Component match={match} history={history} location={location} />
          )}
        </Dock>
      )}
    />
  )
}

export default DockRoute
