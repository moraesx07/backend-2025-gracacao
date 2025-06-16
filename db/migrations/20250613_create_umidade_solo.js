/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('umidade_solo', function (table) {
    table.increments('id').primary();
    table.integer('id_sensor').notNullable()
      .references('id').inTable('sensores')
      .onDelete('CASCADE');
    table.decimal('umidade', 5, 2).notNullable()
      .comment('Percentual de umidade do solo (0 a 100%)');
    table.timestamp('data_medicao').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('umidade_solo');
}

