/// n~~ao vai funfar aqui pq a pagina logUser é classe e por isso não da pra chamar contexto


import React, { createContext, useContext, useState } from "react"
import { Autenticar, CheckAuteticacao, LogOut } from "./funcoes/Autenticar";
import { jwtDecode } from "jwt-decode";
import { Contas } from "./funcoes/contas";
import { Contexto } from "./Contextualizacao";

const AuthContext = createContext();

export const AuthProovider = ({ children }) => {

}

export function AuthProvider(props) {
    const { setUser } = useContext(Contexto)
    const [aunteticacao, setAutenticado] = useState(() => {
        if (CheckAuteticacao()) {
            if (localStorage.getItem("token")) {
                const body = jwtDecode(localStorage.getItem("token"))
                setUser({
                    cpf: body.cpf,
                    Nome: body.nome,
                    Email: body.email,
                    Telefone: body.telefone,
                    Nivel: body.Nivel,
                    Endereco: body.Endereco,
                    LojaId: body.lojaID,
                    Token: true
                })
                return ({ Autenticado: true })
            } else {
                return ({ Autenticado: false })
            }
        } else {
            return ({ Autenticado: false })
        }
    })

    const login = async (email, senha, cpf, nome, telefone, endereco, nivel, lojaID) => {
        //cria conta
        let url = "http://www.localhost:3004/"
        if (nivel, lojaID) {
            url += "Empregados"
        } else {
            url += "Clientes"
        }
        const conta = new Contas(url, cpf, nome, email, senha, telefone, endereco, nivel, lojaID)
        let body
        //verifica se ha mais parametros com valores alem de emial e senha
        if (cpf, nome, telefone, endereco, nivel, lojaID) {
            //se houver chama cadastro de conta
            body = await conta.Cadastrar()
        } else {
            //se não chama login mesmo
            body = await conta.Login()
        }
        //pega o que retornar do pedido e chama a função autenticar usando o token vltado
        await Autenticar()
        //chama o metodo setAutenticado definindo o corpo e o autenticado como true
        setAutenticado({ Autenticado: true })
    }

    const Logout = async () => {
        ///chama logOut de autenticar
        await LogOut()
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
        //e seta 
        setAutenticado({ aunteticacao: false })
    }

    return (
        <AuthContext.Provider value={{ aunteticacao, login, Logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}


//só funfa se o login chamar os login certo e isso só ocorre se o coisa for função
export const AuthState = () => {
    const contexto =  useContext(AuthContext)
    if (!contexto) {
        return "você deve executar esse state na pasta de autenticação"
    } else {
        return contexto
    }
}