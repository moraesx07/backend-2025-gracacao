/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('configuracoes_usuario', function(table) {
    table.increments('id').primary();
    table.integer('id_usuario').notNullable();
    table.decimal('umidade_minima', 5, 2);
    table.decimal('umidade_maxima', 5, 2);
    table.boolean('modo_manual');
    
    // Foreign Key
    table.foreign('id_usuario').references('id').inTable('users').onDelete('CASCADE');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('configuracoes_usuario');
}
