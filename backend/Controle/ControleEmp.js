import EmpregadoMod from '../Modelos/ModEmpr.js'

export default class EmpregadoControle {

    //função para pegar dados
    async GET(req, resp) {
        if (req.method == "GET") {
            
            const modelo = new EmpregadoMod();
            const resposta = await modelo.Pegar()

            return resp.json({ itens:resposta })
        }
        return resp.json({ resp: 0 })

    }

    //função para pegar dados especificos
    async GETVal(req, resp) {
        if (req.method == "GET") {
            const cpf = req.params.cpf
            const modelo = new EmpregadoMod(cpf);
            const resposta = await modelo.PegarValor()

            return resp.json({ itens:resposta })
        }
        return resp.json({ resp: 0 })
    }

    //função para inserir e logar
    async POST(req, resp) {
        if (req.method == "POST" && req.is('application/json')) {
            
            const tipo = req.params.tipo

            const body = req.body;
            const cpf = body.cpf;
            const nome = body.nome;
            const telefone = body.telefone;
            const senha = body.senha;
            const email = body.email;
            const nivel = body.nivel;
            const endereco = body.endereco;
            const lojaID = body.lojaID;

            if(cpf,nome,telefone,senha,email,nivel,endereco,lojaID || (email,senha) && tipo==="Login"){
                const modelo = new EmpregadoMod(cpf,nome,telefone,senha,email,nivel,endereco,lojaID);
                const resposta = await modelo.Inserir(tipo)
                if (resposta.message) {
                    return resp.json({ msg: { message: resposta.message } })
                } else if (resposta.code) {
                    return resp.json({ msg: { message: resposta.code } })
                } else {
                    return resp.json({ resp: resposta.resposta,token:resposta.token })
                }
            }
        }
        return resp.json({ resp: 0 })
    }

    //função para atualizar 
    async PUT(req, resp) {
        if (req.method == "PUT" && req.is('application/json')) {
            
            const body = req.body;
            const cpf = req.params.cpf
            const nome = body.nome;
            const telefone = body.telefone;
            const senha = body.senha;
            const email = body.email;
            const nivel = body.nivel;
            const endereco = body.endereco;
            const lojaID = body.lojaID;

            if (cpf){
                const modelo = new EmpregadoMod(cpf);
                const resposta = await modelo.Atualizar(nome,telefone,senha,email,nivel,endereco,lojaID)
                return resp.json({msg:resposta})
            }
        }
        return resp.json({ resp: 0 })
    }

    async DELETE(req, resp) {
        if (req.method == "DELETE") {
            
            const cpf = req.params.cpf
            if (cpf){
                const modelo = new EmpregadoMod(cpf);
                const resposta = await modelo.Excluir()
                return resp.json({msg:resposta})
            }
        }
        return resp.json({ resp: 0 })
    }

}