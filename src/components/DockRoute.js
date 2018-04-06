import React from "react"
import { Route } from "react-router-dom"
import Dock from "react-dock"

const getDockSize = () => {
  if (window.innerWidth < 480) return 0.9
  if (window.innerWidth < 768) return 0.6
  if (window.innerWidth < 1200) return 0.4
  return 0.3
}

class DockRoute extends React.Component {
  state = {
    dockSize: getDockSize(),
  }

  handleResize = () => {
    const dockSize = getDockSize()
    if (dockSize !== this.state.dockSize) {
      this.setState({ dockSize })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }

  render() {
    const { path, component: Component } = this.props
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
            size={this.state.dockSize}
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
}

export default DockRoute
