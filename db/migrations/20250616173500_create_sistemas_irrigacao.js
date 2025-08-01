/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('sistemas_irrigacao', function(table) {
    table.increments('id').primary();
    table.integer('usuario_id').notNullable();
    table.string('nome_sistema').notNullable();
    table.string('localizacao').notNullable();
    
    // Foreign Key
    table.foreign('usuario_id').references('id').inTable('users').onDelete('CASCADE');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('sistemas_irrigacao');
}
