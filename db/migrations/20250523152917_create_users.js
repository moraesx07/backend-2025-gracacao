/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
   return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.text('username').notNullable();
    table.text('email').notNullable().unique();
    table.text('password').defaultTo('123456');
    table.string('role').defaultTo('user').comment('admin/parcial/comum');
    table.text('photo').comment('link da foto');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');

    // Índices personalizados
    table.index(['email', 'password'], 'login');
    table.index(['username'], 'name');
    table.unique('email', {indexName: 'unique_email'});
   });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('users');
}
