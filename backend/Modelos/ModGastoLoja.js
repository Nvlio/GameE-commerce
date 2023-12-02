import GastoLojaDB from "../Conexão/DBGastoLoja.js"

export default class GastoLojaMod {

    #tipo
    #lojaID
    #gastoID

    constructor(Tipo, LojaID, gastoID) {
        this.#tipo = Tipo
        this.#lojaID = LojaID
        this.#gastoID = gastoID
    };

    ToJSON() {
        return ({
           tipo:this.#tipo,
           lojaID:this.#lojaID,
           gastoID:this.#gastoID
        })
    }

    async Pegar() {
        const dataBase = new GastoLojaDB()
        const resp = await dataBase.GET()
        return resp
    };

    async PegarValor() {
        const dataBase = new GastoLojaDB()
        const resp = await dataBase.GETVAL(this.#lojaID,this.#gastoID)
        return resp
    };

    async Inserir() {
        const dataBase = new GastoLojaDB()
        const resp = await dataBase.POST(this.#tipo,this.#lojaID,this.#gastoID)
        return resp
    };

    //colocar 1  id
    async Atualizar(tipo) {
        const dataBase = new GastoLojaDB()
        const resp = await dataBase.PUT(this.#lojaID,this.#gastoID,tipo)
        return resp
    };

    async Excluir() {
        const dataBase = new GastoLojaDB()
        const resp = await dataBase.DELETE(this.#lojaID,this.#gastoID)
        return resp
    };

}