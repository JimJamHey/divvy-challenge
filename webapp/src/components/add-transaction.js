import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import alert from 'sweetalert2'
// import { Mutation } from 'react-apollo'
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
  // console.log(props)
  const [values, setValues] = useState({ ...initialState })
  // const [errors, setErrors] = useState(false)
  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [{
      query: GET_TRANSACTIONS
    }],
    onCompleted: () => props.history.push('/')
    // variables={{
    //   ...values,
    //   merchant_id: parseFloat(values.merchant_id),
    //   amount: parseFloat(values.amount)
    // }}
  })

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

  //   const showErrors = errors => {
  //     return errors.map((err, index) => <Error key={index}>{err.message}</Error>)
  //   }

  return (
    <div>
      <h1>Add transaction here</h1>
      <form onSubmit={e => submitHandler(e, addTransaction)}>
        <label>
          <input name='user_id' onChange={changeHandler} placeholder='User ID...' readOnly type='number' value={values.user_id} />
        </label>
        <label>
          <input name='description' onChange={changeHandler} placeholder='Description...' required type='text' value={values.description} />
        </label>
        <label>
          <select onChange={e => selectHandler(e)} value={values.credit ? 'credit' : 'debit'}>
            {labelOptions.map((x, index) => (
              <option key={index} value={x.value}>
                {x.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <input name='merchant_id' onChange={changeHandler} placeholder='merchantID...(input merchant store number)' required type='number' value={values.merchant_id} />
        </label>
        <label>
          <input min={0} name='amount' onChange={changeHandler} placeholder='$Amount...' required type='number' value={values.amount} />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
    // <form onSubmit={e => submitHandler(e, addTransaction)}>
    //   {error && errors && renderErrors(error.graphQlErrors)}
    //   <h1>Add a new transaction</h1>
    //   <label htmlFor='description'>
    //     Description
    //   </label>
    //   <input>
    //     id='description',
    //     name='description',
    //     onChange={changeHandler},
    //     placeholder='Description...',
    //     required,
    //     value={values.description}
    //   </input>
    //   <button>Submit</button>
    // </form>
  )
}
