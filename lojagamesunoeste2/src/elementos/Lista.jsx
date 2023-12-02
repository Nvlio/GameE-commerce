import React, { useEffect, useState } from "react"
import Blockitem from "./item.jsx"
import Produtos from "../funcoes/Produtos.jsx"
import { GetImage, GetUrl } from "../funcoes/Get.jsx"
import Atualizaimglista from "../funcoes/atualizarlista.jsx"


//pagina estruturada para ter a lista principal de produtos
export function ListaProd(props) {
    const [lista, setLista] = useState([])
    const [listaImg, setListaImg] = useState([])
    const [status, setStatus] = useState(false)
    const [primeira, setPrimeira] = useState(false)
    const resposta = ""


    //Atualizar essa parte pra pegar tudo de uma vez sem usar state
    async function Get() {
        const conta = new Produtos("http://www.localhost:3004/Produtos")
        const valores = await conta.GetAll(props.tipo)
        setLista([...valores])
    }

    useEffect(()=>{
        Get();
    },[props.tipo])


    //função que pega imagens
    async function uppdate() {
        const imagens = Atualizaimglista(lista)
    }



    //chama ao iniciar  a renderização
    useEffect(() => {
        try {
            Get().then((resp) => {
                setStatus(true)
            })
        } catch (e) {
            console.log(e)
        }
    }, [props.tipo])



    


    return (
        <section style={{ height: props.mar[2], overflowY: "auto", overflowX: 'hidden', paddingLeft: props.mar[0], backgroundColor: "gray" }}>
            <section style={{ display: 'flex', flexDirection: "row", flexWrap: "wrap", height: '1000px', width: '100%' }}>
                {lista.map((item, indice) => {
                    
                    return (
                        <div style={{ margin: props.mar[1] }}>
                            <Blockitem imgurl={listaImg} item={item} link={props.link} setstatus={props.setstatus} status={props.status}/>

                        </div>
                    )
                })}

            </section>
        </section>
    )
}

//lista basica usada para coisas mais simples e predefenidas, que não precisa do servidor para ter 
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