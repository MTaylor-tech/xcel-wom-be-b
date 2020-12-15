exports.up = (knex) => {
  return knex.schema
    .createTable('companies', function (table) {
      table.increments('id').notNullable().unique().primary();
      table.string('name');
    })
    .createTable('roles', function (table) {
      table.increments('id').notNullable().unique().primary();
      table.string('name');
      table.integer('userLevel');
      table.integer('company').unsigned();
      table.foreign('company').references('companies.id');
    })
    .table('profiles', function(table) {
      table.integer('role').unsigned();
      table.foreign('role').references('roles.id');
      table.integer('company').unsigned();
      table.foreign('company').references('companies.id');
    });
};

exports.down = (knex) => {
  return knex.schema
    .table('profiles', function (table) {
      table.dropForeign('company');
      table.dropColumn('company');
      table.dropForeign('role');
      table.dropColumn('role')
    })
    .dropTableIfExists('roles')
    .dropTableIfExists('companies');
};
