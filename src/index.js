import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider  } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import reducer from "./store/reducer";

const store = configureStore({ reducer });

const link = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link,
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
