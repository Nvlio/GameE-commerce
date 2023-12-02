import React from "react";
import Button from 'react-bootstrap/Button';
import { LinkContainer } from "react-router-bootstrap";


//pagina de aviso que é chamado e retorna para login de funcionarios
//mudar para permitir que o link seja escolhido 
export default function AvisarLog() {
    return (
        <div>
            <br/><br/><br/><br/><br/><br/><br/>
            <section style={{border:"1px solid black",borderRadius:'10px',marginLeft:"20%",marginRight:"20%" }}>
                
                <div style={{ textAlign: "center",paddingTop:'100px' }}>
                    <h1>Você Não esta logado!</h1>
                    <br></br>
                    <h2>entre na sua conta</h2>
                    <br></br>
                    <div>
                        <LinkContainer to={"/FuncLogCad"}>
                            <Button variant="success">Entre</Button>
                        </LinkContainer>
                    </div>
                </div>
                <div className="container" style={{paddingLeft:'100px'}}>
                    <img src={require('../elementos/fotos/Mario.png')} height='300px' />
                    <img src={require("../elementos/fotos/Sonic.png")} height='300px'  />
                </div>
            </section>
        </div>
    )
};