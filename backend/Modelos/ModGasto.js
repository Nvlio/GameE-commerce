import GastoDB from "../Conexão/dbGasto.js";

export default class GastoMod {

    #id
    #valor
    #data

    constructor(ID,Valor,Data) {
        this.#id=ID;
        this.#valor=Valor;
        this.#data=Data
    };

    ToJSON(loja,tipo) {
        return ({
           id:this.#id,
           valor:this.#valor,
           data:this.#data,
           lojaId:loja,
           tipo:tipo
        })
    }

    async Pegar() {
        const dataBase = new GastoDB()
        const resp = await dataBase.GET()
        return resp
    };

    async PegarValor() {
        const dataBase = new GastoDB()
        const resp = await dataBase.GETVAL(this.#id)
        return resp
    };

    async pegarOrganizado(organizador){
        
        const dataBase = new GastoDB()
        const resp = await dataBase.GETSORT(organizador)
        return resp
    }

    async Inserir() {
        const dataBase = new GastoDB()
        const resp = await dataBase.POST(this.#valor,this.#data)
        return resp
    };

    async Atualizar(valor,data) {
        const dataBase = new GastoDB()
        const resp = await dataBase.PUT(this.#id,valor,data)
        return resp
    };

    async Excluir() {
        const dataBase = new GastoDB()
        const resp = await dataBase.DELETE(this.#id)
        return resp
    };

}