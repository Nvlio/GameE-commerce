import { useContext } from "react"
import { Contexto } from "../Contextualizacao.jsx"


//parte responsavel por estruturar mensagem
export default function Mensagem(props) {
    const { user } = useContext(Contexto)

    if ((props.dono === 1)) {
        return (
            <div style={{ border: "1px solid black", borderRadius: '20px', backgroundColor: "green",color:'black', width: '500px', marginLeft: '40%', marginBottom: '05%' }}>
                <h3>Cliente</h3>
                <p>{props.dono}</p>
                <p>{props.msg}</p>
                <p>{props.data}</p>

            </div>
        )
    } else {
        return (
            <div style={{ border: "1px solid black", borderRadius: '20px', backgroundColor: "green",color:'black', width: '500px', marginLeft: '5%', marginBottom: '05%' }}>
                <h3>Funcionario</h3>
                <p>{props.dono}</p>
                <p>{props.msg}</p>
                <p>{props.data}</p>

            </div>
        )
    }
}