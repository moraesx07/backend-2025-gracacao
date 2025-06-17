/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  // Remove a foreign key antiga e cria com CASCADE
  await knex.schema.alterTable('sensores', function(table) {
    table.dropForeign('id_usuario');
    table.foreign('id_usuario').references('users.id').onDelete('CASCADE');
  });
}

export async function down(knex) {
  await knex.schema.alterTable('sensores', function(table) {
    table.dropForeign('id_usuario');
    table.foreign('id_usuario').references('users.id');
  });
}