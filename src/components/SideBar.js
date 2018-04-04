import React from "react";
import styled from "styled-components";

const SideBarContainer = styled.div``;

const StoriesWrapper = styled.div``;

const SideBar = props => {
	console.log("props", props.children);
	return (
		<SideBarContainer>
			<h1>{props.children.name}</h1>
			<p className="address">{props.children.address}</p>
			<StoriesWrapper>
				{props.children.stories.map((story, id) => {
					return (
						<div className="story" id={id}>
							<h2>{story.title}</h2>
							<p>{story.story}</p>
						</div>
					);
				})}
			</StoriesWrapper>
		</SideBarContainer>
	);
};

export default SideBar;
