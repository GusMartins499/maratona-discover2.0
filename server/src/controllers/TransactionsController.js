const dataBase = require('../database/connection');

module.exports = {
  async allTransactions(request, response) {
    const account_id = request.headers.authorization;

    const allTransactions = await dataBase('transactions')
      .join('accounts', 'accounts.id', '=', 'transactions.account_id')
      .where('accounts.id', '=', `${account_id}`)
      .select([
        'transactions.*'
      ])

    return response.json(allTransactions);
  },

  async createTransaction(request, response) {
    const { description, amount, date } = request.body;
    const account_id = request.headers.authorization;

    await dataBase('transactions').insert({
      description,
      amount,
      date,
      account_id
    });

    return response.status(201).json({ "message": "Criado com sucesso !" });
  },

  async delete(request, response) {
    const { id } = request.params;

    await dataBase('transactions').where('id', id).delete();

    return response.status(204).send();
  }
}