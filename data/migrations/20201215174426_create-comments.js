exports.up = (knex) => {
  return knex.schema.createTable('comments', function (table) {
    table.increments('id').notNullable().unique().primary();
    table.string('comment');
    table.string('author');
    table.foreign('author').references('profiles.id');
    table.integer('workOrder').unsigned();
    table.foreign('workOrder').references('workOrders.id');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('comments');
};
