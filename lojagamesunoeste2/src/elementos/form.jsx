import React, { useContext } from "react";
import { Carregar, } from "../elementos/funcionalidades.jsx";
import Elem from "../elementos/Reutilizavel.jsx";
import "../App.css"
import { Contexto } from "../Contextualizacao.jsx";
import { Navigate } from "react-router-dom";
import "../estilo/estilo.css"
import { LinkContainer } from "react-router-bootstrap";





export class Form extends React.Component {

    constructor(props) {
        super(props)
        this.url = 'http://localhost:2023/contas/'
        this.state = {
            Nome: ['seu Email', 'Email'],
            Senha: ['Senha', 'Qual sua senha'],
            values: { nome: 'a', email: '', senha: '', logou: 0, redirect: '/LogCad' }
        }

    }


    handleChange = (item, valor) => {
        if (item === 'nome' || item === 'email' || item === 'senha') {
            this.setState(prevState => ({
                values: {
                    ...prevState.values,
                    [item]: valor
                }
            }))
        }
    }

    /*Verificar = (e, setUser, user) => {
        e.preventDefault();
        console.log('chamei')
        //aqui modificar para pegar dados do banco de dados (nome,email,senha apenas esses dados)
        //testar fim de semana
        fetch(this.url + `${this.state.values.nome}-${this.state.values.senha}`, { method: 'GET' })
            .then((resp => {
                return resp.json()
            }))
            .then((resposta => {
                console.log(resposta.msg)
                if (resposta.msg === 'NotFound') {
                    this.setState(prevState=>({
                        values: {
                            ...prevState.values,
                            ['logou']:-1
                        }
                    }))

                } else {
                    setUser({ nome: this.state.values.nome })
                    this.setState(prevState => ({
                        values: {
                            ...prevState.values,
                            ['logou']: 1
                        }

                    }))
                    setTimeout(() => {
                        this.setState(prevState => ({
                            values: {
                                ...prevState.values,
                                ['redirect']: '/'
                            }
                        }))
                    }, 3000)
                }
            }))

        /* Antes da mudança estava aqui
        setUser({nome: this.state.values.nome})
        this.setState(prevState=>({
            values:{
                ...prevState.values,
                ['logou']:1
            }
            
        }))
        setTimeout(() => {
            this.setState(prevState=>({
                values:{
                    ...prevState.values,
                    ['redirect']:'/'
                }
            }))
            }, 3000);


    }*/
    componentDidMount() {

    }


    //função que leva de volta após 3 segs
    render() {
        if (this.state.values.logou > 0) {
            return (
                <div>
                    <h4>Voltando para conta principal</h4>
                    <br />
                    <Carregar />
                    <br />
                    <br />
                    <p>Aguarde</p>
                    <Navigate to={this.state.values.redirect} replace='false' />

                </div>
            )
        } else {
            return (
                //pega dados e usa sem precisar de props
                <Contexto.Consumer>
                    {value => {
                        const { user, setUser } = value
                        return (
                            <div>
                                <div className="content">
                                    <form className="Formu" >
                                        <fieldset className="content">
                                            <Elem fun="Inp" type='' name="nome" font={this.state.Nome[0]} place={this.state.Nome[1]} ext="Nome" onChange={this.handleChange} />
                                            <Elem fun="Inp" type='password' name="senha" font={this.state.Senha[0]} place={this.state.Senha[1]} ext="senha" onChange={this.handleChange} />
                                            {this.state.values.logou < 0 ? <p>Conta não encontrada confira se os dados estão corretos</p> : null}
                                            <Elem fun="But" type='submit' cor='green' text='Enviar' />
                                        </fieldset>
                                    </form>
                                    
                                </div>
                                <br/><br/><br/>
                            </div>
                        )
                    }}</Contexto.Consumer>
            )
        }
    }
}
