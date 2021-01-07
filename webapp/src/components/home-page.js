import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

import { GET_TRANSACTIONS, DELETE_TRANSACTION } from '../queries/index'
import { useMutation, useQuery } from '@apollo/react-hooks'

export function Home () {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS)
  // const [editTransaction] = useMutation(EDIT_TRANSACTION, {
  //   refetchQueries: [{
  //     query: GET_TRANSACTIONS
  //   }]
  // })
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [{
      query: GET_TRANSACTIONS
    }]
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <Fragment>
      <TableTitle>Transactions</TableTitle>
      <table css={TableContainer}>
        <thead>
          <tr>
            <TableHeader>Edit</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Delete</TableHeader>
          </tr>
        </thead>
        <tbody>
          {data.transactions.map((transaction) => (
            <Fragment key={transaction.id} >
              <tr css={TableDataStyle} transaction={transaction}>
                {/* TODO: change icon below to edit specific cell */}
                <td css={EditIconStyle}>
                  <FontAwesomeIcon icon={faEdit} onClick={() => {
                    deleteTransaction({ variables: { 'id': transaction.id } })
                  }} />
                </td>
                <td css={TableRowStyle}>{transaction.description}</td>
                {/* <td css={TableRowStyle}>{transaction.merchant_id}</td> */}
                <td css={TableRowStyle}>{transaction.debit ? 'Debit' : 'Credit'}</td>
                <td css={TableRowStyle}>${transaction.amount}</td>
                <td css={DeleteIconStyle}>
                  <FontAwesomeIcon icon={faTrash} onClick={() => {
                    deleteTransaction({ variables: { 'id': transaction.id } })
                  }} />
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}

const TableTitle = styled.h1`
  text-align: center;
`

const TableHeader = styled.th`
  background-color: #000;
  color: #fff;
`

const EditIconStyle = css`
  color: black;
  background-color: #E5E2D4;
  padding-bottom: 4px;
  padding: 0 10px;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: green;
  }
`

const DeleteIconStyle = css`
  color: black;
  background-color: #E5E2D4;
  padding-bottom: 4px;
  padding-left: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: red;
  }
`

const TableContainer = css`
  background-color: #000;
  margin: 0 auto;
`
const TableRowStyle = css`
  background-color: #5e5e5e;
  color: white;
  border: 1px solid #6e6e6e;
  padding-left: 8px;

  &:hover {
    transition: all 150ms linear;
    opacity: .85;
  }
`
const TableDataStyle = css`
  background-color: #fff;
  color: black;
`
