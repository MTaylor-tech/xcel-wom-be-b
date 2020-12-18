const roles = [
  { name: 'Admin', company: 1, userLevel: 4 },
  { name: 'Property Manager', company: 1, userLevel: 4 },
  { name: 'IT', company: 1, userLevel: 4 },
  { name: 'Supervisor', company: 1, userLevel: 3 },
  { name: 'Maintenance', company: 1, userLevel: 2 },
  { name: 'Tenant', company: 1, userLevel: 1 },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('roles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert(roles);
    });
};
