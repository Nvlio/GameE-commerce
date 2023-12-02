import EstoqueMod from "../Modelos/ModEstoque.js";

export default class EstoqueControle {

    //função para pegar dados
    async GET(req, resp) {
        if (req.method == "GET") {

            const modelo = new EstoqueMod();
            const resposta = await modelo.Pegar()

            return resp.json({ itens: resposta })
        }
        return resp.json({ resp: 0 })

    }

    //função para pegar dados especificos
    async GETVal(req, resp) {
        if (req.method == "GET") {
            const ans = req.params.id.split(/-/)
            const modelo = new EstoqueMod(null, ans[1],ans[0]);
            let resposta;
            if (ans[2]) {
                resposta = await modelo.GetAllFromOne(ans[1])
            } else {
                resposta = await modelo.PegarValor()
            }

            return resp.json({ itens: resposta })
        }
        return resp.json({ resp: 0 })
    }

    //função para inserir
    async POST(req, resp) {
        if (req.method == "POST" && req.is('application/json')) {

            const body = req.body;
            const qnt = body.qntd;
            const LojaID = body.lojaID;
            const nomeP = body.nome;
            const platP = body.plataforma
            const valorP = body.valor
            const lanc = body.lancamento
            const distribuidora = body.distribuidora

            //vai ter que criar o prodID no banco de dados ou ele pega um existente ou cria
            if ( LojaID) {
                const modelo = new EstoqueMod(qnt, LojaID);
                const resposta = await modelo.Inserir(nomeP,platP,valorP,lanc,distribuidora)
                return resp.json({ msg: resposta })
            }
        }
        return resp.json({ resp: 0 })
    }

    //função para atualizar 
    async PUT(req, resp) {
        if (req.method == "PUT" && req.is('application/json')) {

            const body = req.body;
            const ans = req.params.id.split(/-/)
            const ProdID = ans[0];
            const LojaID = ans[1];
            const qnt = body.qntd

            if (ProdID, LojaID) {
                const modelo = new EstoqueMod(null, ProdID, LojaID);
                const resposta = await modelo.Atualizar(qnt)
                return resp.json({ msg: resposta })
            }
        }
        return resp.json({ resp: 0 })
    }

    async DELETE(req, resp) {
        if (req.method == "DELETE") {

            const ans = req.params.id.split(/-/)

            if (ans[0] && ans[1]) {
                const modelo = new EstoqueMod(null, ans[0], ans[1]);
                const resposta = await modelo.Excluir()
                return resp.json({ msg: resposta })
            }
        }
        return resp.json({ resp: 0 })
    }

}