/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('umidade_solo', function(table) {
    table.increments('id').primary();
    table.integer('id_sensor').notNullable().references('id').inTable('sensores');
    table.decimal('umidade', 5, 2).comment('Percentual de umidade do solo (0 a 100%)');
    table.timestamp('data_medicao');
  });
}

export function down(knex) {
  return knex.schema.dropTable('umidade_solo');
}