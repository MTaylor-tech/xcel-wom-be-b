const priorities = [
  { name: 'Critical', color: '#F03911' },
  { name: 'High', color: '#F7931B' },
  { name: 'Medium', color: '#F4F71B' },
  { name: 'Low', color: '#5AF71B' },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('priority')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('priority').insert(priorities);
    });
};
