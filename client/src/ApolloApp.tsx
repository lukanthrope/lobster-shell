import * as React from 'react';
import App from './App';
import {ApolloClient} from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwttoken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App></App>
  </ApolloProvider>
);

export default ApolloApp;