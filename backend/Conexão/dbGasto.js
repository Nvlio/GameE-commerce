import connectar from "./ConectDB.js";
import GastoMod from "../Modelos/ModGasto.js";

export default class GastoDB {

    async GET() {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM gastos JOIN gastosloja ON gastosloja.idgasto = gastos.idGastos"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new GastoMod(item.idGastos,item.valor,item.data)
                listaFim.push(modelo.ToJSON(item.idLoja,item.tipo))
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETSORT(sort){
        try{
            const conexao = await connectar()
            const sqlCode = `SELECT * FROM gastos JOIN gastosloja ON gastosloja.idgasto = gastos.idGastos  ORDER BY ${sort} DESC`
            const [retorno] = await conexao.query(sqlCode)
            const listaFim = []
            for (let item of retorno){
                const modelo = new GastoMod(item.idGastos,item.valor,item.data)
                listaFim.push(modelo.ToJSON(item.idLoja,item.tipo))
            }
            return listaFim
        }catch(e){
            return ({msg:'erro'})
        }
    }

    async GETVAL(id) {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM gastos WHERE idGastos=?"
            const itens = [id]
            const [list] = await conexao.query(sqlCode,itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new GastoMod(item.idGastos,item.valor,item.data)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async POST(valor,data) {
        try {
            const conexao = await connectar();
            const sqlCode = "INSERT INTO gastos (valor,data) VALUES (?,?)"
            const valores = [valor,data]
            await conexao.query(sqlCode,valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async PUT(id,valor,data) {
        try {
            const conexao = await connectar();
            const sqlCode = "UPDATE gastos SET valor=?, data=? WHERE idGastos=?"
            const valores = [valor,data,id]
            await conexao.query(sqlCode,valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async DELETE(id) {
        try {
            const conexao = await connectar();
            const sqlCode = "DELETE FROM gastos WHERE idGastos=?"
            const valores = [id]
            await conexao.query(sqlCode,valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }
}

