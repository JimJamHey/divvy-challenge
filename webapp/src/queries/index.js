import { gql } from 'apollo-boost'
// queries to webserver for fetching data

export const GET_TRANSACTIONS = gql`
    query GetTransactions() {
        transactions(){
            id
            user_id
            description
            merchant_id
            debit
            credit
            amount
        }
    }
`