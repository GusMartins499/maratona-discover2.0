const dataBase = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const account = await dataBase('accounts').where('id', id).select('name').first();

    if (!account) {
      return res.status(400).json({ error: "No found ACCOUNT with this ID" });
    }
    return res.json(account);
  }
}