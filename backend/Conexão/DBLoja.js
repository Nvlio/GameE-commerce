import connectar from "./ConectDB.js";
import LojaMod from "../Modelos/ModLoja.js";

export default class LojaDB {

    async GET() {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM lojas"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new LojaMod(item.idLoja, item.endereco, item.nome, item.telefone)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETVAL(id) {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM lojas WHERE idLoja=?"
            const itens = [id]
            const [list] = await conexao.query(sqlCode,itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new LojaMod(item.idLoja, item.endereco, item.nome, item.telefone)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async POST( endereco, nome, telefone) {
        try {
            const conexao = await connectar();
            const sqlCode = "INSERT INTO lojas (endereco,nome,telefone) VALUES (?,?,?)"
            const valores = [ endereco, nome, telefone]
            await conexao.query(sqlCode,valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async PUT(id,endereco,nome,telefone) {
        try {
            const conexao = await connectar();
            const sqlCode = "UPDATE lojas SET endereco=?,nome=?,telefone=? WHERE idLoja = ?"
            const valores = [endereco, nome, telefone, id]
            await conexao.query(sqlCode,valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async DELETE(id) {
        try {
            const conexao = await connectar();
            const sqlCode = "DELETE FROM lojas WHERE idLoja = ?"
            const valores = [id]
            await conexao.query(sqlCode,valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }
}

