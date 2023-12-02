import connectar from "./ConectDB.js";
import ComprasMod from "../Modelos/ModCompra.js";
import ProdDB from "./DBProd.js";
import EstoqueDB from "./DBEstoque.js";


export default class CompraDB {

    async GET() {

        try {

            const conexao = await connectar();
            const sqlCode = "SELECT * FROM Compras"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new ComprasMod(item.id, item.data, item.quantidade, item.valor, item.clienteCPF, item.lojaID, item.produtoID)
                const produto = new ProdDB()
                const infoP = await produto.GETBasic(item.produtoID)
                listaFim.push(modelo.ToJSON(infoP))
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETSORT(sort){
        try{
            const conexao = await connectar()
            const sqlCode = `SELECT * FROM Compras ORDER BY ${sort} DESC`
            const [retorno] = await conexao.query(sqlCode)
            const listaFim = []
            for (let item of retorno){
                const modelo = new ComprasMod(item.id, item.data, item.quantidade, item.valor, item.clienteCPF, item.lojaID, item.produtoID)
                const produto = new ProdDB()
                const infoP = await produto.GETBasic(item.produtoID)
                listaFim.push(modelo.ToJSON(infoP))
            }
            return listaFim
        }catch(e){
            return ({msg:'erro'})
        }
    }

    async GETVAL(id) {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM Compras WHERE id=?"
            const itens = [id]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []
            for (let item of list) {
                const modelo = new ComprasMod(item.id, item.data, item.quantidade, item.valor, item.clienteCPF, item.lojaID, item.produtoID)
                const infoP = await produto.GETBasic(item.id)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async POST(data, qntd, valor, clienteCPF, ProdID, endereco) {
        try {
            const prod = new EstoqueDB()
            const estoque = await prod.GETqnt(ProdID)
            let EstoqueLojaEscolhido={};
            for (let i = 0; i <= estoque.length - 1; i++) {
                if (estoque[i].qntd>=qntd){
                    EstoqueLojaEscolhido = estoque[i]
                    break
                }
            }
            
            if (EstoqueLojaEscolhido.qntd >= qntd) {
                await prod.PUT(EstoqueLojaEscolhido.prodID,EstoqueLojaEscolhido.lojaID,EstoqueLojaEscolhido.qntd-qntd)
                const conexao = await connectar();
                const sqlCode = "INSERT INTO Compras (clienteCPF,produtoID,lojaID,data,quantidade,valor,endereço) VALUES (?,?,?,?,?,?,?)"
                const valores = [clienteCPF, ProdID, EstoqueLojaEscolhido.lojaID, data, qntd, valor, endereco]
                await conexao.query(sqlCode, valores)

                return ({ resp: 'work' })
            } else {
                return ({ resp: `Não há quantidade suficiente disponivel` })
            }
        } catch (e) {
            return ({ resp: e })
        }
    }

    async PUT(id, data, qntd, valor, clienteCPF, lojaID, ProdID) {
        try {
            const conexao = await connectar();
            const sqlCode = "UPDATE Compras SET data=?, quantidade=?, valor=?, clienteCPF=?, lojaID=?, produtoID=? WHERE id = ?"
            const valores = [data, qntd, valor, clienteCPF, lojaID, ProdID, id]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async DELETE(id) {
        try {
            const conexao = await connectar();
            const sqlCode = "DELETE FROM Compras WHERE id = ?"
            const valores = [id]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }
}

