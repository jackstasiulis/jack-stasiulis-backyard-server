/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema

  .createTable('users_data', (table) => {
    table.uuid('users_id').primary();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('avatar').notNullable();
  })
    .createTable('show_data', (table) => {
        table.uuid('show_id').primary();
        table.string('image').notNullable();
        table.string('artist').notNullable();
        table.string('date').notNullable();
        table.string('venue').notNullable();
        table.string('address').notNullable();
        table.string('doors').notNullable();
        table.string('genre').notNullable();
        table.string('description').notNullable();
        table.timestamp('show_posted_at').defaultTo(knex.fn.now());
        table.uuid('users_id')
            .references('users_id')
            .inTable('users_data')
            .onUpdate('cascade')
            .onDelete('cascade');
    })
    .createTable('comments_data', (table) => {
        table.uuid('comments_id').primary();
        table.timestamp('timestamp').defaultTo(knex.fn.now());
        table.string('comments_body').notNullable()
        table.integer('likes').notNullable()
        table.uuid('users_id')
            .references('users_id')
            .inTable('users_data')
            .onUpdate('cascade')
            .onDelete('cascade');
        table.uuid('show_id')
            .references('show_id')
            .inTable('show_data')
            .onUpdate('cascade')
            .onDelete('cascade');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
  return knex.schema
  .dropTable('comments_data')
  .dropTable('show_data')
  .dropTable('users_data')
};
