import connectar from "./ConectDB.js";
import MSGMod from "../Modelos/ModMSG.js";

export default class MSGDB {

    async GET() {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM mensagens"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new MSGMod(item.id, item.clienteCPF, item.empregadoCPF, item.data, item.mensagem)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GETMAIOR() {
        try {
            const conexar = await connectar();
            const sqlCode = "SELECT MAX(idMensagem) as idmsg FROM mensagens"
            const resultado = await conexar.query(sqlCode)
            return resultado[0][0]['idmsg']
        } catch (e) {
            return { msg: e }
        }
    }

    async GETVAL(id) {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM mensagens WHERE idMensagem=?"
            const itens = [id]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new MSGMod(item.id, item.data, item.mensagem, item.clienteCPF, item.empregadoCPF, item.idMensagem, item.dono)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async GetBasic(empregado, cliente) {
        try {
            const conexao = await connectar()
            let sqlCode;
            let values;

            if (empregado != 'undefined') {
                if (cliente != "all") {
                    sqlCode = "SELECT DISTINCT idMensagem,clienteCPF FROM mensagens WHERE empregadoCPF = ?"
                    values = [empregado]
                } else {
                    sqlCode = "SELECT DISTINCT idMensagem,clienteCPF FROM mensagens WHERE empregadoCPF IS NULL"
                    values = []
                }
            } else {
                sqlCode = "SELECT DISTINCT idMensagem,clienteCPF FROM mensagens WHERE clienteCPF = ?"
                values = [cliente]
            }

            const [resultado] = await conexao.query(sqlCode, values)
            const lista = []
            for (let i of resultado) {
                const mod = new MSGMod(null, null, null, i.clienteCPF, null, i.idMensagem)
                lista.push(mod.ToJSON())
            }
            return lista
        } catch (e) {
            return ({ resp: e })
        }
    }

    async POST(conversa, cliCPF, funcCPF, idMsg, dono, data) {
        /*
        atualizar data por aqui ainda não decidi se pego tudo ou só horario
        const data = new Date()
        console.log(data.getHours(),':',data.getMinutes(),':',data.getSeconds(),'\n',data.getDate(),'/',data.getMonth()+1,'/',data.getFullYear())
        */
        try {
            const conexao = await connectar();
            let sqlCode;
            let valores;
            if (idMsg === "New") {
                idMsg = await this.GETMAIOR() + 1
            } else {
                if (funcCPF === undefined || cliCPF === undefined) {
                    const data = await this.GETVAL(idMsg)
                    funcCPF = data[0].funcionario
                    cliCPF = data[0].clienteCPF
                }
            }

            sqlCode = "INSERT INTO mensagens (data,mensagem,clienteCPF,empregadoCPF,dono,idMensagem) VALUES (?,?,?,?,?,?)"
            valores = [data, conversa, cliCPF, funcCPF, dono, idMsg]

            await conexao.query(sqlCode, valores)

            return ({ resp: 'work', data: data, idmsg:idMsg})
        } catch (e) {
            return ({ resp: e })
        }
    }

    async PUT(id, funcCPF) {
        /*
        atualizar data por aqui ainda não decidi se pego tudo ou só horario
        const data = new Date()
        console.log(data.getHours(),':',data.getMinutes(),':',data.getSeconds(),'\n',data.getDate(),'/',data.getMonth()+1,'/',data.getFullYear())
        */
        try {
            const funfa = await this.GETVAL(id)
            if (funfa[0].funcionario){
                return 
            }
            const conexao = await connectar();
            const sqlCode = "UPDATE mensagens SET empregadoCPF = ? WHERE idMensagem = ?"
            const valores = [funcCPF,id]
            await conexao.query(sqlCode,valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async DELETE(id) {
        try {
            const conexao = await connectar();
            const sqlCode = "DELETE FROM mensagens WHERE id = ?"
            const valores = [id]
            await conexao.query(sqlCode)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }
}

