import React from "react"
import styled from "styled-components"
import { Button } from "./ui"

const SideBarContainer = styled.div`
  background-color: #303541;
  height: 100%;
  color: white;
  .header img {
    width: 100%;
  }
  .content-wrapper {
    padding: 20px;
  }
  .address {
    color: #97cc68;
  }
  a {
    color: #97cc68;
  }
  .story-date {
    color: #6a7384;
  }
  .stories-wrapper {
    background-color: #3c424f;
    padding: 20px;
  }
  .stories-wrapper img {
    width: 70px !important;
    height: 70px !important;
    border-radius: 50%;
  }
  .person {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
  }
  .person .story-text {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
  }
  .person .story-text h4,
  .person .story-text p {
    margin: 0px;
  }
`

const SideBar = props => {
  return (
    <SideBarContainer>
      <Button style={{ zIndex: 100 }}>X</Button>
      <div className="header">
        <img src={props.props.images[0].url} />
      </div>
      <div className="content-wrapper">
        <h1>{props.props.name}</h1>
        <p className="address">{props.props.address}</p>
        {props.props.description ? (
          <p className="description">{props.props.description}</p>
        ) : null}
        <div className="stories-wrapper">
          {props.props.stories.length > 0
            ? props.props.stories.map((story, id) => {
                return (
                  <div className="story" key={id}>
                    <h3>{story.title}</h3>
                    <p className="story-date">{story.startDate}</p>
                    <p>{story.story}</p>
                    {story.people.map((person, id) => {
                      return (
                        <div className="person" key={id}>
                          <img src={person.image[0].url} />
                          <div className="story-text">
                            <h4>{person.name}</h4>
                            <p>{person.bio}</p>
                          </div>
                        </div>
                      )
                    })}
                    {story.sourceUrl ? (
                      <a href={story.sourceUrl}>Source</a>
                    ) : null}
                  </div>
                )
              })
            : "No Story Available"}
        </div>
      </div>
    </SideBarContainer>
  )
}

export default SideBar
