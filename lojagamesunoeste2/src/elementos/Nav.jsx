import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { Contexto } from '../Contextualizacao.jsx';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';

import "../estilo/estilo.css"
import "../estilo/bootstrap.min.css"


/* barra de navegação do site */

//mudar a imagem da lista para as 3 linhas serem o botão
//adicionar botão que mostra lista de compras do carrinho
export function Navibar(props) {
    const { user } = useContext(Contexto)
    return (
        <LinkContainer to={"/"}><div className='Navibar'>

            <Navbar bg="light">
                <Container style={{ padding: "0px", margin: '0px 0px 0px 10px' }}>
                    <img src={require("../elementos/fotos/Logo.png")} height={'70px'} width={"70px"} alt='menu' />
                    <Navbar.Brand href="#home"></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {user.Nome === "" ?
                        <LinkContainer to={'/UserLogCad'}><Navbar.Brand><Button variant="outline-info">Entrar</Button>{' '}</Navbar.Brand></LinkContainer> :
                    user.Nivel === undefined && user.Token !== undefined ?
                        <Navbar.Brand><div style={{ display: "flex" }}><p>Player 1: {user.Nome}</p><img src={require("../elementos/fotos/checked.png")} height={'16px'} width={"16px"} /></div></Navbar.Brand> :
                    user.Nivel === 1 ?
                        <Navbar.Brand><div style={{ display: "flex" }}><p>gerente:{user.Nome}</p>{user.Token!==undefined || user.token!==undefined?<img src={require("../elementos/fotos/checked.png")} height={'16px'} width={"16px"} />:null}</div></Navbar.Brand> :
                    user.Nivel !== undefined ?
                        <Navbar.Brand><div style={{ display: "flex" }}><p>funcionário:{user.Nome}</p>{user.Token!==undefined || user.token!==undefined?<img src={require("../elementos/fotos/checked.png")} height={'16px'} width={"16px"} />:null}</div></Navbar.Brand>:
                    null}
                    {/* cadastro e login vai ficar aqui*/}
                </Container>
                {/*user.nome !== "" ? <Navbar.Brand><p style={{ fontSize: '15px' }}>{user.nome}</p></Navbar.Brand> : <LinkContainer to={"/LogCad"} ><Navbar.Brand><button style={{ color: 'white' }} type="button" className="btn btn-info">Conectar-se</button></Navbar.Brand></LinkContainer>*/}

            </Navbar>

        </div>
        </LinkContainer>
    )
}


