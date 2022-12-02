// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> } 
//  */
// exports.seed = async function(knex) {
//   // Deletes ALL existing entries
//   await knex('table_name').del()
//   await knex('table_name').insert([
//     {id: 1, colName: 'rowValue1'},
//     {id: 2, colName: 'rowValue2'},
//     {id: 3, colName: 'rowValue3'}
//   ]);
// };

// import seed data files, arrays of objects
const showsData = require('../seed_data/shows');

exports.seed = function (knex) {
  return knex('shows-details')
    .del()
    .then(function () {
      return knex('shows-details').insert(showsData);
    });
};
