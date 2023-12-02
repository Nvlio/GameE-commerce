import connectar from "./ConectDB.js";
import ProdMod from "../Modelos/ModProd.js";

export default class ProdDB {

    async GET() {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM Produtos"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new ProdMod(item.idProduto, item.nome, item.plataforma, item.preco, item.lancamento, item.distribuidora)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETNomePlat(nome,plataforma) {
        try {
            const conexao = await connectar()
            const sqlCode = "SELECT * FROM produtos WHERE nome=? AND plataforma=?"
            const valor = [nome,plataforma]
            const [resp] = await conexao.query(sqlCode, valor)
            let item;
            for (let prod of resp) {
                item = prod.idProduto
            }
            return item;
        } catch (e) {
            return { msg: e }
        }
    }

    async GETBasic(id) {
        try {
            const conexao = await connectar()
            const sqlCode = "SELECT nome FROM produtos WHERE idProduto = ?"
            const valor = [id]
            const [resp] = await conexao.query(sqlCode, valor)
            let item;
            for (let prod of resp) {
                item = prod
            }
            return item.nome;
        } catch (e) {
            return { msg: e }
        }
    }

    async GETVALOrder(tipo){
        try{
            
            const conexao = await connectar();
            let sqlCode;
            sqlCode = "SELECT * FROM Produtos ORDER BY preco"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new ProdMod(item.idProduto, item.nome, item.plataforma, item.preco, item.lancamento, item.distribuidora)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        }catch(e){
            return ({ resp: e })
        }
    }

    async GETVAL(id) {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM Produtos WHERE idProduto=?"
            const itens = [id]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new ProdMod(item.id, item.nome, item.plataforma, item.preco, item.lancamento, item.distribuidora)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async POST(nome, plataforma, preco, lancamento, distribuidora) {
        try {
            const conexao = await connectar();
            const sqlCode = "INSERT INTO Produtos (nome,plataforma,preco,lancamento,distribuidora) VALUES (?,?,?,?,?)"
            const valores = [nome, plataforma, preco, lancamento, distribuidora]
            await conexao.query(sqlCode, valores)
            const idProd = await this.GETNomePlat(nome,plataforma)
            return ({ resp: 'work', 'idProd':idProd})
        } catch (e) {
            return ({ resp: e })
        }
    }

    async PUT(id, nome, plataforma, preco, lancamento, distribuidora) {
        try {
            const conexao = await connectar();
            const sqlCode = "UPDATE Produtos SET nome=?, plataforma=?, preco=?, lancamento=?, distribuidora=? WHERE idProduto = ?"
            const valores = [nome, plataforma, preco, lancamento, distribuidora, id]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async DELETE(id) {
        try {
            const conexao = await connectar();
            const sqlCode = "DELETE FROM Produtos WHERE idProduto = ?"
            const valores = [id]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }
}

