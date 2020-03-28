//vamos importar o framework express que instalamos anteriormente
const express = require('express');
const cors = require('cors');
// importar as rotas do routes.js
const routes = require('./routes');
//variavel para criar a aplicação
const app = express();

//cors é parte de segurança dentro do parametro 
//futuramente será colocado o endereço da hospegagem do app
app.use(cors());

app.use(express.json());
app.use(routes);
app.listen(3333);
/*
Métodos HTTP:
GET: Buscar/listar uma informação no back-end
POST: Criar uma informação no back-end
PUT: Alterar uma informação no back-end
DELETE: Deletar uma informação no back-end
*/
/*
Rota/  recurso
*/

/* 

TIPOS DE PARÂMETROS:
* Query params: Parâmetros nomeados enviados na rota após "?"(Filtros, paginação)
* Route Params:Parâmetros utilizados para identificar recursos
* Request Body: Copo da requisição, utilizado para criar ou alterar recursos


*/

//porta pela qual acesso a aplicação

