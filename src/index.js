import React from "react"
import ReactDOM from "react-dom"
import ApolloClient from "apollo-boost"
import App from "./App"
import { ApolloProvider } from "react-apollo"
import { GRAPHQL_API_URL } from "./constants"

const client = new ApolloClient({
  uri: GRAPHQL_API_URL,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root"),
)
