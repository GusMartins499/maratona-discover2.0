const dataBase = require('../database/connection');

module.exports = {
  async allTransactions(request, response) {
    const allTransactions = await dataBase('transactions').select('*');

    return response.json(allTransactions);
  },

  async createTransaction(request, response) {
    const { description, amount, date } = request.body;

    const transaction = {
      description,
      amount,
      date
    }
    await dataBase('transactions').insert({
      description,
      amount,
      date
    });

    return response.status(201).json(transaction);
  },

  async delete(request, response) {
    const { id } = request.params;

    await dataBase('transactions').where('id', id).delete();

    return response.status(204).send();
  }
}