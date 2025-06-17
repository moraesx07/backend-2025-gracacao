/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('leituras_umidade_solo', function(table) {
    table.increments('id').primary();
    table.integer('sistema_id').notNullable();
    table.decimal('nivel_umidade', 5, 2).notNullable();
    table.timestamp('data_leitura').notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('leituras_umidade_solo');
}