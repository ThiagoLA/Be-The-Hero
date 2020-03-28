const connection = require('../database/connection')

module.exports = { 
    async create(request, response){
        //solicitação // //VERIFICAR SE A ONG REALMENTE EXISTE PARA FAZER ENTRADA DA SESSÃO LOGIN
        const { id } = request.body //atribuindo corpo da requisição (cliente - chome, imsomnia)

        const ong = await connection('ongs') // buscando ONGS
        .where('id', id) // onde o ID será o id inserido pelo cliente
        .select('name') // vamos retornar "nome" no front end
        .first(); // irá retornar uma única ONG // retorna apenas um resultado! neste caso o "nome"
        
        //respostas     
        if (!ong ){ // se ONG não existir
            return response.status(400).json({ ERRO: 'ONG não encontrada com esse ID'}) //status(400) significa que algo deu errado
        }//se for encontrado retornara os dados que será seu "nome"
        return response.json(ong)
    }
}
// o logout nao chega a sere uma rota no backend. Sera feito no Front-end somente retornando para pagina de login. 