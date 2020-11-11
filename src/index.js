import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider  } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

const HTTP_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://api.fantasta.app'
const WS_URL = process.env.NODE_ENV === 'development' ? 'ws://localhost:4000/graphql' : 'wss://api.fantasta.app/graphql'

const link = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link,
  uri: HTTP_URL,
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
