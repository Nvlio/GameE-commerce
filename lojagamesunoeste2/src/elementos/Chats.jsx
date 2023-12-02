import React, { useContext, useEffect, useState } from "react"
import Blockitem from "./item.jsx"
import Chats from "../funcoes/Conversas.jsx"
import { Contexto } from "../Contextualizacao.jsx"
import Button from 'react-bootstrap/Button';



//responsavel pela lista responsavel pelo chat
export function ListaChat(props) {
    const { user } = useContext(Contexto)
    const [show, setShow] = useState('all')
    const [info, setInfo] = useState([]);
    let empregado
    let cliente
    if (user.Nivel !== undefined) {
        if (show !== 'all') {
            empregado = user.cpf
        } else {
            empregado = user.cpf
            cliente = 'all'
        }
    } else {
        cliente = user.cpf
    }

    function trocarShow(){
        if (show === 'all'){
            setShow('especifico')
        }else{
            setShow('all')
        }
    }


    //Atualizar essa parte pra pegar tudo de uma vez sem usar state
    async function Get() {
        const conta = new Chats(`http://www.localhost:3004/Chats/`, empregado, cliente)
        const valor = await conta.getinfo()
        console.log(valor)
        setInfo(valor)
    }


    //chama ao iniciar  a renderização
    useEffect(() => {
        try {
            console.log('Ola',show)
            Get()
        } catch (e) {
            console.log(e)
        }
    }, [show])









    return (
        <div>

            {user.Nivel!==undefined?<Button style={{ margin: '02%',border:'1px solid black' }} variant="outline-dark" onClick={()=>{trocarShow()}}>{show==='all'?'mostrar suas conversas':'mostrar as conversas sem funcionarios'}</Button>:null}

            <section style={{ height: props.mar[2], overflowY: "auto", overflowX: 'hidden', paddingLeft: props.mar[0], backgroundColor: "gray" }}>
                <section style={{ display: 'flex', flexDirection: "row", flexWrap: "wrap", height: '1000px', width: '100%' }}>
                    {info.map((chatInfo) => {
                        return (
                            <div style={{ margin: props.mar[1], padding: '5% 5%' }}>
                                <Blockitem item={chatInfo} setstatus={props.setstatus} setcodigo={props.codigo} status={'chat'} />

                            </div>
                        )
                    })}

                </section>
            </section>
        </div>
    )
}


export function BasicLista(props) {


    const children = (React.Children.toArray(props.children))
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {props.children.map((image, index) => {
                return (
                    <div onClick={() => { props.guardar(index) }} style={{ margin: '35px', border: "1px solid black", borderRadius: '10px', padding: '10px' }}>{image}</div>
                )
                {/*vai ter um hover aqui */ }
            })}
        </div>
    )
}