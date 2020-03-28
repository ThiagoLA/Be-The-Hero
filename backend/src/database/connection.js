/**
const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;
 */

const knex = require('knex') // atribuição de importação da função knex
const configuration = require('../../knexfile') // atribuindo as configurações do framework knexfile (dados do BD e as tabelas)

const connection = knex(configuration.development) // atribuição da configurações das funções developments

module.exports = connection // exportanto todos estes dados do connection