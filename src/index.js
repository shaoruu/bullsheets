import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './containers/App'
import reportWebVitals from './reportWebVitals'
import { UserContextProvider } from './utils/useUserContext'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: { reconnect: true }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache().restore({})
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
