import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, from} from '@apollo/client'
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
})
const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache
})

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Code", completed: false },
  { id: "todo-3", name: "Repeat", completed: false }
]

ReactDOM.render(
  <ApolloProvider client={client}>
    <App tasks={DATA}/>
    </ApolloProvider>,
  document.getElementById('root')
);