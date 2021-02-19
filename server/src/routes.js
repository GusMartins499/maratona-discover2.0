const express = require('express');

const TransactionsController = require('./controllers/TransactionsController');
const AccountController = require('./controllers/AccountController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/alltransactions', TransactionsController.allTransactions);
routes.post('/newtransaction', TransactionsController.createTransaction);
routes.delete('/removetransaction/:id', TransactionsController.delete);

routes.post('/newaccount', AccountController.create);

routes.post('/sessions', SessionController.create);

module.exports = routes;