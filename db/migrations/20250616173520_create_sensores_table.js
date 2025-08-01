/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('sensores', function(table) {
    table.increments('id').primary();
    table.integer('id_usuario').notNullable();
    table.string('localizacao');
    table.timestamp('data_instalacao');
    
    // Foreign Key
    table.foreign('id_usuario').references('id').inTable('users').onDelete('CASCADE');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('sensores');
}
