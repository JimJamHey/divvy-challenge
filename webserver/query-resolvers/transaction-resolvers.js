const { TransactionModel } = require('../data-models/Transaction')
const { packageModel } = require('./utils.js')

async function find(criteria) {
  const query = Object.keys(criteria).length
    ? TransactionModel.find(criteria)
    : TransactionModel.find()

  const transactions = await query.exec()

  return packageModel(transactions)
}

async function edit(criteria) {
  const query = TransactionModel.findByIdAndUpdate(criteria.id, criteria)
  const editTransaction = await query.exec()

  return packageModel(editTransaction)
}

async function findOne(id) {
  const query = TransactionModel.findById(id)
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

module.exports = {
  find,
  edit,
  findOne
}
