import connectar from "./ConectDB.js";
import ClienteMod from "../Modelos/ModCli.js";

export default class ClienteDB {

    async GET() {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM clientes"
            const [list] = await conexao.query(sqlCode)
            const listaFim = []

            for (let item of list) {
                const modelo = new ClienteMod(item.cpf, item.nome, item.telefone, item.senha, item.email, item.endereco)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: e })
        }
    }

    async Confere(email){
        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM `clientes` WHERE email = ?";
            const itens = [email]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new ClienteMod(item.cpf, item.nome, item.telefone, item.senha, item.email, item.endereco)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: 'e' })
        }
    }

    async GETVAL(cpf) {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM `clientes` WHERE cpf = ?";
            const itens = [cpf]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            for (let item of list) {
                const modelo = new ClienteMod(item.cpf, item.nome, item.telefone, item.senha, item.email, item.endereco)
                listaFim.push(modelo.ToJSON())
            }

            return listaFim
        } catch (e) {
            return ({ resp: 'e' })
        }
    }

    async Login(email,senha) {

        try {
            const conexao = await connectar();
            const sqlCode = "SELECT * FROM `clientes` WHERE email = ? AND senha=?";
            const itens = [email,senha]
            const [list] = await conexao.query(sqlCode, itens)
            const listaFim = []

            if(list.length>0){
            for (let item of list) {
                const modelo = new ClienteMod(item.cpf, item.nome, item.telefone, item.senha, item.email, item.endereco)
                listaFim.push(modelo.ToJSON())
            }
            
            return listaFim[0]
        }else{
                throw new Error('Conta não existe ou dados incorretos')
            }
        } catch (e) {
            return ({ resp: e })
        }
    }

    async CheckEmailTel(valor) {
        const connect = await connectar()

        let sqlCode;
        const lista = []
        if (valor.email && valor.telefone) {
            lista.push(valor.email)
            lista.push(valor.telefone)
            sqlCode = "SELECT * FROM `clientes` WHERE email = ? AND telefone = ?"
        }else if(valor.email){
            lista.push(valor.email)
            sqlCode = "SELECT * FROM `clientes` WHERE email = ?"
        }else {
            lista.push(valor.telefone)
            sqlCode = "SELECT * FROM `clientes` WHERE telefone =?"
        }
        const [list] = await connect.query(sqlCode, lista)
        if (list.length > 0) {
            return -1
        } else {
            return 0
        }



    }

    async POST(cpf, nome, telefone, senha, email, endereco) {
        try {
            const conexao = await connectar();
            const Fail = await this.CheckEmailTel({'email':email,'telefone':telefone})
            if(Fail){
                throw new Error("Email ou Telefone ja existem");
            }
            const sqlCode = "INSERT INTO clientes (cpf, nome, telefone, senha, email, endereco) VALUES (?,?,?,?,?,?)"
            const valores = [cpf, nome, telefone, senha, email, endereco]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async PUT(cpf, nome, telefone, senha, email, endereco) {
        try {
            const conexao = await connectar();
            const sqlCode = "UPDATE clientes SET nome=?,telefone=?,senha=?,email=?,endereco=? WHERE cpf = ?"
            const valores = [nome, telefone, senha, email, endereco, cpf]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }

    async DELETE(cpf) {
        try {
            const conexao = await connectar();
            const sqlCode = "DELETE FROM clientes WHERE cpf = ?"
            const valores = [cpf]
            await conexao.query(sqlCode, valores)

            return ({ resp: 'work' })
        } catch (e) {
            return ({ resp: e })
        }
    }
}

