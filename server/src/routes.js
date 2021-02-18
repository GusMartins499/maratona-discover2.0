const express = require('express');

const TransactionsController = require('./controllers/TransactionsControllers');

const routes = express.Router();

routes.get('/alltransactions', TransactionsController.allTransactions);
routes.post('/newtransaction', TransactionsController.createTransaction);
routes.delete('/removetransaction/:id', TransactionsController.delete);

module.exports = routes;