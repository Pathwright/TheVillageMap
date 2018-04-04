import React from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { Drawer, Map, SideBar } from "./components";

class App extends React.Component {
	state = {
		selectedPlace: null
	};

	render() {
		return (
			<div>
				<Map
					places={this.props.data.Places}
					onSelectPlace={place => this.setState({ selectedPlace: place })}
				/>
				<Drawer
					open={!!this.state.selectedPlace}
					onChange={isOpen =>
						!isOpen && this.setState({ selectedPlace: null })
					}>
					{this.state.selectedPlace && (
						<code>
							<SideBar>{this.state.selectedPlace}</SideBar>
						</code>
					)}
				</Drawer>
			</div>
		);
	}
}

export default graphql(
	gql`
		query {
			Places {
				name
				id
				address
				latitude
				longitude
				stories {
					title
					story
				}
			}
		}
	`,
	{}
)(App);
