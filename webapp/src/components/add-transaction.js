import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import alert from 'sweetalert2'
import styled from '@emotion/styled'
import { Mutation } from 'react-apollo'
import { ADD_TRANSACTION, GET_TRANSACTIONS } from '../queries/index'

const initialState = {
  user_id: '1',
  description: '',
  merchant_id: '',
  debit: true,
  credit: false,
  amount: ''
}

const labelOptions = [{ label: 'Debit', value: 'debit' }, { label: 'Credit', value: 'credit' }]

export const NewTransaction = (props) => {
  const [values, setValues] = useState({ ...initialState })
  const [errors, setErrors] = useState(false)

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

  const submitHandler = (e, addTransaction) => {
    e.preventDefault()
    addTransaction().then(async ({ data, loading }) => {
      if (!loading && data && data.addTransaction) {
        alert.fire('Transaction has been added!')
        setValues({ ...initialState })
      }
    })
  }

  const showErrors = errors => {
    return errors.map((err, index) => <Error key={index}>{err.message}</Error>)
  }

  return (
    <Mutation
      mutation={ADD_TRANSACTION}
      refetchQueries={() => {
        return [
          {
            query: GET_TRANSACTIONS
          }
        ]
      }}
      variables={{
        ...values,
        user_id: values.user_id,
        description: values.description,
        merchant_id: values.merchant_id,
        debit: values.debit,
        credit: values.credit,
        amount: parseFloat(values.amount)
      }}
    >
      {(addTransaction, { loading, data, error }) => {
        if (error) {
          setErrors(true)
        } else {
          setErrors(false)
        }
        return (
          <FormContainer>
            <FormTitle>Add transaction here</FormTitle>
            <Form onSubmit={e => submitHandler(e, addTransaction)}>
              {error && errors && showErrors(error.graphQLErrors)}
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
              <Input id='merchant_id' name='merchant_id' onChange={changeHandler} placeholder='Merchant store number...' required type='number' value={values.merchant_id} />
              <label htmlFor='amount'>
                Amount:
              </label>
              <Input id='amount' min={0} name='amount' onChange={changeHandler} placeholder='$Amount...' required type='number' value={values.amount} />
              <SubmitButton type='submit'>Submit</SubmitButton>
            </Form>
          </FormContainer>
        )
      }}
    </Mutation>
  )
}

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.6);
  width: 30%;
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

const SubmitButton = styled.button`
  background-image: linear-gradient(60deg, #4d79ff, #809fff, #b3c6ff);
  color: #000;
  padding: 5px;
  margin-top: 10px;
  border: 0.5px solid #000066;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    background-image: linear-gradient(60deg, #b3c6ff, #809fff, #4d79ff);
    color: #e6e6e6;
  }
`

const Error = styled.div`
  background-color: red;
  width: 100%;
  text-align: center;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 14px;
`
