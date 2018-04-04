import React from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Map, Place, SideBar } from "./components";
import Dock from "react-dock";

class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Route path="/" component={Map} />
					<Route
						path="/p/:placeId"
						children={({ match, history }) => (
							<Dock
								position="right"
								isVisible={!!match}
								onVisibleChange={() => !!match && history.push("/")}>
								{match && <Place id={match.params.placeId} />}
							</Dock>
						)}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
