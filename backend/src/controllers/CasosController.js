const connection = require('../database/connection');
module.exports ={
    async index(request,response) {
        const{page = 1}=request.query;
        const [count]= await connection('casos').count();
        const casos = await connection('casos')
        .join('ongs','ongs.cod','=','casos.ong_id')
        .limit(5)
        .offset((page-1)*5)
        .select([
            'casos.*',
            'ongs.nome',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.cidade',
            'ongs.uf'
        ]);
    response.header('X-Total-Count', count['count(*)']);
        return response.json(casos);
    },
    async create (request,response) {        
        const {titulo, descricao, value} = request.body;
        //codigo abaixo simula o usuario logado,pegando do insominia
        const ong_id = request.headers.logado;    
        const [id]= await connection('casos').insert({
            titulo,
            descricao,
            value,
            ong_id,             
        });        
        return response.json({ id });
    },
    async delete(request, response){
        const { id } = request.params;
        //id vai recera ong logada
        const ong_id= request.headers.logado;

        const caso = await connection('casos')
            .where ('id',id)
            .select('ong_id')
            .first();

         if (caso.ong_id != ong_id){
             return response.status(401).json({ error:'Operação não permitida.'});
         }
         await connection('casos').where('id',id).delete();
         return response.status(204).send();
    }

};