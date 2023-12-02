//mportar modulos externos
import express from "express"
import cors from 'cors'

//exportar modulos internos
import ClienteRota from "./rotas/RotaCli.js";
import EmpRota from "./rotas/RotaEmpregado.js";
import LojaRota from "./rotas/RotaLoja.js";
import CompraRota from "./rotas/RotaCompra.js";
import ProdRota from "./rotas/RotaProd.js";
import EstoqueRota from "./rotas/RotaEstoque.js";
import GastoLojaRota from "./rotas/RotaGastoLoja.js";
import GastoRota from "./rotas/RotaGasto.js";
import imgrota from "./rotas/RotaImg.js";
import MSGRota from "./rotas/RotaMSG.js";

//cria a porta assim como o host do backEnd
const porta = 3004;
const nomeHost = 'localhost';

//cria app
const app = express()
//ja seta para que ele possa trabalhar com front-end de diferentes 
//origens e que possa trabalhar com json
app.use(cors())
app.use(express.json())

//responsavel por vincular rotas para cada tipo
app.use('/Clientes',ClienteRota)
app.use('/Empregados',EmpRota)
app.use('/Lojas',LojaRota)
app.use('/Compras',CompraRota)
app.use('/Produtos',ProdRota)
app.use('/Estoque',EstoqueRota)
app.use('/GastoLoja',GastoLojaRota)
app.use('/Gastos',GastoRota)
app.use('/Chats',MSGRota)
app.use('/Imagens',imgrota)


//inicia o servidor
app.listen(porta,nomeHost,()=>{
    console.log(`Conectado ao Back-End link: http://www.${nomeHost}:${porta}`)
})
