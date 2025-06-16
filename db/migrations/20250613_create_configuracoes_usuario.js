/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('configuracoes_usuario', function (table) {
    table.increments('id').primary();
    table.integer('id_usuario').notNullable()
      .references('id').inTable('usuarios')
      .onDelete('CASCADE');
    table.decimal('umidade_minima', 5, 2)
      .comment('Umidade mínima para ativar a irrigação');
    table.decimal('umidade_maxima', 5, 2)
      .comment('Umidade máxima para desativar a irrigação');
    table.boolean('modo_manual')
      .comment('Se o usuário deseja controlar manualmente o irrigador');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('configuracoes_usuario');
}
