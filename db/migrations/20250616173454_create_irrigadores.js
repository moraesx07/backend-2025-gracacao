/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('irrigadores', function(table) {
    table.increments('id').primary();
    table.integer('id_usuario').notNullable();
    table.boolean('status');
    table.timestamp('data_ultima_ativacao');
    
    // Foreign Key
    table.foreign('id_usuario').references('id').inTable('users').onDelete('CASCADE');
  });
}

export function down(knex) {
  return knex.schema.dropTable('irrigadores');
}