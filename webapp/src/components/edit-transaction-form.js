import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import alert from 'sweetalert2'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { func, object } from 'prop-types'
import { EDIT_TRANSACTION, GET_TRANSACTIONS } from '../queries'

// submit handler with useMutation to submit new data to backend
// update modal css to fit form fields
// add sweet alert confirm edit

const labelOptions = [{ label: 'Debit', value: 'debit' }, { label: 'Credit', value: 'credit' }]

function Edit ({ transaction, onCancel, setShowModal }) {
  const [updatedTransaction, setUpdatedTransaction] = useState(transaction)
  const { loading, error } = useQuery(GET_TRANSACTIONS)
  const [editTransaction] = useMutation(EDIT_TRANSACTION, {
    refetchQueries: [{
      query: GET_TRANSACTIONS
    }]
  })
  const {
    merchant_id: merchantId,
    description,
    credit,
    // debit,
    amount
    // id // need this for the useMutation
  } = updatedTransaction

  if (loading) return <div>Loading...</div>
  if (error) return <div>There was an error with the edit</div>

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await editTransaction({
        variables: {
          ...updatedTransaction,
          id: updatedTransaction.id,
          description: updatedTransaction.description,
          merchant_id: updatedTransaction.merchant_id,
          credit: updatedTransaction.credit,
          debit: updatedTransaction.debit,
          amount: parseFloat(amount)
        }
      })
      alert.fire({
        title: 'Success!',
        text: 'The changes were saved!',
        type: 'success',
        confirmButtonColor: '#111111'
      })
      setShowModal(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log({ updatedTransaction })
  }, [updatedTransaction])

  const changeHandler = ({ target: { name, value } }) => {
    setUpdatedTransaction({ ...updatedTransaction, [name]: value })
  }

  const selectHandler = ({ target: { name, value } }) => {
    if (value === 'debit') {
      setUpdatedTransaction({ ...updatedTransaction, credit: false, debit: true })
    } else {
      setUpdatedTransaction({ ...updatedTransaction, credit: true, debit: false })
    }
  }

  return (
    <FormContainer>
      <FormTitle>Edit Transaction</FormTitle>
      <Form onSubmit={submitHandler}>
        <label htmlFor='description'>
                    Description:
        </label>
        <Input id='description' name='description' onChange={changeHandler} placeholder='Description...' required type='text' value={description} />
        <label htmlFor='transaction-type'>
                Type:
        </label>
        <Select id='transaction-type' onChange={e => selectHandler(e)} value={credit ? 'credit' : 'debit'}>
          {labelOptions.map((x, index) => (
            <option key={index} value={x.value}>
              {x.label}
            </option>
          ))}
        </Select>
        <label htmlFor='merchant_id'>
                    Merchant ID:
        </label>
        <Input id='merchant_id' name='merchant_id' onChange={changeHandler} placeholder='Merchant store number...' required type='number' value={merchantId} />
        <label htmlFor='amount'>
                    Amount:
        </label>
        <Input id='amount' min={0} name='amount' onChange={changeHandler} placeholder='$Amount...' required type='number' value={amount} />
        <button css={submitButton} type='submit'>Submit</button>
        <button css={cancelButton} onClick={onCancel}>Cancel</button>
      </Form>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 10px 10px 20px 10px rgba(204,204,204,0.5);
  width: 20%;
  margin: 0 auto;
  margin-top: 4.5rem;
  padding-top: 10px;
  padding-bottom: 2.5rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
`

const FormTitle = styled.h2`
  text-align: center;
  font-size: 32px;
`

const Input = styled.input`
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #000;
  border-radius: 10px;
  outline: none;
`

const Select = styled.select`
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #000;
  border-radius: 10px;
  outline: none;
`
const cancelButton = css`
  background-color: #ad423b;
  border: none;
  color: #fff;
  margin-top: 10px;
  height: 2rem;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    transition: all 150ms linear;
    opacity: .85;
  }
`

const submitButton = css`
  background-color: #111111;
  border: none;
  color: #fff;
  margin-top: 10px;
  height: 2rem;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    transition: all 150ms linear;
    opacity: .85;
  }
`

export default Edit

Edit.propTypes = {
  transaction: object,
  onCancel: func,
  setShowModal: func
}
