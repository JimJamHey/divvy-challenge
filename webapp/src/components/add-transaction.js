import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { css } from '@emotion/core'
import styled from '@emotion/styled'
import propTypes from 'prop-types'
import alert from 'sweetalert2'

import { ADD_TRANSACTION, GET_TRANSACTIONS } from '../queries/index'
import { useMutation, useQuery } from '@apollo/react-hooks'

const initialState = {
  user_id: '1',
  description: '',
  merchant_id: '',
  debit: true,
  credit: false,
  amount: ''
}

const labelOptions = [{ label: 'Debit', value: 'debit' }, { label: 'Credit', value: 'credit' }]

const NewTransaction = ({ history: { push } }) => {
  const [values, setValues] = useState({ ...initialState })
  const { loading, error } = useQuery(GET_TRANSACTIONS)
  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [{
      query: GET_TRANSACTIONS
    }]
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>There was an error adding the transaction</div>

  const changeHandler = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value })
  }

  const selectHandler = ({ target: { value } }) => {
    if (value === 'debit') {
      setValues({ ...values, credit: false, debit: true })
    } else {
      setValues({ ...values, credit: true, debit: false })
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await addTransaction({
        variables: {
          ...values,
          user_id: values.user_id,
          description: values.description,
          merchant_id: values.merchant_id,
          debit: values.debit,
          credit: values.credit,
          amount: parseFloat(values.amount)
        }
      })
      alert.fire({
        title: 'Success!',
        text: 'The transaction has been added!',
        type: 'success',
        confirmButtonColor: '#111111'
      })
      setValues({ ...initialState })
      push('/')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  return (
    <FormContainer>
      <FormTitle>Add Transaction</FormTitle>
      <Form onSubmit={e => submitHandler(e, addTransaction)}>
        <label htmlFor='user_id'>
                User ID:
        </label>
        <Input id='user_id' name='user_id' onChange={changeHandler} placeholder='User ID...' readOnly type='number' value={values.user_id} />
        <label htmlFor='description'>
                Description:
        </label>
        <Input id='description' name='description' onChange={changeHandler} placeholder='Description...' required type='text' value={values.description} />
        <label htmlFor='transaction-type'>
                Type:
        </label>
        <Select id='transaction-type' onChange={e => selectHandler(e)} value={values.credit ? 'credit' : 'debit'}>
          {labelOptions.map((x, index) => (
            <option key={index} value={x.value}>
              {x.label}
            </option>
          ))}
        </Select>
        <label htmlFor='merchant_id'>
                Merchant ID:
        </label>
        <Input id='merchant_id' max={9999} min={0} name='merchant_id' onChange={changeHandler} placeholder='Merchant store number...' required type='number' value={values.merchant_id} />
        <label htmlFor='amount'>
                Amount:
        </label>
        <Input id='amount' max={9999} min={0} name='amount' onChange={changeHandler} placeholder='$Amount...' required type='number' value={values.amount} />
        <button css={submitButton} to='/' type='submit'>Submit</button>
        <Link to='/'><button css={cancelButton} to='/'>Cancel</button></Link>
      </Form>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 10px 10px 18px 10px rgba(204,204,204,1);
  width: 30%;
  margin: 0 auto;
  margin-top: 4.5rem;
  padding-top: 10px;
  padding-bottom: 2.5rem;

  @media (max-width: 1200px) {
    width: 55%;
  }

  @media (max-width: 900px) {
    width: 75%;
  }
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
  height: 2.4rem;
  border-radius: 10px;
  outline: none;
  width: 100%;
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
  height: 2.4rem;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    transition: all 150ms linear;
    opacity: .85;
  }
`

export default NewTransaction

NewTransaction.propTypes = {
  history: propTypes.object
}
