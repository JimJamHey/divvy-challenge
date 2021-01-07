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

export const DELETE_TRANSACTION = gql`
    mutation DeleteTransaction($id: String!) {
        deleteTransaction(id: $id){
            id
        }
    }
`

export const ADD_TRANSACTION = gql`
    mutation AddTransaction($user_id: String, $description: String, $merchant_id: String, $debit: Boolean, $credit: Boolean, $amount: Float) {
        addTransaction(user_id: $user_id, description: $description, merchant_id: $merchant_id, debit: $debit, credit: $credit, amount: $amount) {
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

// export const EDIT_TRANSACTION = gql`
//     mutation EditTransaction($id: String $user_id: String, $description: String, $merchant_id: String, $debit: Boolean, $credit: Boolean, $amount: Float) {
//         editTransaction(id: $id, user_id: $user_id, description: $description, merchant_id: $merchant_id, debit: $debit, credit: $credit, amount: $amount) {
//             id
//             user_id
//             description
//             merchant_id
//             debit
//             credit
//             amount
//     }
// `
