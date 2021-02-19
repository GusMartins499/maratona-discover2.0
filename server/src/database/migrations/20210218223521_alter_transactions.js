
exports.up = function(knex) {
  return knex.schema.table('transactions', table => {
    table.string('account_id').notNullable();
    table.foreign('account_id').references('id').inTable('accounts')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('transactions')
};
