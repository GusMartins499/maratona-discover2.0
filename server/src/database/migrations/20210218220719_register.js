
exports.up = function(knex) {
  return knex.schema.createTable('accounts', table => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').unique();

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('accounts');
};
