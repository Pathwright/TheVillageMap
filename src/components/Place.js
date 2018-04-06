import React from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import Carousel from "nuka-carousel"
import styled from "styled-components"
import moment from "moment"

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CarouselImage = styled.img`
  width: 100%;
  height: 40vh;
  max-height: 300px;
  object-fit: cover;
`

const SideBarContainer = styled.div`
  .slider-control-bottomcenter button {
    color: #303541;
  }
  .content-wrapper {
    padding: 20px;
  }
  .place-name {
    margin: 0;
  }
  .place-address {
    margin: 0;
    color: #97cc68;
  }
  a {
    color: #97cc68;
  }
  .stories {
    margin-top: 20px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
  .stories-wrapper {
    padding-left: 40px;
  }
  .story-indicator {
    position: absolute;
    top: 20px;
    left: -30px;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: 3px solid #97cc68;
    background-color: #303541;
    transform: translateX(-50%);
  }
  .story-line {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: -30px;
    width: 3px;
    background: #6a7384;
    transform: translateX(-50%);
    opacity: 0.5;
  }
  .story {
    position: relative;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    background-color: #3c424f;
    &:before {
      content: "";
      z-index: -1;
      position: absolute;
      top: 30px;
      left: 0;
      width: 20px;
      height: 20px;
      display: block;
      border-radius: 5px;
      background-color: #3c424f;
      transform: translate3d(-50%, -50%, 0) rotate(45deg);
    }
    & + .story .story-line {
      top: -20px;
    }
  }
  .story-title {
    margin: 0;
  }
  .story-date {
    margin: 0;
    color: #6a7384;
  }
  .person {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
  .person img {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border: 3px solid #97cc68;
  }
  .person .story-text {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    h4,
    p {
      margin: 0;
    }
  }
`

const Place = ({ error, loading, place }) => {
  if (error) {
    return "An unexpected error occurred."
  }

  if (loading) {
    return <Loading>Loading...</Loading>
  }

  if (place) {
    return (
      <SideBarContainer>
        <Carousel>
          {place.images.map(image => (
            <CarouselImage src={image.url} key={image.url} />
          ))}
        </Carousel>
        <div className="content-wrapper">
          <h1 className="place-name">{place.name}</h1>
          <p className="place-address">{place.address}</p>
          <div className="stories">@stories</div>
          <div className="stories-wrapper">
            {place.stories.length > 0 ? (
              place.stories.map((story, id) => (
                <div className="story" key={id}>
                  <div className="story-line" />
                  <div className="story-indicator" />
                  <h3 className="story-title">{story.title}</h3>
                  <p className="story-date">
                    {moment(story.startDate).format("MMMM Do, YYYY")}
                  </p>
                  <p>{story.story}</p>
                  {story.people.map((person, id) => {
                    return (
                      <div className="person" key={id}>
                        <img src={person.image[0].url} />
                        <div className="story-text">
                          <h4>{person.name}</h4>
                          <p>{story.story}</p>
                        </div>
                      </div>
                    )
                  })}
                  {story.sourceUrl ? (
                    <a href={story.sourceUrl}>Source</a>
                  ) : null}
                </div>
              ))
            ) : (
              "No Story Available"
            )}
          </div>
        </div>
      </SideBarContainer>
    )
  }

  return null
}

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
      variables: { id },
    }),
    props: ({ data }) => ({
      error: data.error,
      loading: data.loading,
      place: data.Place,
    }),
  },
)(Place)
