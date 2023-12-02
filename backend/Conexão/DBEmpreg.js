import connectar from "./ConectDB.js";
import EmpregadoMod from "../Modelos/ModEmpr.js";

export default class EmpregadoDB {

    async GET() {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM empregados"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new EmpregadoMod(item.cpf, item.nome, item.telefone, item.senha, item.email, item.nivel, item.endereco, item.lojaID)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETVAL(cpf) {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM empregados WHERE cpf=?"
            const itens = [cpf]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new EmpregadoMod(item.cpf, item.nome, item.telefone, item.senha, item.email, item.nivel, item.endereco, item.lojaID)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim[0]
        } catch (e) {
            return ({ resp: e })
        }
    }

    async Login(email, senha) {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM `empregados` WHERE email = ? AND senha=?";
            const itens = [email, senha]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            if (list.length > 0) {
                for (let item of list) {
                    const modelo = new EmpregadoMod(item.cpf, item.nome, item.telefone, item.senha, item.email, item.nivel, item.endereco, item.lojaID)
                    listaFim.push(modelo.ToJSON())
                }

                return listaFim[0]
            } else {
                throw new Error('Conta não existe ou dados incorretos')
            }
        } catch (e) {
            return ({ resp: e })
        }
    }

    async POST(cpf, nome, telefone, senha, email, nivel, endereco, lojaID) {
        try {
            const conexao = await connectar();
            const sqlCode = "INSERT INTO empregados (cpf, nome, telefone, senha, email, nivel, endereco, lojaID) VALUES (?,?,?,?,?,?,?,?)"
            const valores = [cpf, nome, telefone, senha, email, nivel, endereco, lojaID]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async PUT(cpf, nome, telefone, senha, email, nivel, endereco, lojaID) {
        try {
            const conexao = await connectar();
            const sqlCode = "UPDATE empregados SET nome=?,telefone=?,senha=?,email=?,nivel=?,endereco=?,lojaID=? WHERE cpf = ?"
            const valores = [nome, telefone, senha, email, nivel, endereco, lojaID, cpf]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    //adicionar parte que confere se funcionario existe antes de apagar e se existir retorna work caso não retorna false
    async DELETE(cpf) {
        try {
            const funcionario = await this.GETVAL(cpf)
            if (funcionario.cpf) {
                const conexao = await connectar();
                const sqlCode = "DELETE FROM empregados WHERE cpf = ?"
                const valores = [cpf]
                await conexao.query(sqlCode, valores)
                return ({ resp: 'work' })
            } else {
                return ({ msg: 'funcionario não existe' })
            }
        } catch (e) {
            return ({ resp: e })
        }
    }
}

