const dataBase = require('../database/connection');

module.exports = {
  async allTransactions(request, response) {
    const account_id = request.headers.authorization;
    const { description } = request.query;
    
    let sql = 'select `transactions`.* from `transactions` inner join `accounts` on `accounts`.`id` = `transactions`.`account_id` where `accounts`.`id` = ?'

    if (description != '') {
      sql += ` and transactions.description like '%${description}%'`
    }
    await dataBase.raw(sql, [account_id]).then(retJSON => {
      return response.json(retJSON);
    })
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

  async cardsTotal(request, response) {
    const account_id = request.headers.authorization;

    const sql = `select
    sum(CASE WHEN t.amount > 0 THEN t.amount ELSE 0 END) as income,
    sum(CASE WHEN t.amount < 0 THEN t.amount ELSE 0 END) as expense,
    sum((CASE WHEN t.amount > 0 THEN t.amount ELSE 0 END) + (CASE WHEN t.amount < 0 THEN t.amount ELSE 0 END)) as total
    from transactions t
    join accounts a on a.id = t.account_id
    where t.account_id = ?`

    await dataBase.raw(sql, [account_id]).then(retJSON => {
      return response.json(retJSON);
    })
  },

  async delete(request, response) {
    const { id } = request.params;

    await dataBase('transactions').where('id', id).delete();

    return response.status(204).send();
  }
}