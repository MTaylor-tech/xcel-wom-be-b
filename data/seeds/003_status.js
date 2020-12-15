const statuses = [
  { name: 'Unassigned' },
  { name: 'Open' },
  { name: 'In Progress' },
  { name: 'Awaiting Review' },
  { name: 'Complete' },
  { name: 'Archived' },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('status')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('status').insert(statuses);
    });
};
