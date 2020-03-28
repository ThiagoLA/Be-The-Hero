// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite' // diretório do arquivo banco de dados armazenado com as migrations (tabelas)
    },
    migrations: { // diretorio onde minhas migrations serão criadas e armazenadas (tabelas relacionadas)
      directory: './src/database/migrations'
    },//no momento da execução do npx knex migrate: make create_ongs aparece o erro, para isso:
    useNullAsDefault: true, // criamos está linha e definimos este uso de tabelas nulas como padrão nas colunas do BD
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
