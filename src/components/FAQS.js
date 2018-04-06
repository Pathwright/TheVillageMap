import React from "react"
import gql from "graphql-tag"
import styled from "styled-components"
import { compose, graphql } from "react-apollo"

const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  padding: 10px;
  div {
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #3c424f;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  p {
    margin: 0;
  }
`

const FAQ = ({ id, question, answer }) => {
  return (
    <div>
      <h3>{question}</h3>
      <p>{answer}</p>
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

  return <Container>{faqs.map(faq => <FAQ key={faq.id} {...faq} />)}</Container>
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
      faqs: data.FAQS || [],
    }),
  },
)(FAQS)
