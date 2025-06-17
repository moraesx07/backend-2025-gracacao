/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('configuracoes_usuario', function(table) {
    table.dropForeign('id_usuario');
    table.foreign('id_usuario').references('users.id').onDelete('CASCADE');
  });
}

export async function down(knex) {
  await knex.schema.alterTable('configuracoes_usuario', function(table) {
    table.dropForeign('id_usuario');
    table.foreign('id_usuario').references('users.id');
  });
}