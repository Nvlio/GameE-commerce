import React,{ useState, createContext } from "react"

export const Contexto = createContext()
//contextualização vai conter as informações necessarias durante o funcionamento do site
export function ContextoCliente(props) {
    const [user, setUser] = useState({
        cpf:"",
        Nome: "",
        Email:"",
        Telefone: "",
        Nivel: undefined,
        Endereco: "",
        LojaId: undefined,
        Token:undefined
    })

    return (
        <Contexto.Provider value={{ user, setUser }}>
            {props.children}
        </Contexto.Provider>
    )
}