import React, { useContext, useEffect, useState } from "react"

import { Telas } from "../elementos/tela.jsx";

import "../estilo/estilo.css"
import "../estilo/bootstrap.min.css"
import { LinkContainer } from "react-router-bootstrap";
import { Contexto } from "../Contextualizacao.jsx";


//componente que tem a estrutura padrão da tela 
export default function Default(props) {
    const {user} = useContext(Contexto)
const filhos = React.Children.toArray(props.children);
const img = filhos.find((filho)=>{return filho.type === "img"})
const Elem = filhos.find((filho)=>{return filho.type === "ƒ Elem(props)"})

const [show,setShow] = useState('none')
let valor = props.title[1]

function Mostrar(){
    
    setShow("block")
}
    
useEffect(()=>{
    if(props.pagamento !== undefined && props.pagamento===1){
        setShow('block')
    }else{
        setShow('none')
    }
},[props.pagamento])

//se nos childrens tiver imagem ele chama o primeiro padrão de estrutura se não o segundo
if (img){
    return(
        <section style={{textAlign:'center'}}>
            <section className={props.tipoclass} style={{paddingTop:'00%'}}><section >{img}</section></section>
            <section className="content">

               <h1 style={{textAlign: "center"}}>{props.title}</h1>
                <h3 style={{paddingTop:'100px',textAlign:"center"}}>{props.subtitle}</h3>
                <h5 style={{textAlign:"center"}}>{props.normal}</h5>
                <p style={{textAlign:"center"}}>{props.info}</p>
                <section className="container">
                {Elem?<div>{Elem}</div>:null}
                <br/>
                {props.divtitle.map((title,titleind)=>{
                    return(
                        <Telas divtitle={title} class={props.divtitle.length===1?"null":titleind===0?"left":titleind===2?"right":"center"} link={props.link[titleind]} func={props.func}/>
                    )
                })}
                
                </section>
            </section>
                        
        </section>
        
    )
}
else{
    return(
        <section  style={{paddingTop:'10px',textAlign:'center',display:'block'}}>
            <section className="center">
                {show==="block"?<s><h1 >{`${props.title[0]}${props.title[1]}`}</h1></s>:<h1 >{props.title}</h1>}
                <h3 style={{paddingTop:'10px'}}>{props.subtitle}</h3>
                <h5>{props.normal}</h5>
                <p style={{display:show,padding:'-10px'}}>{props.info}</p>
                <div style={{ border:'1px solid black',padding:'10px',color:'blue',display:show, }}>{valor-valor*0.10}</div>
            </section>
            <section>
                <LinkContainer to={props.link}><div>{props.children}</div></LinkContainer>
            </section>
        </section>
    )
}

};