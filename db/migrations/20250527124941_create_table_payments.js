/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('payments', function(table) {
    table.increments('id').primary();
    table.integer('user_id').notNullable().comment('quem realizou o pagamento');
    table.integer('user_control').comment('usuário que criou o registro');
    table.float('value').notNullable();
    table.text('receipt').notNullable();
    table.text('obs');
    table.timestamp('paymentdate').notNullable();
    table.boolean('verified').defaultTo(false).comment('verificado');
    table.text('photo').comment('link da foto');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');

    // Índices
    table.index(['paymentdate'], 'all_payment_of_date');
    table.index(['value'], 'range_of_value');
    table.index(['paymentdate', 'value'], 'payment_by_date_and_value');
    
    // Foreign Keys
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('user_control').references('id').inTable('users').onDelete('SET NULL');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('payments');
}
