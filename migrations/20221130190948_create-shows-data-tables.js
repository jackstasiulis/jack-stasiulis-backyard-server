/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema
    .createTable('show_data', (table) => {
        table.increments('show_id').primary();
        table.string('image').notNullable();
        table.string('artist').notNullable();
        table.string('date').notNullable();
        table.string('venue').notNullable();
        table.string('address').notNullable();
        table.string('doors').notNullable();
        table.string('genre').notNullable();
        table.timestamp('show_posted_at').defaultTo(knex.fn.now());
    })
    .createTable('comments_data', (table) => {
        table.increments('comment_id').primary();
        table.string('username').notNullable();
        table.timestamp('timestamp').defaultTo(knex.fn.now());
        table.string('comment_body').notNullable()
        table.integer('likes').notNullable()
        table.integer('show_id').unsigned()
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
  return knex.schema.dropTable('comments_data').dropTable('show_data')
};
