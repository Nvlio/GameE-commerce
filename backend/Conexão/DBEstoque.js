import connectar from "./ConectDB.js";
import EstoqueMod from "../Modelos/ModEstoque.js";
import ProdDB from "./DBProd.js";

export default class EstoqueDB {

    async GET() {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM estoques"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new EstoqueMod(item.quantidade, item.produtoID, item.lojaID)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETqnt(idProd) {
        try {
            const conexao = await connectar()
            const sqlCode = 'SELECT * FROM `estoques` WHERE produtoID = ?'
            const value = [idProd]
            const [list] = await conexao.query(sqlCode, value)
            const lista = []
            for (let item of list) {
                const estoque = new EstoqueMod(item.quantidade, item.lojaID,item.produtoID)
                lista.push(estoque.ToJSON())
            }
            return lista
        } catch (e) {
            return { msg: e }
        }
    }

    async GETVAL(idprod, idloja) {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM estoques WHERE produtoID = ? AND lojaID = ?"
            const itens = [idprod, idloja]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new EstoqueMod(item.quantidade, item.produtoID, item.lojaID)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim[0]
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETLOJAPRODS(lojaID) {
        const conexao = await connectar()
        const sqlCode = "SELECT * FROM estoques WHERE lojaID=?"
        const values = [lojaID]
        const [lista] = await conexao.query(sqlCode, values)
        const list = []

        for (let item of lista) {
            const modelo = new EstoqueMod(item.quantidade, item.lojaID, item.produtoID)
            list.push(modelo.ToJSON())
        }
        return list
    }

    async POST(qnt, lojaID, nome, plat, valor, lan, dist) {
        /*
        atualizar data por aqui ainda não decidi se pego tudo ou só horario
        const data = new Date()
        console.log(data.getHours(),':',data.getMinutes(),':',data.getSeconds(),'\n',data.getDate(),'/',data.getMonth()+1,'/',data.getFullYear())
        */
        try {
            const produto = new ProdDB()
            let Prod;
            Prod = await produto.GETNomePlat(nome, plat, valor)
            if (Prod === undefined) {
                Prod = (await produto.POST(nome, plat, valor, lan, dist)).idProd
            }
            const Existe = await this.GETVAL(Prod, lojaID)
            if (Existe != undefined) {
                return await this.PUT(Prod, lojaID, parseInt(qnt) + Existe.qntd)
            } else {
                const conexao = await connectar();
                const sqlCode = "INSERT INTO estoques (quantidade,produtoID,lojaID) VALUES (?,?,?)"
                const valores = [qnt, Prod, lojaID]
                await conexao.query(sqlCode, valores)

                return ({ resp: 'work', idProduto: Prod})
            }
        } catch (e) {
            return ({ resp: e })
        }
    }

    async PUT(prodID, lojaID, qnt) {
        /*
        atualizar data por aqui ainda não decidi se pego tudo ou só horario
        const data = new Date()
        console.log(data.getHours(),':',data.getMinutes(),':',data.getSeconds(),'\n',data.getDate(),'/',data.getMonth()+1,'/',data.getFullYear())
        */
        try {
            const conexao = await connectar();
            const sqlCode = "UPDATE estoques SET quantidade=? WHERE produtoID = ? AND lojaID = ?"
            const valores = [qnt, prodID, lojaID]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async DELETE(prodID, lojaID) {
        try {
            const conexao = await connectar();
            const sqlCode = "DELETE FROM estoques WHERE produtoID = ? AND lojaID = ?"
            const valores = [prodID, lojaID]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }
}

