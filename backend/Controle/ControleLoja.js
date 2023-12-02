import LojaMod from "../Modelos/ModLoja.js";

export default class LojaControle {

    //função para pegar dados
    async GET(req, resp) {
        if (req.method == "GET") {
            
            const modelo = new LojaMod();
            const resposta = await modelo.Pegar()

            return resp.json({ itens:resposta })
        }
        return resp.json({ resp: 0 })

    }

    //função para pegar dados especificos
    async GETVal(req, resp) {
        if (req.method == "GET") {
            const id = req.params.id
            const modelo = new LojaMod(id);
            const resposta = await modelo.PegarValor()

            return resp.json({ itens:resposta })
        }
        return resp.json({ resp: 0 })
    }

    //função para inserir
    async POST(req, resp) {
        if (req.method == "POST" && req.is('application/json')) {
            
            const body = req.body;
            const endereco = body.endereco;
            const nome = body.nome;
            const telefone = body.telefone;

            if(endereco,nome,telefone){
                const modelo = new LojaMod(null,endereco,nome,telefone);
                const resposta = await modelo.Inserir()
                return resp.json({msg:resposta})
            }
        }
        return resp.json({ resp: 0 })
    }

    //função para atualizar 
    async PUT(req, resp) {
        if (req.method == "PUT" && req.is('application/json')) {
            
            const body = req.body;
            const id = req.params.id;
            const endereco = body.endereco;
            const nome = body.nome;
            const telefone = body.telefone;

            if (id){
                const modelo = new LojaMod(id);
                const resposta = await modelo.Atualizar(endereco,nome,telefone)
                return resp.json({msg:resposta})
            }
        }
        return resp.json({ resp: 0 })
    }

    async DELETE(req, resp) {
        if (req.method == "DELETE") {
            
            const id = req.params.id
            if (id){
                const modelo = new LojaMod(id);
                const resposta = await modelo.Excluir()
                return resp.json({msg:resposta})
            }
        }
        return resp.json({ resp: 0 })
    }

}