const express = require('express');

const TransactionsController = require('./controllers/TransactionsController');
const AccountController = require('./controllers/AccountController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/', (request, response) => {
  return (
    response.json({ message: 'API DEV.FINANCE$' })
  )
})

routes.get('/alltransactions', TransactionsController.allTransactions);
routes.post('/newtransaction', TransactionsController.createTransaction);
routes.delete('/removetransaction/:id', TransactionsController.delete);
routes.get('/totalcards', TransactionsController.cardsTotal);

routes.post('/newaccount', AccountController.create);

routes.post('/sessions', SessionController.create);

module.exports = routes;