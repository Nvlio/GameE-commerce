import ComprasMod from "../Modelos/ModCompra.js";

export default class CompraControle {

    //função para pegar dados
    async GET(req, resp) {
        if (req.method == "GET") {
            
            const modelo = new ComprasMod();
            const resposta = await modelo.Pegar()

            return resp.json({ itens:resposta })
        }
        return resp.json({ resp: 0 })

    }

    

    //função para pegar dados especificos
    async GETVal(req, resp) {
        if (req.method == "GET") {
            const id = req.params.id
            //novo
            const modelo = new ComprasMod(id);
            if (id=="quantidade"||id=="receita"){
                const retorno = await  modelo.pegaOrganizado(id) 
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
            const data = body.data;
            const qntd = body.qntd;
            const valor = Math.ceil(Number(qntd) * Number(body.valor));
            const clientCPF = body.clientCPF;
            //VAI TER QUE ATUALIZAR O FRONT PARA PASSAR O ID DA LOJA QUE VENDEU
            const lojaID = body.lojaID;
            const prodID = body.prodID;
            const endereco = body.endereco

            if(data,qntd,valor,clientCPF,prodID){
                const modelo = new ComprasMod(null,data,qntd,valor,clientCPF,prodID,endereco);
                const resposta = await modelo.Inserir()
                return resp.json({msg:resposta})
            }
        }else{
            return resp.json({ resp: 1 })
        }
        
    }

    //função para atualizar 
    async PUT(req, resp) {
        if (req.method == "PUT" && req.is('application/json')) {
            
            const body = req.body;
            const id = req.params.id;
            const data = body.data;
            const qntd = body.qntd;
            const valor = body.valor;
            const clientCPF = body.clientCPF;
            const lojaID = body.lojaID;
            const prodID = body.prodID;

            if (id){
                const modelo = new ComprasMod(id);
                const resposta = await modelo.Atualizar(data,qntd,valor,clientCPF,lojaID,prodID)
                return resp.json({msg:resposta})
            }
        }
        return resp.json({ resp: 1 })
    }

    async DELETE(req, resp) {
        if (req.method == "DELETE") {
            
            const id = req.params.id
            if (id){
                const modelo = new ComprasMod(id);
                const resposta = await modelo.Excluir()
                return resp.json({msg:resposta})
            }
        }
        return resp.json({ resp: 0 })
    }

}