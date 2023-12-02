import GastoLojaMod from "../Modelos/ModGastoLoja.js";

export default class GastoLojaControl {

    //função para pegar dados
    async GET(req, resp) {
        if (req.method == "GET") {
            
            const modelo = new GastoLojaMod();
            const resposta = await modelo.Pegar()

            return resp.json({ itens:resposta })
        }
        return resp.json({ resp: 0 })

    }

    //função para pegar dados especificos
    async GETVal(req, resp) {
        if (req.method == "GET") {
            const ans = req.params.id.split(/-/)
            const modelo = new GastoLojaMod(null,ans[0],ans[1]);
            const resposta = await modelo.PegarValor()

            return resp.json({ itens:resposta })
        }
        return resp.json({ resp: 0 })
    }

    //função para inserir
    async POST(req, resp) {
        if (req.method == "POST" && req.is('application/json')) {
            
            const body = req.body;
            const tipo = body.tipo;
            const gastoID = body.gastoID;
            const lojaID=body.lojaID

            if(gastoID && lojaID){
                const modelo = new GastoLojaMod(tipo,lojaID,gastoID);
                const resposta = await modelo.Inserir()
                return resp.json({msg:resposta})
            }
        }
        return resp.json({ resp: 0 })
    }

    //função para atualizar 
    //colocar 1  id
    async PUT(req, resp) {
        if (req.method == "PUT" && req.is('application/json')) {
            
            const body = req.body;
            const ans = req.params.id.split(/-/)
            const tipo = body.tipo  

            if (ans[0] && ans[1]){
                const modelo = new GastoLojaMod(null,ans[0],ans[1]);
                const resposta = await modelo.Atualizar(tipo)
                return resp.json({msg:resposta})
            }
        }
        return resp.json({ resp: 0 })
    }

    async DELETE(req, resp) {
        if (req.method == "DELETE") {
            
            const ans = req.params.id.split(/-/)
            if (ans[0] && ans[1]){
                const modelo = new GastoLojaMod(null,ans[0],ans[1]);
                const resposta = await modelo.Excluir()
                return resp.json({msg:resposta})
            }
        }
        return resp.json({ resp: 0 })
    }

}