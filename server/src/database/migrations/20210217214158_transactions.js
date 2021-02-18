
exports.up = async function(knex) {
  return knex.schema.createTable('transactions', table => {
    table.increments('id').primary();
    table.string('description');
    table.string('amount');
    table.date('date');
  })
};

exports.down = async function(knex) {
  return knex.schema.dropTable('transactions');
};
