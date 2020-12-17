exports.up = (knex) => {
  return knex.schema.createTable('priority', function (table) {
    table.increments('id').notNullable().unique().primary();
    table.string('name');
    table.string('color');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('priority');
};
