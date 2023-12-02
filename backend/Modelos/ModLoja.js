import LojaDB from "../Conexão/DBLoja.js"

export default class LojaMod{
    
    #id
    #endereco
    #nome
    #telefone

    constructor(ID,Endereco,Nome,Telefone){
        this.#id=ID;
        this.#nome=Nome;
        this.#telefone=Telefone
        this.#endereco=Endereco
    };

    ToJSON(){
        return({
            idLoja:this.#id,
            endereco:this.#endereco,
            nome:this.#nome,
            telefone:this.#telefone,
        })
    }

    async Pegar(){
        const dataBase = new LojaDB()
        const resp = await dataBase.GET()
        return resp
    };

    async PegarValor(){
        const dataBase = new LojaDB()
        const resp = await dataBase.GETVAL(this.#id)
        return resp
    };

    async Inserir(){
        const dataBase = new LojaDB()
        const resp = await dataBase.POST(this.#endereco,this.#nome,this.#telefone)
        return resp
    };

    async Atualizar(endereco,nome,telefone){
        const dataBase = new LojaDB()
        const resp = await dataBase.PUT(this.#id,endereco,nome,telefone)
        return resp
    };

    async Excluir(){
        const dataBase = new LojaDB()
        const resp = await dataBase.DELETE(this.#id)
        return resp
    };

}