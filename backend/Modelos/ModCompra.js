import CompraDB from "../Conexão/DBCompra.js"
export default class ComprasMod{
    
    #id_Compra
    #data_compra
    #qntd
    #Valor
    #cliente_CPF
    #Loja_ID
    #Produto_ID
    #endereco

    constructor(ID,DataCompra,Qntd,Valor,ClienteCPF,LojaID,ProdID,endereco){
        this.#id_Compra=ID;
        this.#data_compra=DataCompra;
        this.#qntd=Qntd;
        this.#Valor=Valor;
        this.#cliente_CPF=ClienteCPF;
        this.#Loja_ID=LojaID;
        this.#Produto_ID=ProdID;
        this.#endereco=endereco
    };

    ToJSON(NomeProd){
        return({
            idCompra:this.#id_Compra,
            nomeProd:NomeProd,
            dataCompra:this.#data_compra,
            qntd:this.#qntd,
            valor:this.#Valor,
            clientCPF:this.#cliente_CPF,
            lojaID:this.#Loja_ID,
            prodID:this.#Produto_ID

        })
    }

    async Pegar(){
        const dataBase = new CompraDB()
        const resp = await dataBase.GET()
        return resp
    };

    async PegarValor(){
        const dataBase = new CompraDB()
        const resp = await dataBase.GETVAL(this.#id_Compra)
        return resp
    };

    async pegaOrganizado(organiza){
        const dataBase = new CompraDB()
        let valor
        if (organiza=="quantidade"){
            valor = "quantidade"
        }else{
            valor = "valor"
        }
        const resp = await dataBase.GETSORT(valor)
        return resp    
    }

    async Inserir(){
        const dataBase = new CompraDB()
        const resp = await dataBase.POST(this.#data_compra,this.#qntd,this.#Valor,this.#cliente_CPF,this.#Loja_ID,this.#Produto_ID,this.#endereco)
        return resp
    };

    async Atualizar(data,qntd,valor,clientCPF,lojaID,prodID){
        const dataBase = new CompraDB()
        const resp = await dataBase.PUT(this.#id_Compra,data,qntd,valor,clientCPF,lojaID,prodID)
        return resp
    };

    async Excluir(){
        const dataBase = new CompraDB()
        const resp = await dataBase.DELETE(this.#id_Compra)
        return resp
    };

}