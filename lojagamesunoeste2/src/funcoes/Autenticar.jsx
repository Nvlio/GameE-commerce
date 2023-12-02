import { jwtDecode } from "jwt-decode"
import React, { useContext } from "react"
import { Contexto } from "../Contextualizacao"

export async function Autenticar(token) {
    console.log('autentiquei')
    localStorage.setItem('token', token)
    return


}


export function CheckAuteticacao() {
    try{
        const token = jwtDecode(localStorage.getItem("token"))
        if (!token.exp){
            return false
        }else{
            const data= new Date().getTime()
            if (token.exp>=data/1000){
                return true
            }else{
                console.log('passou da data de validade')
                LogOut()
                return false
            }
        }
    }catch(e){
        console.log(e)
        return false
    }
}

export async function LogOut() {
    const { setUser } = useContext(Contexto)
    localStorage.removeItem("token")
    setUser({
        cpf: "",
        Nome: "",
        Email: "",
        Telefone: "",
        Nivel: undefined,
        Endereco: "",
        LojaId: undefined,
        Token: false
    })
    return
}
