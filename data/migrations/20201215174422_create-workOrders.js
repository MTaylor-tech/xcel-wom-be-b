exports.up = (knex) => {
  return knex.schema.createTable('workOrders', function (table) {
    table.increments('id').notNullable().unique().primary();
    table.string('title');
    table.string('description');
    table.integer('company').unsigned();
    table.foreign('company').references('companies.id');
    table.integer('property').unsigned();
    table.foreign('property').references('properties.id');
    table.string('createdBy');
    table.foreign('createdBy').references('profiles.id');
    table.string('assignedTo');
    table.foreign('assignedTo').references('profiles.id');
    table.integer('priority').unsigned();
    table.foreign('priority').references('priority.id');
    table.integer('status').unsigned();
    table.foreign('status').references('status.id');
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('workOrders');
};
