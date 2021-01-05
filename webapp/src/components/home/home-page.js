import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { GET_TRANSACTIONS } from '../../queries/index'
import { useQuery } from '@apollo/react-hooks'

export function Home () {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <Fragment>
      <TableTitle>Transactions</TableTitle>
      <table css={TableContainer}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Merchant ID</th>
            <th>Transaction Type</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.transactions.map((transaction) => (
            <Fragment key={transaction.id} >
              <tr css={TableDataStyle} transaction={transaction}>
                <td css={TableRowStyle}>{transaction.description}</td>
                <td css={TableRowStyle}>{transaction.merchant_id}</td>
                <td css={TableRowStyle}>{transaction.debit ? 'Debit' : 'Credit'}</td>
                <td css={TableRowStyle}>{transaction.amount}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
  // return (
  //   <div>
  //     <h1>Transactions</h1>
  //     <div>
  //       {data.transactions.map((transaction) => (
  //         <div key={transaction.id} transaction={transaction}>
  //           <h5>{transaction.description}</h5>
  //           <h5>{transaction.amount}</h5>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // )
}

const TableTitle = styled.h1`
  text-align: center;
`

const TableContainer = css`
  margin: 0 auto;
  padding: 0 1.8rem;
`
const TableRowStyle = css`
  background-color: #5e5e5e;
  color: white;
  border: 1px solid;
  padding-left: 8px;
`
const TableDataStyle = css`
  background-color: #fff;
  color: black;
`
