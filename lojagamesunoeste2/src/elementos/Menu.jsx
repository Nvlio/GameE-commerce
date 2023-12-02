import React, { useContext, useState } from 'react'
import "../estilo/estilo.css"
import { LinkContainer } from 'react-router-bootstrap'
import Elem from './Reutilizavel'
import { Get } from '../funcoes/Get.jsx'
import { Contexto } from '../Contextualizacao.jsx'

//menu localizado no lado esquerdo da pagina
export function MenuLado(props) {
    return (
        <section className='menu' style={{ height: '100%' }}>
            <ul>
                {props.options.map((option, index) => {
                    return (
                        <li><LinkContainer to={`/${props.links[index]}`}><div className='blockline'>{option}</div></LinkContainer></li>
                    )

                })}

                {props.nivel == 1 ?
                    <div>
                        {props.especial.map((item, index) => {
                            return (
                                <li onClick={() => { console.log(props.links[index + 2]) }}><LinkContainer to={`/${props.links[index + 2]}`}><div className='blockline'>{item}</div></LinkContainer></li>
                            )
                        })}
                    </div>
                    : null}
            </ul>
        </section>
    )
}

//componente para barra de compras
export function MenuCompra(props) {
    const [prod, setProd] = useState('')

    //função que atualiza valor de produto
    function handleChange(item, valor) {
        if (item === 'nome') {
            setProd(valor)
        }
    }

    function handleKeyPress(botao) {
        if (botao === "Enter") {
            props.data(prod)
            props.setStatus('verificarunique')
        }
    }

    function setStatus(e) {
        e.preventDefault()
        if (props.tipo) {

            console.log(e.target.textContent.split(' ')[0], "sou eu")
            props.tipo(e.target.textContent.split(' ')[0],)
        }
    }

    return (

        <section className='menu' style={{ height: props.height }}>
            <div className='search'>
                <Elem tipo='pesquisar' fun="Inp" type='' name="nome" font={''} place={'nome do produto'} ext="Nome" onChange={handleChange} onKeyDown={handleKeyPress} />
            </div>
            {prod != "" ? <div><p> resultados de:</p><p>{prod}</p></div> : null}
            {props.options[0] !== null ? <ul>
                {props.options.map((option, index) => {

                    return (
                        <li><div onClick={(e) => { setStatus(e) }} className='blockline'>{option}</div></li>
                    )

                })}
            </ul> : null}

        </section>
    )
}


//menu localizado no topo da pagina
export function MenuTop(props) {
    const lista = [...props.tipos]

    function Change(e) {
        props.action(e.target.textContent)
        if (props.action2) {
            props.action2("")
        }
        return
    }

    return (
        <div style={{ display: 'flex', flexDirection: "row", border: "1px solid black", justifyContent: 'center' }}>
            {lista.map((item, indes) => {
                return (
                    <div onClick={(e) => { Change(e) }} className='clicavel' style={{ border: '1px solid black', borderRadius: "10px", margin: '10px' }}><h3 >{item}</h3></div>
                )
            })}
        </div>
    )
}
