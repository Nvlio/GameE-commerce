import ProdMod from "../Modelos/ModProd.js";

export default class ProdControle {

    
    //função para pegar dados
    async GET(req, resp) {
        if (req.method == "GET") {
            
            const modelo = new ProdMod();
            const resposta = await modelo.Pegar()
            return resp.json({ itens:resposta })
        }
        return resp.json({ resp: 0 })

    }

    //função para pegar dados especificos
    async GETVal(req, resp) {
        if (req.method == "GET") {
            const id = req.params.id
            const modelo = new ProdMod(id);
            const resposta = await modelo.PegarValor()
            console.log(resposta)
            return resp.json({ itens:resposta })
        }
        return resp.json({ resp: 0 })
    }

    //função para inserir
    async POST(req, resp) {
        if (req.method == "POST" && req.is('application/json')) {
            
            const body = req.body;
            const nome = body.nome;
            const plataforma = body.plataforma;
            const preco = body.preco;
            const lancamento = body.lancamento;
            const distribuidora = body.distribuidora;

            if(nome,plataforma,preco,lancamento,distribuidora){
                const modelo = new ProdMod(null,nome,plataforma,preco,lancamento,distribuidora);
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
            const nome = body.nome;
            const plataforma = body.plataforma;
            const preco = body.preco;
            const lancamento = body.lancamento;
            const distribuidora = body.distribuidora;

            if (id){
                const modelo = new ProdMod(id);
                const resposta = await modelo.Atualizar(nome,plataforma,preco,lancamento,distribuidora)
                return resp.json({msg:resposta})
            }
        }
        return resp.json({ resp: 0 })
    }

    async DELETE(req, resp) {
        if (req.method == "DELETE") {
            
            const id = req.params.id
            if (id){
                const modelo = new ProdMod(id);
                const resposta = await modelo.Excluir()
                return resp.json({msg:resposta})
            }
        }
        return resp.json({ resp: 0 })
    }

}