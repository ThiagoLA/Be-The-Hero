const crypto = require('crypto') // importanto uma função de criptografia de caracteres para fazer criar um id
const connection = require('../database/connection') // obtendo CONEXÃO com BD por meio do arquivo connection

module.exports = {
    async index(request, response) { //nome do metodo/funçaão "index"
        //LISTAGENS DE ONGS 
        const ongs = await connection('ongs').select('*') //atribuição por meio da conexão da tabela "ONGS" selecionar todos os registros "*"
        return response.json(ongs) //retorna a tabelas da Ongs em forma de json
    }, // Não esquecer das virgulas entre as entidades

    async create(request, response) { //nome do metodo/ função "create"
        // request (solicitação): Guarda todos os dados solicitados pelo cliente (navegador, insomnia = teste)
        // response (resposta): Responsável por retornar uma resposta para o usuário

        // Criação de ONgs ou Logins // metodo request body 
        const { name, email, whatsapp, city, uf } = request.body //solicitaçãp do corpo atribuido em data (ESTA SOLICITANDO O CORPO DO CLIENTE PARA --> BACKEND )
        const id = crypto.randomBytes(4).toString('HEX') // atribuindo 4 bytes aletorios em string de formato hexadecimal

        /* CADASTRO */ //Await: agurda primeiro o cliente inserir dados para depois retornar a resposta no "response"
        await connection('ongs').insert({ // usando o connection, em relação a tabela ongs para poder inserir dados para cadastro
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        return response.json({ id }) // retorna com responder com objeto com parametro do ID para o ONG após o cadastro
    }
}