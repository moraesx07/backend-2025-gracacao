/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('mensagens_mqtt', function(table) {
    table.increments('id').primary();
    table.integer('sistema_id').notNullable();
    table.string('tipo_mensagem').notNullable();
    table.text('payload').notNullable();
    table.timestamp('data_envio').notNullable();
    
    // Foreign Key
    table.foreign('sistema_id').references('id').inTable('sistemas_irrigacao').onDelete('CASCADE');
  });
}
export function down(knex) {
  return knex.schema.dropTable('mensagens_mqtt');
}