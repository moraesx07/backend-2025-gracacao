/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('notificacoes_app', function(table) {
    table.increments('id').primary();
    table.integer('usuario_id').notNullable();
    table.string('mensagem').notNullable();
    table.timestamp('data_notificacao').notNullable();
    table.boolean('lida').defaultTo(false);
    
    // Foreign Key para garantir integridade
    table.foreign('usuario_id').references('id').inTable('users').onDelete('CASCADE');
  });
}
export function down(knex) {
  return knex.schema.dropTable('notificacoes_app');
}