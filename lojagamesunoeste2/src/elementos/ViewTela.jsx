import { useEffect } from "react";
import { useState } from "react";
import Chats from "../funcoes/Conversas.jsx";
import Mensagem from "./msg.jsx";


//pagina rresponsavel pela parte onde vai ter o conteudo do chat 
export default function ViewTela(props) {
    const [mensagens, setMensagens] = useState()
    



    useEffect(() => {
        async function getMensagens() {
            if (props.status!=="Adicionar"){
                const conta = new Chats('http://www.localhost:3004/Chats', null, null, null, null, null, props.id)
            
            const resp = await conta.getAllMsg()
            setMensagens(resp.itens)}
            console.log('ola?',props.status)
            return
        }
        getMensagens()
    }
        , [,props.data])



    return (
        <div style={{ backgroundColor: "gray", width: "100%", padding: '10px', overflowX: "hidden", height: '460px' }}>
            {mensagens === undefined ? null :
                <div >
                    {mensagens.map((msg,ind) => {
                        return (
                            <div key={ind}>
                            <Mensagem  dono={msg.dono} msg={msg.conversa} data={msg.data} />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}