/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('irrigadores', function (table) {
    table.increments('id').primary();
    table.integer('id_usuario').notNullable()
      .references('id').inTable('usuarios')
      .onDelete('CASCADE');
    table.boolean('status').defaultTo(false);
    table.timestamp('data_ultima_ativacao');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('irrigadores');
}
