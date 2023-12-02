import MSGDB from "../Conexão/DBMSG.js"

export default class MSGMod {

    #id
    #data
    #conversa
    #cliCPF
    #funcCPF
    #idMens
    #dono

    constructor(ID, Data, Conversa, ClienteCPF, FuncionarioCPF,idMens,dono) {
        this.#id = ID
        this.#data = Data
        this.#conversa = Conversa
        this.#cliCPF = ClienteCPF
        this.#funcCPF = FuncionarioCPF
        this.#idMens = idMens
        this.#dono = dono
    };

    ToJSON() {
        return ({
            id: this.#id,
            data: this.#data,
            conversa: this.#conversa,
            clienteCPF: this.#cliCPF,
            funcionario: this.#funcCPF,
            dono:this.#dono,
            idMensagem: this.#idMens
        })
    }

    async Pegar() {
        const dataBase = new MSGDB()
        const resp = await dataBase.GET()
        return resp
    };

    async PegarValor() {
        const dataBase = new MSGDB()
        const resp = await dataBase.GETVAL(this.#idMens)
        return resp
    };

    async PegarInfoBasica(empregado,cliente){
        const dataBase = new MSGDB()
        const resp = await dataBase.GetBasic(empregado,cliente)
        return resp
    }

    async Inserir() {
        const dataBase = new MSGDB()
        const date = new Date()
        const resp = await dataBase.POST(this.#conversa, this.#cliCPF, this.#funcCPF,this.#idMens,this.#dono,date)
        console.log(resp)
        return resp
    };

    async Atualizar(functCPF) {
        const dataBase = new MSGDB()
        const resp = await dataBase.PUT(this.#id,functCPF)
        return resp
    };

    async Excluir() {
        const dataBase = new MSGDB()
        const resp = await dataBase.DELETE(this.#id)
        return resp
    };

}