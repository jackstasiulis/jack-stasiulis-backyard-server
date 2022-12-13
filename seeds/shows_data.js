// // import seed data files, arrays of objects
const showData = require('../seed_data/show');
const commentsData = require('../seed_data/comments')
const usersData = require('../seed_data/users')

exports.seed = function (knex) {
  
  return knex('users_data')
    .del()
    .then(function () {
      return knex('users_data').insert(usersData);
    })
    .then(() => {
      return knex('show_data').del();
    })
    .then(() => {
      return knex('show_data').insert(showData);
    })
    .then(() => {
      return knex('comments_data').del();
    })
    .then(() => {
      return knex('comments_data').insert(commentsData);
    })
};



