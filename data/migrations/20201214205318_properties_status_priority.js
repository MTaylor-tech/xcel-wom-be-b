exports.up = (knex) => {
  return knex.schema
    .createTable('properties', function (table) {
      table.increments('id').notNullable().unique().primary();
      table.string('name');
      table.string('address');
      table.string('imageUrl');
      table.integer('company').unsigned();
      table.foreign('company').references('companies.id');
    })
    .createTable('status', function (table) {
      table.increments('id').notNullable().unique().primary();
      table.string('name');
    })
    .createTable('priority', function (table) {
      table.increments('id').notNullable().unique().primary();
      table.string('name');
      table.string('color');
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('priority')
    .dropTableIfExists('status')
    .dropTableIfExists('properties');
};
