import {WebSocketLink} from 'apollo-link-ws';
import {
  HTTP_NETWORK_INTERFACE,
  SOCKET_NETWORK_INTERFACE,
} from '../helpers/constants';
import {HttpLink} from 'apollo-link-http';
import {ApolloLink, concat} from 'apollo-link';
import {split} from 'apollo-client-preset';
import {getMainDefinition} from 'apollo-utilities';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {token} from '../helpers/variables';

const wsLink = new WebSocketLink({
  uri: SOCKET_NETWORK_INTERFACE,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({uri: HTTP_NETWORK_INTERFACE});

const authMiddleware = new ApolloLink((operation, forward) => {
  console.log(token());
  operation.setContext({
    headers: {
      authorization: token(), // pune JWT-ul aici
    },
  });
  return forward(operation);
});

const link = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      errorPolicy: 'all',
    },
  },
});
