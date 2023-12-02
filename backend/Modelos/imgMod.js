import dbImg from "../Conexão/imgDB.js"

import path from 'path';
import toBASE64 from "../Funcões/Base64.js";
import fs from 'fs'

//classe que constroi e trabalha com os objetos e modelos dele de como deve ser retratado etc...
export default class modImg {

    #nome
    #cod
    #pcod


    constructor(nome, prodcod, cod) {
        this.#nome = nome
        this.#pcod = prodcod
        this.#cod = cod
    }

    get nome() {
        return this.#nome
    }
    set nome(nvalu) {
        this.#nome = nvalu
        return this.#nome
    }

    get cod() {
        return this.#cod
    }


    get pcod() {
        return this.#pcod
    }

    ToJson() {
        return {
            "nome": this.#nome,
            "cod": this.#cod,
            "pcod": this.#pcod
        }
    }


    async pegarDados() {
        console.log('chamei')
        const DataBase = new dbImg()
        const db = await DataBase.GET()
        return db
    }

    async pegardadosId(tipo) {
        const DataBase = new dbImg()
        const lista = []
        const db = await DataBase.GETID(this.#pcod)
        if (db && tipo == "u") {
            const filepath = path.join('D:', 'TrabalhoFaculdade', 'fotos', 'produtos', db[0].nome)
            return ({ id: db[0].cod, nome: db[0].nome, img: toBASE64(filepath), type: db[0].nome.split('.')[1] })
        } else if (db && tipo == "m") {
            db.map((item, index) => {
                const filepath = path.join('D:', 'TrabalhoFaculdade', 'fotos', 'produtos', item.nome)
                console.log({ id: item.cod, nome: item.nome, img: toBASE64(filepath), type: item.nome.split('.')[1] })
                lista.push({ id: item.cod, nome: item.nome, img: toBASE64(filepath), type: item.nome.split('.')[1] })
            })
            return lista
        } else {
            return ({ msg: 'erro' })
        }
    }

    async pegarimg(nome) {
        //METODO QUE PEGA IMAGEM DO MEU SISTEMA E RETORNA
        try {
            const filepath = path.join('D:', 'TrabalhoFaculdade', 'fotos', 'produtos', nome)
            return ({ img: toBASE64(filepath), type: nome.split('.')[1] })
        } catch (erro) {
            return ({ msg: erro })
        }
    }

    async adicionarDados(body) {
        const DataBase = new dbImg()
        let db
        for (let i = 0; i < 5; i++) {
            db = await DataBase.POST(body[`nome${i}`], this.#pcod,i)
            
        }
        return db
    }

    async excluirDados() {
        const DataBase = new dbImg()
        const db = DataBase.DELETE(this.#pcod, this.#cod)
        return db
    }
}