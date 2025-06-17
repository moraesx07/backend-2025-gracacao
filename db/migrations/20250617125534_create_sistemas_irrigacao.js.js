/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('sistemas_irrigacao', function(table) {
    table.dropForeign('usuario_id');
    table.foreign('usuario_id').references('users.id').onDelete('CASCADE');
  });
}

export async function down(knex) {
  await knex.schema.alterTable('sistemas_irrigacao', function(table) {
    table.dropForeign('usuario_id');
    table.foreign('usuario_id').references('users.id');
  });
}