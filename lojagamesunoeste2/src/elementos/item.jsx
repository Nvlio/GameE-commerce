import { LinkContainer } from "react-router-bootstrap"
import { GetUrl } from "../funcoes/Get.jsx"
import { useState, useEffect } from "react"
import toBlob from "../funcoes/blob.jsx"

export default function Blockitem(props) {
    const [urlimg, setUrlImg] = useState('')
    const url = "http://www.localhost:3004/Imagens"
    let link = ""
    if (props.link && props.item.idProd){
        link = `${props.link}/${props.item.idProd}`
    }
    /*return(
        <section>
            <img src={props.img} alt={props.alt}/>
            <h5>{props.title}</h5>
            <p>{props.plataform}</p>
            <p>R$:{props.valor}</p>
        </section>
    )*/
    function set() {
        if (props.setstatus) {
            props.setstatus('expanded')
            props.setcodigo(props.item.idMensagem)
        } else {
            return
        }
    }



// pega imagem aqui
    useEffect(() => {
        if (props.status !== "chat") {
            GetUrl(url, props.item.idProd, props.item.nome, 'u').then((resposta) => {
                return toBlob(resposta.resposta.img, resposta.resposta.nome)
            }).then((resp) => {
                setUrlImg(URL.createObjectURL(resp))
            })
        }
    }, [props.item])



    //verifica se é pra chat ou produto
    const mar = props.mar
    return (
        <LinkContainer onClick={set} className="clicavel" style={{ border: '1px solid black', padding: '10px', margin: '05px', backgroundColor: 'white' }} to={link}>
            <section>
                {props.status !== "chat" ?
                    <div>
                        <img src={urlimg} height={'310px'} alt="produto" />
                        <h1 style={{ paddingTop: '10px', fontSize: '90%' }}>{`${props.item.nome}`}</h1>
                        <p>{props.item.plataforma}</p>
                        <p>{`R$:${props.item.preco}`}</p>
                    </div> 
                    : 
                    <div>
                        <h3>Cliente:</h3>
                        <p>{props.item.clienteCPF}</p>
                    </div>}


            </section>
        </LinkContainer>
    )
}