const express = require('express');
const routes = require('./routes');

const app = express();
app.use(cors()); //Em DEV vai usar mais simples, mas se o app estivesse em produção colocaria origen: 'http://dominiodoap.com'. assim somente esse server poderia acessar essa parte.

//const obj = 'Eae, to codano mais falta muito ainda brow';

app.use(express.json());
app.use(routes); // esse comando precisa ficar abaixo do comando acima. 

app.listen(3333);

/**
 * GET: Buscar/listar uma informação no back-end
 * POST:Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tios de Parâmetros: 
 * 
 * Query Params: Parâmetros nomeados enviados na rota aos a "?" (filtros, paginação)
 *  Ex. 1 - http://localhost:3333/users?name=Thiago
 *      2 - http://localhost:3333/users?page=2&name=Thiago&idade=25 
 * 
 * //app.get('/users', (request, response) => {
  //const params = request.query;
  // console.log(params);

 * 
 * Route Params: Parâmetros utilizados para identificar recursos (o que vem dopois do :3333/) 
 *       Ex. 1 - http://localhost:3333/users/1  --> no insominia
 * 
 * //app.get('/users/:id', (request, response) => {
  //const params = request.params;
  // console.log(params);
 * 
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 *       Ex. 1 - http://localhost:3333/users
 * 
 * app.use(express.json());
 * 
 *  app.post('/users', (request, response) => {
    const body = request.body;
    console.log(body);
 */

//app.get('/users/:id', (request, response) => {
  //const params = request.params;
  // console.log(params);

 /** 
  app.post('/users', (request, response) => {
  const params = request.query;
  console.log(params);
   */

  //return response.send('Hello World')
  //return response.json({obj})   
 
  



