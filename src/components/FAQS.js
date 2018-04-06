import React from "react"
import gql from "graphql-tag"
import { compose, graphql } from "react-apollo"

const FAQ = ({ id, question, answer }) => {
  return (
    <div>
      <h3>{question}</h3>
      <p>{answer}</p>
      <style jsx>{`
        div {
          background-color: #ebe3cd;
          color: rgba(0, 0, 0, 0.6);
          border-radius: 5px;
          margin-bottom: 10px;
        }
        h3 {
          padding: 10px;
          background-color: #dfd2ae;
          border-radius: 5px 5px 0 0;
          margin: 0;
        }
        p {
          padding: 10px;
          margin: 0;
        }
      `}</style>
    </div>
  )
}

const FAQS = props => {
  console.log("props", props)
  return props.data && props.data.FAQS ? (
    <div>{props.data.FAQS.map(node => <FAQ {...node} />)}</div>
  ) : null
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
  {},
)(FAQS)
