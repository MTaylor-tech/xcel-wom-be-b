const acme = [{ name: 'ACME Property Management' }];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('companies')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('companies').insert(acme);
    });
};
