// import seed data files, arrays of objects
const showData = require('../seed_data/show');
const commentData = require('../seed_data/comments')

exports.seed = function (knex) {
  return knex('show_data')
    .del()
    .then(function () {
      return knex('show_data').insert(showData);
    })
    .then(() => {
      return knex('comments_data').del();
    })
    .then(() => {
      return knex('comments_data').insert(commentData);
    })
    // .then(() => {
    //   return knex(showData).join(commentData);
    // })
};