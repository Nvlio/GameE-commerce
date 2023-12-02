import ProdDB from "../Conexão/DBProd.js"

export default class ProdMod {

    #id
    #nome
    #plataforma
    #preco
    #lancamento
    #distribuidora

    constructor(ID, Nome, Plataforma, Preco, Data, Distribuidora) {
        this.#id = ID;
        this.#nome = Nome
        this.#plataforma = Plataforma
        this.#preco = Preco
        this.#lancamento = Data
        this.#distribuidora = Distribuidora
    };

    ToJSON() {
        return ({
            idProd: this.#id,
            nome: this.#nome,
            plataforma: this.#plataforma,
            preco: this.#preco,
            lancamento: this.#lancamento,
            distribuidora: this.#distribuidora
        })
    }

    async Pegar() {
        const dataBase = new ProdDB()
        const resp = await dataBase.GET()
        return resp
    };

    async PegarValor() {
        const dataBase = new ProdDB()
        let resp
        if (this.#id == "Menor") {
            resp = await dataBase.GETVALOrder(this.#id)
        } else {
            resp = await dataBase.GETVAL(this.#id)
        }
        return resp
    };

    async Inserir() {
        const dataBase = new ProdDB()
        const resp = await dataBase.POST(this.#nome, this.#plataforma, this.#preco, this.#lancamento, this.#distribuidora)
        return resp
    };

    async Atualizar(nome, plataforma, preco, lancamento, distribuidora) {
        const dataBase = new ProdDB()
        const resp = await dataBase.PUT(this.#id, nome, plataforma, preco, lancamento, distribuidora)
        return resp
    };

    async Excluir() {
        const dataBase = new ProdDB()
        const resp = await dataBase.DELETE(this.#id)
        return resp
    };

}