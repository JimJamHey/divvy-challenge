import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as HooksProvider } from '@apollo/client'
import { client } from './network/apollo-client'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <HooksProvider client={client}>
          <AppRouter />
        </HooksProvider>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
