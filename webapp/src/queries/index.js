import { gql } from 'apollo-boost'
// queries to webserver for fetching data

export const GET_TRANSACTIONS = gql`
    query getTransactions($user_id: String, $merchant_id: String, $debit: Boolean, $credit: Boolean, $amount: Float) {
        transactions(user_id: $user_id, merchant_id: $merchant_id, debit: $debit, credit: $credit, amount: $amount){
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
