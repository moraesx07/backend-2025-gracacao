PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE `knex_migrations` (`id` integer not null primary key autoincrement, `name` varchar(255), `batch` integer, `migration_time` datetime);
INSERT INTO knex_migrations VALUES(2,'20250523152917_create_users.js',1,1748349619622);
INSERT INTO knex_migrations VALUES(3,'20250527124941_create_table_payments.js',2,1748350623194);
INSERT INTO knex_migrations VALUES(4,'20250605104736_create_user_admin.js',3,1749120930510);
INSERT INTO knex_migrations VALUES(5,'20250616173454_create_irrigadores.js',4,1750095442427);
INSERT INTO knex_migrations VALUES(6,'20250616173559_create_umidade_solo.js',4,1750095442428);
INSERT INTO knex_migrations VALUES(7,'20250616173629_create_sensores.js',4,1750095442430);
INSERT INTO knex_migrations VALUES(8,'20250616173702_create_configuracoes_usuarios.js',4,1750095442431);
INSERT INTO knex_migrations VALUES(9,'20250617121008_create_controles_irrigacao.js',5,1750162255333);
INSERT INTO knex_migrations VALUES(10,'20250617121903_create_leituras_umidade_solo.js',6,1750162766690);
INSERT INTO knex_migrations VALUES(11,'20250617125133_create_messagens_mqtt.js',7,1750164715502);
INSERT INTO knex_migrations VALUES(12,'20250617125534_create_sistemas_irrigacao.js.js',8,1750165316879);
INSERT INTO knex_migrations VALUES(13,'20250617125556_create_notificacoes_app.js.js',8,1750165316880);
CREATE TABLE `knex_migrations_lock` (`index` integer not null primary key autoincrement, `is_locked` integer);
INSERT INTO knex_migrations_lock VALUES(1,0);
CREATE TABLE `users` (`id` integer not null primary key autoincrement, `username` text not null, `email` text not null, `password` text default '123456', `role` varchar(255) default 'user', `photo` text, `created_at` datetime default CURRENT_TIMESTAMP, `updated_at` datetime);
INSERT INTO users VALUES(1,'joao atualizado','joao2@email.com','admin','admin',NULL,'2025-06-05 10:55:30',NULL);
INSERT INTO users VALUES(9,'guilherme','gui@gmail.com','123456','user',NULL,'2025-06-16 12:24:48',NULL);
INSERT INTO users VALUES(10,'Kerry Christiansen III','Sterling.Swift48@yahoo.com','123456','user',NULL,'2025-06-16 21:02:17',NULL);
INSERT INTO users VALUES(11,'joao','joao@email.com','123456','user',NULL,'2025-06-17 13:04:48',NULL);
CREATE TABLE `payments` (`id` integer not null primary key autoincrement, `user_id` integer not null, `user_control` integer, `value` float not null, `receipt` text not null, `obs` text, `paymentdate` datetime not null, `verified` boolean default '0', `photo` text, `created_at` datetime default CURRENT_TIMESTAMP, `updated_at` datetime);
INSERT INTO payments VALUES(2,1,2,120.5,'Recibo 1223','Pagamento de teste','2025-06-16T12:00:00Z',0,'http://link-da-foto.com/foto.jpg','2025-06-16 17:26:48',NULL);
CREATE TABLE `irrigadores` (`id` integer not null primary key autoincrement, `id_usuario` integer not null, `status` boolean, `data_ultima_ativacao` datetime, foreign key(`id_usuario`) references `users`(`id`));
INSERT INTO irrigadores VALUES(2,1,1,'2025-06-17T12:00:00Z');
CREATE TABLE `umidade_solo` (`id` integer not null primary key autoincrement, `id_sensor` integer not null, `umidade` float, `data_medicao` datetime, foreign key(`id_sensor`) references `sensores`(`id`));
INSERT INTO umidade_solo VALUES(4,7,55.5,'2024-06-17T12:00:00Z');
CREATE TABLE `sensores` (`id` integer not null primary key autoincrement, `id_usuario` integer not null, `localizacao` varchar(255), `data_instalacao` datetime, foreign key(`id_usuario`) references `users`(`id`));
INSERT INTO sensores VALUES(7,1,'Estufa 1','2024-06-17T12:00:00Z');
CREATE TABLE `configuracoes_usuario` (`id` integer not null primary key autoincrement, `id_usuario` integer not null, `umidade_minima` float, `umidade_maxima` float, `modo_manual` boolean, foreign key(`id_usuario`) references `users`(`id`));
CREATE TABLE `controles_irrigacao` (`id` integer not null primary key autoincrement, `sistema_id` integer not null, `status` text check (`status` in ('ligado', 'desligado')) not null, `data_controle` datetime not null);
INSERT INTO controles_irrigacao VALUES(1,2,'ligado','2025-06-17T14:00:00Z');
CREATE TABLE `leituras_umidade_solo` (`id` integer not null primary key autoincrement, `sistema_id` integer not null, `nivel_umidade` float not null, `data_leitura` datetime not null);
CREATE TABLE `mensagens_mqtt` (`id` integer not null primary key autoincrement, `sistema_id` integer not null, `tipo_mensagem` varchar(255) not null, `payload` text not null, `data_envio` datetime not null);
CREATE TABLE `sistemas_irrigacao` (`id` integer not null primary key autoincrement, `usuario_id` integer not null, `nome_sistema` varchar(255) not null, `localizacao` varchar(255) not null);
CREATE TABLE `notificacoes_app` (`id` integer not null primary key autoincrement, `usuario_id` integer not null, `mensagem` varchar(255) not null, `data_notificacao` datetime not null, `lida` boolean default '0');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('knex_migrations_lock',1);
INSERT INTO sqlite_sequence VALUES('knex_migrations',13);
INSERT INTO sqlite_sequence VALUES('users',11);
INSERT INTO sqlite_sequence VALUES('payments',3);
INSERT INTO sqlite_sequence VALUES('sensores',7);
INSERT INTO sqlite_sequence VALUES('umidade_solo',5);
INSERT INTO sqlite_sequence VALUES('irrigadores',3);
INSERT INTO sqlite_sequence VALUES('configuracoes_usuario',2);
INSERT INTO sqlite_sequence VALUES('controles_irrigacao',1);
INSERT INTO sqlite_sequence VALUES('mensagens_mqtt',1);
INSERT INTO sqlite_sequence VALUES('notificacoes_app',1);
INSERT INTO sqlite_sequence VALUES('sistemas_irrigacao',1);
INSERT INTO sqlite_sequence VALUES('leituras_umidade_solo',1);
CREATE UNIQUE INDEX `users_email_unique` on `users` (`email`);
CREATE INDEX `login` on `users` (`email`, `password`);
CREATE INDEX `name` on `users` (`username`);
CREATE INDEX `all_payment_of_date` on `payments` (`paymentdate`);
CREATE INDEX `range_of_value` on `payments` (`value`);
CREATE INDEX `payment_by_date_and_value` on `payments` (`paymentdate`, `value`);
COMMIT;
