
//classe responsavel por chamar metodos relacionadas a chats

import { Get, getSome } from "./Get"


export default class Chats {

    #CPFempregado
    #CPFcliente
    #conversas
    #data
    #id
    #idMSG

    #url

    constructor(url, empregado, cliente, conversa, data, id,idMSG) {
        this.#url = url;
        this.#CPFempregado = empregado;
        this.#CPFcliente = cliente;
        this.#conversas = conversa;
        this.#data = data;
        this.#id = id;
        this.#idMSG = idMSG;
    }

    async getinfo(){
        console.log(`${this.#url}number-${this.#CPFempregado}-${this.#CPFcliente}`)
        const resp = await Get(`${this.#url}number-${this.#CPFempregado}-${this.#CPFcliente}`)
        console.log(resp)
        return resp
    }

    async getAllMsg(){
        const resp = await getSome(this.#url,this.#idMSG)
        return resp
    }
}