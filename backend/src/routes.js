const express = require('express') //importou o express para "express"
//Selecionar uma palavra e dar CTRL +D, ele vai selecionar a mesma palavra no resto da linha e altera nas duas.. T
const OngController = require('./controllers/OngController')

const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router() // desaclopando o modulo de rotas do express em uma nova variável "routes"

/* usar quando for o parametro "query params"
    const params = request.query
    console.log(params) */
    /*usar quando for parametro "route params"
    const params = request.params
    console.log(params) */
    /*usamos "request body" para poder criar um usuario (corpo json) do lado do cliente (imsomnia fazendo este papel) para servidor em forma de JSON
    const body = request.body
    console.log(body) */

// POST // Validação do ID inserido para validar a existencia do ID da ONG para a sessão de entrada
routes.post('/sessions', SessionController.create)

// GET // LISTAGENS DE ONGS //Listar GET todos os dados da tabela ONGs
routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create) // ('/') "rota raiz" localhost e ('/entidade') e este entidade se chama o "recurso" da rota.
// POST // Cria as Ongs // Nesta parte, momento que retorna do backend para cliente (localhost:3333)

//GET //LISTAGEM OU BUSCA DE TODOS OS CASOS ESPECIFICOS DA ONG
routes.get('/profile', ProfileController.index)
//GET // LISTAGEM DOS CASOS DA ONG

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
// POST // Cria os casos da ONG pelo ID já incrementada // cliente --> servidor
//DELETE // tota para deletar um caso pelo id da ONG (parametro route params)
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes // exporta os dados (rotas) daqui para o index importar.