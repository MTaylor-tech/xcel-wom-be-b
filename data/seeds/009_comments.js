const comments = [
  {
    comment: 'Still waiting for the part. It should be in by Monday.',
    author: '00ulthapbErVUwVJy4x6',
    workOrder: 1,
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('comments')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert(comments);
    });
};
