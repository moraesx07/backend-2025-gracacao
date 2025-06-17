/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('controles_irrigacao', function(table) {
    table.increments('id').primary();
    table.integer('sistema_id').notNullable();
    table.enum('status', ['ligado', 'desligado']).notNullable();
    table.timestamp('data_controle').notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('controles_irrigacao');
}