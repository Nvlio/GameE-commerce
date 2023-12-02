import EmpregadoDB from "../Conexão/DBEmpreg.js"
import Autenticador from "../Funcões/autenticar.js"


export default class EmpregadoMod{
    
    #cpf
    #nome
    #telefone
    #senha
    #email
    #nivel
    #endereco
    #lojaID

    constructor(CPF,Nome,Telefone,Senha,Email,Nivel,Endereco,LojaID){
        this.#cpf=CPF;
        this.#nome=Nome;
        this.#telefone=Telefone;
        this.#senha=Senha;
        this.#email=Email;
        this.#nivel=Nivel;
        this.#endereco=Endereco;
        this.#lojaID=LojaID;
    };

    //cria uma resposta no formato json do modelo
    ToJSON(){
        return({
            cpf:this.#cpf,
            nome:this.#nome,
            telefone:this.#telefone,
            senha:this.#senha,
            email:this.#email,
            nivel:this.#nivel,
            endereco:this.#endereco,
            lojaID:this.#lojaID
        })
    }

    async Pegar(){
        const dataBase = new EmpregadoDB()
        const resp = await dataBase.GET()
        return resp
    };

    async PegarValor(tipo){
        const dataBase = new EmpregadoDB()
        const resp = await dataBase.GETVAL(this.#cpf)
        return resp
    };

    async Inserir(tipo){
        const dataBase = new EmpregadoDB()
        const autenticacao = new Autenticador()
        let resp;
        let token
        if(tipo){
            resp = await dataBase.Login(this.#email,this.#senha)
        }else{
            resp = await dataBase.POST(this.#cpf,this.#nome,this.#telefone,this.#senha,this.#email,this.#nivel,this.#endereco,this.#lojaID)
        }
        token = await autenticacao.autenticar(resp)
        if(resp.resp){
            return resp.resp
        }else{
            return ({resposta:resp,'token':token})
        }
    };

    async Atualizar(nome,telefone,senha,email,nivel,endereco,lojaID){
        const dataBase = new EmpregadoDB()
        const resp = await dataBase.PUT(this.#cpf,nome,telefone,senha,email,nivel,endereco,lojaID)
        return resp
    };

    async Excluir(){
        const dataBase = new EmpregadoDB()
        const resp = await dataBase.DELETE(this.#cpf)
        return resp
    };

}