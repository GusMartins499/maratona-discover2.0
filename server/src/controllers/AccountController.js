const crypto = require('crypto');
const dataBase = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { name, email } = request.body;

    const id = crypto.randomBytes(4).toString('hex');

    await dataBase('accounts').insert({
      id,
      name,
      email,
    })
    return response.status(201).json({id});
  }
}