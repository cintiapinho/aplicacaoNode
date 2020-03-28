const connection = require('../database/connection');

module.exports = {
    async create(request,response){
        const { id } = request.body;

        const ong = await connection('ongs')
        .where('cod',id)
        .select('nome')
        .first();

        if (!ong){
            return response.status(400).json({error:'Nenhuma com esse Codigo.'});
        }
         return response.json(ong);
    }
}