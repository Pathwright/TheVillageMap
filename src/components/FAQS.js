import React from "react"
import gql from "graphql-tag"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"
import { compose, graphql } from "react-apollo"

const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  a {
    color: #97cc68;
  }
  padding: 20px;
  > div {
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #3c424f;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 20px;
    font-weight: bold;
    font-family: "Mallory Black";
  }
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-family: "Mallory Black";
  }
  div > p {
    margin: 0;
  }
`

const FAQ = ({ id, question, answer }) => {
  return (
    <div>
      <h3>{question}</h3>
      <div>
        <ReactMarkdown source={answer} />
      </div>
    </div>
  )
}

const FAQS = ({ error, loading, faqs }) => {
  if (error) {
    return <Center>An unexpected error occurred.</Center>
  }

  if (loading) {
    return <Center>Loading...</Center>
  }

  return (
    <Container>
      <h1>FAQs</h1>
      {faqs.map(faq => <FAQ key={faq.id} {...faq} />)}
    </Container>
  )
}

export default graphql(
  gql`
    query {
      FAQS {
        id
        question
        answer
      }
    }
  `,
  {
    props: ({ data }) => ({
      error: data.error,
      loading: data.loading,
      faqs: data.FAQS || []
    })
  }
)(FAQS)
