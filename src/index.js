import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider  } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

const apiUrl = process.env.NODE_ENV === 'development' ? 'localhost:4000' : 'api.ciaffardini.xyz'

const link = new WebSocketLink({
  uri: `ws://${apiUrl}/graphql`,
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link,
  uri: `http://${apiUrl}`,
  cache: new InMemoryCache()
});


ReactDOM.render(
  <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
