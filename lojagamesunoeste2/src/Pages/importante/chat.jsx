import { useState,useContext,useEffect } from "react"
import { Contexto } from "../../Contextualizacao.jsx"
import { Navibar } from "../../elementos/Nav.jsx"
import { PostMSG } from "../../funcoes/Post.jsx"
import Default from "../PageDefault.jsx"
import { ListaChat } from "../../elementos/Chats.jsx"
import Elem from "../../elementos/Reutilizavel.jsx"
import ViewTela from "../../elementos/ViewTela.jsx"
import { Navigate } from "react-router-dom"












































export default function PagChat(){
    const [status, setStatus] = useState('normal')
    const { user } = useContext(Contexto)
    const [codigo, setCodigo] = useState('')
    const [msg,setMsg] = useState('')

    

    function handleChange(item,values){
        setMsg(values)
    }

    async function keyDown(key){
        if (key === 'Enter'){
            let cpf;
            let funccpf;
            let dono;      
            if (user.Nivel!==undefined){
                funccpf = user.cpf
                dono = 2
            }else{
                cpf = user.cpf
                dono = 1
            }
            const resposta = await PostMSG('http://www.localhost:3004/Chats',{"conversa":msg,"clieCPF":cpf,"funcCPF":funccpf,'dono':dono,'idmsg':codigo})   
            console.log(resposta.msg.resp)
            setStatus(resposta.msg.resp)
        }
    }

    useEffect(()=>{},[status!==prev])


    if (status === "normal") {
        if (user.Nome != "") {
            return (
                <div>
                    <Navibar />
                    <div style={{ paddingTop: "8%" }}>
                        <Default link={''} title={'Chats'} subtitle={'Converssas'} normal={''} estilo={['100px', "justify"]} >
                            <ListaChat mar={['0px', '0px', '600px']} link={''} setstatus={setStatus} status={status} codigo={setCodigo} />
                        </Default>
                    </div>
                </div>)
        } else {
            return (
                <div></div>
                )
        }
    } else  {
        return (
            <div>
                <Navibar />

                <section style={{ paddingTop: '5px', width: '100%' }} >
                    <div style={{ width: '100%', paddingTop: '90px' }}>
                        <Default link={''} title={''} subtitle={''} normal={'mensagem'} estilo={['100px', "justify"]} >
                            <p onClick={() => { setStatus('normal') }}>Voltar</p>
                            <ViewTela id={codigo}/>
                            <div style={{border:'1px solid black',padding:'5px'}}>
                            <Elem fun="Inp" tipo="enviar" type='' name="msg"  place={"Escreva uma mensagem"} ext="CPF" onChange={handleChange} onKeyDown={keyDown} />
                            </div>
                        </Default>

                    </div>

                </section>
            </div>)
    }
}