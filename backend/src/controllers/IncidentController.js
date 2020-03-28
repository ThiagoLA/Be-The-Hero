//Para seguir o método MVC um controller não deve ter  doque 5 métodos. Se precisar de mais métodos deve-se criar um novo Controller. 

const connection = require('../database/connection')

module.exports = {
    async index(request, response){ 
        const { page = 1 } = request.query // fazendo solicitação (paramentro query params: ?page=2) para esquema de paginação
        // ESQUEMA DE PAGINAÇÃO // este valor acima  1 é padrão caso não for definido o valor, será inserido o valor DIFERENTE no momento da inserção do valor pelo navegador/insominia (cliente com - request body " ?page= ")

        const [count] = await connection('incidents').count() //retorna para mim no backend todos os registros de casos da ong ()

        // Poderia ser tb [count 0]
        //console.log(count);
        
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // trazer e juntar(join), onde o id da table ong "seja igual" id do table incident
        //  esquema de paginação
        .limit('5') // limitar 5 registros de casos na primeira página
        .offset((page - 1) * 5) // aqui vai começa com valor 1 --> 1 - 1 = 0 e 0*5 = 0, então na primeira pagina (0) serão apresentadas somente os 5 primeiros registros
        .select([ // apos usar o comando "join" estamos escolhendo os adados especificos que queremos apresentar para o cliente.
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]); // solicitação "request" // LISTAR TODOS OS CASOS DA ONG

        //responta de total de registros da lista para o cliente (browser/usuario/imnsomnia), assim O FRONT ira saber que não mais registros na proxima página.
        response.header('X-Total-Count', count['count(*)']) // este comando irá servir futuramente para desenvolver o front end.

        return response.json(incidents) // resposta "response"
    },

    async create(request, response){    
        // solicitações "request"
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization // atribuição da autenticação com usuario da ONG já criada.
        // CADASTRAR/ CRIAR dos casos da ONG para gerar o ID do caso já auto encremento
        const [id] = await connection('incidents').insert({
            //colunas do BD
            title,
            description,
            value,
            ong_id, // id da ONG que criou este caso
        })
        return response.json({ id }) // resposta
    },
    // DELETAR CASOS DA ONG ESPECIFICO POR MEIO DE ID (route params)
    async delete(request, response){            
        //Solicitação
        const { id } = request.params // atribuindo o id inserido no cliente que é a ONG (route params -identifica recursos)
        const ong_id = request.headers.authorization  

        const incident = await connection('incidents')
        // Especificações do id que irá ser excluído
         .where('id', id) // onde o di for igual ao id da ong
         .select('ong_id') //apenas a coluna ong_id 
         .first(); // vai retornar um resultado 

        if (incident.ong_id !=  ong_id) { // se na tabela incidente o ID for diferente do id da ONG
            return response.status(401).json({ // ao usar "status" estamos trocando o resultado pelo "insominia" por padrão com sucesso é "status(200)"
                ERRO: 'Operação não permitida - Erro 401.'  // status(401): usuário não tem autorização de sua ação pelo browser, link: htttp status code
            }) // se não
        }
        await connection('incidents').where('id', id).delete() //este vai deletar o registro do caso dentro do banco de dados
        // Resposta 
        return response.status(204).send() //status(204): resposta deu sucesso porém não retorna nehum conteúdo para fronend (cliente) // send() : retorna vazia
        
    }
}