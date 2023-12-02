import mysql from "mysql2/promise"

//função que conecta com o database da loja
async function connectar(){
    if (global.conexao && global.conexao.status!='disconnected'){
        return global.conexao
    }else{
        const conexao = await mysql.createConnection({
            host:'localhost',
            user:'root',
            password:"",
            database:"GamesSystUno"
        })
        global.conexao = conexao
        return global.conexao
    }
}

export default connectar