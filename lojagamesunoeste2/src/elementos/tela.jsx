import { useContext } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Contexto } from "../Contextualizacao.jsx"
import { Contas } from "../funcoes/contas.jsx";


export const Telas = (props) => {
    const { user,setUser } = useContext(Contexto)
    const urls=['http://www.localhost:3004/Clientes','http://www.localhost:3004/Empregados']

    async function excluir() {
        let url;
        if(user.Nivel===undefined){
            url = urls[0]
        }else{
            url = urls[1]
        }
        const conta = new Contas(url,user.cpf)
        const remove = await conta.Excluir()
        console.log(remove)
        setUser({
            Nome: "",
            Email: "",
            Telefone: "",
            Nivel: undefined,
            Endereco: "",
            LojaId: undefined
        })

        
    }

    

    if (props.func) {
        return (
            <LinkContainer to={"/"}><div onClick={excluir} className={props.class}><h1>{props.divtitle}</h1></div></LinkContainer>
        )
    } else {
        return (
            <LinkContainer to={props.link}><div className={props.class}><h1>{props.divtitle}</h1></div></LinkContainer>
        )
    }
}