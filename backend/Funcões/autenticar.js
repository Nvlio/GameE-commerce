import  Jwt  from "jsonwebtoken"
import lista from "../constant.js"

const Autenticacao = Jwt

export default class Autenticador{
    

    async autenticar(valor){
        if (valor.email && valor.senha){
            try{
                const chave = lista(valor.senha).chave
                const token = Autenticacao.sign(valor,chave,{expiresIn:60})
                return token
            }catch(err){
                return 0
                
            }
        }else{
            return 0
        }
    }

    async conferirAutenticacao(req,resp,next){

    }
}