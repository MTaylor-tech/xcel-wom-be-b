exports.up = (knex) => {
  return knex.schema.table('profiles', function (table) {
    table.integer('role').unsigned();
    table.foreign('role').references('roles.id');
    table.integer('company').unsigned();
    table.foreign('company').references('companies.id');
  });
};

exports.down = (knex) => {
  return knex.schema.table('profiles', function (table) {
    table.dropForeign('company');
    table.dropColumn('company');
    table.dropForeign('role');
    table.dropColumn('role');
  });
};
