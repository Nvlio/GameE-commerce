import GastoMod from "../Modelos/ModGasto.js";

export default class GastoLojaControl {

    //função para pegar dados
    async GET(req, resp) {
        if (req.method == "GET") {
            
            const modelo = new GastoMod();
            const resposta = await modelo.Pegar()

            return resp.json({ itens:resposta })
        }
        return resp.json({ resp: 0 })

    }

    //função para pegar dados especificos
    async GETVal(req, resp) {
        if (req.method == "GET") {
            const id = req.params.id
            const modelo = new GastoMod(id);
            if (id == "valor"){
                const retorno = await modelo.pegarOrganizado(id)
                return resp.json({itens:retorno})
            }
            const resposta = await modelo.PegarValor()

            return resp.json({ itens:resposta })
        }
        return resp.json({ resp: 0 })
    }

    //função para inserir
    async POST(req, resp) {
        if (req.method == "POST" && req.is('application/json')) {
            
            const body = req.body;
            const id = body.id;
            const valor = body.valor;
            const data = body.data;

            if(valor,data){
                const modelo = new GastoMod(id,valor,data);
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
            const valor = body.valor;
            const data = body.data;

            if (id){
                const modelo = new GastoMod(id);
                const resposta = await modelo.Atualizar(valor,data)
                return resp.json({msg:resposta})
            }
        }
        return resp.json({ resp: 0 })
    }

    async DELETE(req, resp) {
        if (req.method == "DELETE") {
            
            const id = req.params.id
            if (id){
                const modelo = new GastoMod(id);
                const resposta = await modelo.Excluir()
                return resp.json({msg:resposta})
            }
        }
        return resp.json({ resp: 0 })
    }

}