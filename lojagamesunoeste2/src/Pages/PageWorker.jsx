import React,{useContext} from "react";
import { Contexto } from "../Contextualizacao";

export default function Worker(props){

//padrão de pagina para trabalhador    
    return(
        <section className="content">

               <h1 style={{textAlign: "center"}}>{props.title}</h1>
                
                <h3 style={{paddingTop:'10px',textAlign:"center"}}>{props.subtitle}</h3>
                <h5 style={{textAlign:"center"}}>{props.normal}</h5>
                {props.children}
            </section>
    )
}