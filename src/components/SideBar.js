import React from "react";

// const SideBarContainer = styled.div``;
//
// const StoriesWrapper = styled.div``;

const SideBar = props => {
	console.log("props", props);
	return (
		<div>
			<div>
				<img src={props.props.images[0].url} />
				<h1>{props.props.name}</h1>
			</div>
			<p className="address">{props.props.address}</p>
			<div>
				<h2>Stories</h2>
				{props.props.stories.map((story, id) => {
					return (
						<div className="story" key={id}>
							<h3>{story.title}</h3>
							<p>{story.startDate}</p>
							<p>{story.story}</p>
							{story.people.map((person, id) => {
								return (
									<div key={id}>
										<img src={person.image[0].url} />
										<h4>{person.name}</h4>
										<p>{person.bio}</p>
									</div>
								);
							})}
							{story.sourceUrl ? <a href={story.sourceUrl}>Source</a> : null}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SideBar;
