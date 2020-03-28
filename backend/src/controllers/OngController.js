const crypto = require('crypto');
const connection = require('../database/connection');

module.exports ={
    async index (request,response){
        const ongs =await connection('ongs').select('*');
        return response.json(ongs);
    },
    async create (request,response) {
        const {nome, email, whatsapp, cidade, uf} = request.body;
        //gera ids aleatorios com tam4 e hexadecimais
        const cod = crypto.randomBytes(4).toString('HEX');
    
        await connection('ongs').insert({
            cod,
            nome,
            email,
            whatsapp,
            cidade,
            uf,    
        })
        
        return response.json({cod});
    }

};