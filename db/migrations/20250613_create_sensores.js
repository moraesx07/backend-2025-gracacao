/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('sensores', function (table) {
    table.increments('id').primary();
    table.integer('id_usuario').notNullable()
      .references('id').inTable('usuarios')
      .onDelete('CASCADE');
    table.string('localizacao');
    table.timestamp('data_instalacao').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('sensores');
}
