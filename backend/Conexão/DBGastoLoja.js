import connectar from "./ConectDB.js";
import GastoLojaMod from "../Modelos/ModGastoLoja.js";

export default class GastoLojaDB {

    async GET() {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM gastoslojas"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new GastoLojaMod(item.tipo, item.lojaID, item.gastosID )
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETVAL(lojaID,gastoID) {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM gastoslojas WHERE gastosID = ? AND  lojaID=?"
            const itens = [lojaID,gastoID]
            const [list] = await conexao.query(sqlCode,itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new GastoLojaMod(item.tipo, item.lojaID, item.gastosID)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async POST(tipo,lojaID,gastoID) {
        try {
            const conexao = await connectar();
            const sqlCode = "INSERT INTO gastoslojas (tipo,LojaID,gastosID) VALUES (?,?,?)"
            const valores = [tipo,lojaID,gastoID]
            await conexao.query(sqlCode,valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    //colocar 1  id
    async PUT(lojaID,gastoID,tipo) {
        try {
            const conexao = await connectar();
            const sqlCode = "UPDATE gastoslojas SET tipo=? WHERE gastosID = ? AND  lojaID=?"
            const valores = [gastoID,lojaID,tipo]
            await conexao.query(sqlCode,valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async DELETE(lojaID,gastoID) {
        try {
            const conexao = await connectar();
            const sqlCode = "DELETE FROM gastoslojas WHERE gastosID = ? AND  lojaID=?"
            const valores = [lojaID,gastoID]
            await conexao.query(sqlCode,valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }
}

