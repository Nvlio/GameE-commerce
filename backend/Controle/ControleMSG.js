import MSGDB from "../Conexão/DBMSG.js";
import MSGMod from "../Modelos/ModMSG.js";

export default class MSGControle {

    //função para pegar dados
    async GET(req, resp) {
        if (req.method == "GET") {

            const modelo = new MSGMod();
            const resposta = await modelo.Pegar()

            return resp.json({ itens: resposta })
        }
        return resp.json({ resp: 0 })

    }

    //função para pegar dados especificos
    async GETVal(req, resp) {
        if (req.method == "GET") {
            const params = req.params.id.split('-')
            const tipo = params[0]
            const empregado = params[1]
            const cliente = params[2]
            let resposta
            let modelo
            if (tipo != 'number') {
                modelo = new MSGMod(null,null,null,null,null,tipo);
                resposta = await modelo.PegarValor()
            } else {
                modelo = new MSGMod();
                resposta = await modelo.PegarInfoBasica(empregado,cliente)
            }

            return resp.json({ itens: resposta })
        }
        return resp.json({ resp: 0 })
    }

    //função para inserir
    async POST(req, resp) {
        if (req.method == "POST" && req.is('application/json')) {

            const body = req.body;
            const conversa = body.conversa;
            const cliCPF = body.clieCPF;
            const funcCPF = body.funcCPF;
            const idMensagem = body.IDmsg;
            const dono = body.dono

            if (cliCPF || funcCPF) {
                const modelo = new MSGMod(null,null,conversa, cliCPF, funcCPF,idMensagem,dono);
                const resposta = await modelo.Inserir()
                return resp.json({ msg: resposta })
            }
        }
        return resp.json({ resp: 0 })
    }

    //função para atualizar 
    async PUT(req, resp) {
        if (req.method == "PUT" && req.is('application/json')) {

            const body = req.body;
            const id = req.params.id;
            const funcCPF = body.funcCPF

            if (id) {
                const modelo = new MSGMod(id);
                const resposta = await modelo.Atualizar(funcCPF)
                return resp.json({ msg: resposta })
            }
        }
        return resp.json({ resp: 0 })
    }

    async DELETE(req, resp) {
        if (req.method == "DELETE") {

            const id = req.params.id
            if (id) {
                const modelo = new MSGMod(id);
                const resposta = await modelo.Excluir()
                return resp.json({ msg: resposta })
            }
        }
        return resp.json({ resp: 0 })
    }

}