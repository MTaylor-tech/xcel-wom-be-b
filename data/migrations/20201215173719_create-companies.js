exports.up = (knex) => {
  return knex.schema.createTable('companies', function (table) {
    table.increments('id').notNullable().unique().primary();
    table.string('name');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('companies');
};
