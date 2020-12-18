const wo = [
  {
    title: 'Broken Radiator Thermostat',
    description:
      'Radiator Thermo in Apt 224 is broken. Probably needs replaced.',
    company: 1,
    property: 1,
    createdBy: '00ulthapbErVUwVJy4x6',
    assignedTo: '00ulthapbErVUwVJy4x6',
    priority: 2,
    status: 1,
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('workOrders')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('workOrders').insert(wo);
    });
};
