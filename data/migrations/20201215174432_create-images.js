exports.up = (knex) => {
  return knex.schema.createTable('images', function (table) {
    table.increments('id').notNullable().unique().primary();
    table.string('url');
    table.string('user');
    table.foreign('user').references('profiles.id');
    table.integer('workOrder').unsigned();
    table.foreign('workOrder').references('workOrders.id');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('images');
};
