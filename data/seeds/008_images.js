const images = [
  {
    url:
      'https://media-cdn.tripadvisor.com/media/photo-s/0f/ef/f7/2e/broken-radiator-thermostat.jpg',
    user: '00ulthapbErVUwVJy4x6',
    workOrder: 1,
  },
  {
    url:
      'https://media-cdn.tripadvisor.com/media/photo-s/0d/fa/39/a5/broken-radiator-wowowow.jpg',
    user: '00ulthapbErVUwVJy4x6',
    workOrder: 1,
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('images')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert(images);
    });
};
