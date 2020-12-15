exports.up = (knex) => {
  return knex.schema
    .createTable('workOrders', function (table) {
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
    })
    .createTable('comments', function (table) {
      table.increments('id').notNullable().unique().primary();
      table.string('comment');
      table.string('author');
      table.foreign('author').references('profiles.id');
      table.integer('workOrder').unsigned();
      table.foreign('workOrder').references('workOrders.id');
    })
    .createTable('images', function (table) {
      table.increments('id').notNullable().unique().primary();
      table.string('url');
      table.string('user');
      table.foreign('user').references('profiles.id');
      table.integer('workOrder').unsigned();
      table.foreign('workOrder').references('workOrders.id');
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('images')
    .dropTableIfExists('comments')
    .dropTableIfExists('workOrders');
};
