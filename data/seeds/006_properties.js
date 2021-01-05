const lot_24 = [
  {
    name: 'Lot 24',
    address: '2404 Railroad St, Pittsburgh, PA 15222',
    imageUrl: 'https://bit.ly/3ajfoTV',
    company: 1,
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('properties')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('properties').insert(lot_24);
    });
};
