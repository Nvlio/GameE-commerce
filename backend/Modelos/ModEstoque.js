import EstoqueDB from "../Conexão/DBEstoque.js"

export default class EstoqueMod {

    #qntd
    #prodID
    #LojaID

    constructor(qntd, LojaID,prodID) {
        this.#qntd = qntd
        this.#prodID = prodID
        this.#LojaID = LojaID
    };

    ToJSON() {
        return ({
            qntd:this.#qntd,
            prodID:this.#prodID,
            lojaID:this.#LojaID,
        })
    }

    async Pegar() {
        const dataBase = new EstoqueDB()
        const resp = await dataBase.GET()
        return resp
    };

    async PegarValor() {
        const dataBase = new EstoqueDB()
        const resp = await dataBase.GETVAL(this.#prodID,this.#LojaID)
        return resp
    };

    async GetAllFromOne(lojaID){
        const dataBase = new EstoqueDB()
        const resp = await dataBase.GETLOJAPRODS(this.#LojaID)
        return resp
    }

    async Inserir(prodNome,prodPlat,prodValor,prodLan,prodDist) {
        const dataBase = new EstoqueDB()
        const resp = await dataBase.POST(this.#qntd,this.#LojaID,prodNome,prodPlat,prodValor,prodLan,prodDist)
        return resp
    };

    async Atualizar(qnt) {
        const dataBase = new EstoqueDB()
        const resp = await dataBase.PUT(this.#prodID,this.#LojaID,qnt)
        return resp
    };

    async Excluir() {
        const dataBase = new EstoqueDB()
        const resp = await dataBase.DELETE(this.#prodID,this.#LojaID)
        return resp
    };

}