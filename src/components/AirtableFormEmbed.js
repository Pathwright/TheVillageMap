import React from "react"
import styled from "styled-components"

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
`

const Header = styled.div`
  position: relative;
  z-index: 9999;
  display: block;
  padding: 20px;
  background-color: white;
`

const Iframe = styled.iframe`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: calc(100% - 40px);
  border: none;
`

class AirtableFormEmbed extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  goBack = () => {
    if (this.props.history.length) {
      this.props.history.goBack()
    } else {
      this.props.history.push("/")
    }
  }

  render() {
    let formUrl =
      "https://airtable.com/embed/shrFV5fChBDr5FDxB" +
      this.props.location.search // pass search params to airtable form

    return (
      <Container>
        <Header>
          <a href="javascript:void()" onClick={this.goBack}>
            Back
          </a>
        </Header>
        <Iframe
          className="airtable-embed"
          src={formUrl}
          frameborder="0"
          onmousewheel=""
        />
      </Container>
    )
  }
}

export default AirtableFormEmbed
