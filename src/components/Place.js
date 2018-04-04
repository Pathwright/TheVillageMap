import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import SideBar from "./SideBar";

const Place = ({ error, loading, place }) => {
	if (error) {
		return "An unexpected error occurred.";
	}

	if (loading) {
		return "Loading...";
	}

	if (place) {
		return <SideBar props={place} />;
	}

	return null;
};

export default graphql(
	gql`
		query($id: String!) {
			Place(id: $id) {
				name
				id
				address
				latitude
				longitude
				description
				website
				images {
					url
					filename
					size
					type
				}
				stories {
					title
					story
					people {
						name
						bio
						image {
							url
							filename
							size
							type
						}
					}
					startDate
					source {
						id
					}
					sourceUrl
				}
			}
		}
	`,
	{
		options: ({ id }) => ({
			variables: { id }
		}),
		props: ({ data }) => ({
			error: data.error,
			loading: data.loading,
			place: data.Place
		})
	}
)(Place);
