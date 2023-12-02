import React, { useContext } from "react";
import { Carregar, } from "../elementos/funcionalidades.jsx";
import Elem from "../elementos/Reutilizavel.jsx";
import "../App.css"
import { Contexto } from "../Contextualizacao.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import "../estilo/estilo.css"
import { LinkContainer } from "react-router-bootstrap";
import { Contas } from "../funcoes/contas.jsx";
import Button from 'react-bootstrap/Button';
import { Autenticar } from "../funcoes/Autenticar.jsx";



//parte responsavel pela estruturação de formulario de cadastro de usuario

export class CadUser extends React.Component {

    static contextType = Contexto

    constructor(props) {
        super(props)
        this.url = 'http://www.localhost:3004/Clientes'
        this.state = {
            status: 0,
            msg: "sss",
            cpf: ['Seu cpf', "00000000000"],
            Nome: ['Nome completo', 'Seu nome'],
            Email: ['Endereço de email', 'Qual o se email (exemplo@mail.com)'],
            Senha: ['Senha', 'Qual sua senha'],
            Confirma: ['Confirmação de senha', 'repita sua senha'],
            Tel: ['Numero de telefone', 'escreva seu telefone (99)99999-9999'],
            Endereco: ['Seu endereço', 'escreva aqui seu endereço'],
            noti: ['Quer receber notificações', 'radio', 2, 'sim', 'nao'],
            values: { cpf: '', nome: '', email: '', senha: '', telefone: '', endereco: '' }
        }
    }

    trocar = () => {
        this.props.status({ tipo: "login" })
    }

    handleChange = (item, valor) => {
        if (item === 'nome' || item === 'email' || item === 'senha' || item === 'telefone' || item === 'cpf' || item === 'endereco') {

            this.setState(prevState => ({
                values: {
                    ...prevState.values,
                    [item]: valor
                }
            }))
        }
    }

    async Cadastrar(e) {
        this.setState({ status: 2 })
        const user = this.state.values
        const conta = new Contas(this.url, user.cpf, user.nome, user.email, user.senha, user.telefone, user.endereco)
        const resposta = await conta.Cadastrar()
        this.setState({ status: resposta.status })
        this.setState({ msg: resposta.msg })
        this.update(resposta.status, this.state.values.cpf, user,resposta.token)
        //fazer função que faz o status ser 2 de carregar e leva para a pga inicial 
    }

    async Editar(e) {
        this.setState({ status: 2 })
        const user = this.state.values
        const conta = new Contas(this.url, this.props.cpf, user.nome, user.email, user.senha, user.telefone, user.endereco)
        const resposta = await conta.Editar()
        this.setState({ status: resposta.status })
        this.setState({ msg: resposta.resposta.resp })
        this.update(resposta.status, this.props.cpf, user)
    }

    update(status, cpf, user,token) {

        if (status === -1) {
            this.setState({ status: -1 })
            return
        } else if (token ===null){
            this.context.setUser({
                cpf: cpf,
                Nome: user.nome,
                Telefone: user.telefone,
                Senha: user.senha,
                Email: user.email,
                Endereco: user.endereco
            })
            this.setState({ status: 2 })
        }else{
            console.log(token)
            this.context.setUser({
                cpf: cpf,
                Nome: user.nome,
                Telefone: user.telefone,
                Senha: user.senha,
                Email: user.email,
                Endereco: user.endereco,
                Token:token
            })
            this.setState({ status: 2 })


        }

    }

    render() {
        //se o status for 2 significa que vai carregar o 1 é para quando finalizou aqui ele volta pro main
        if (this.state.status === 2 ) {
            return (
                <div>
                    <h4>Voltando para conta principal</h4>
                    <br />
                    <Carregar />
                    <br />
                    <br />
                    <p>Aguarde</p>

                </div>
            )
        }else if(this.state.status===1){
            return(
                <div>
                    <h4>Voltando para conta principal</h4>
                    <br />
                    <Carregar />
                    <br />
                    <br />
                    <p>Aguarde</p>
                <Navigate to={'/'} replace='false' />
                </div>
            )
        } else {
            return (
                <div className="content">
                    {this.state.status === -1 ? <div className="failed">{this.state.msg}</div> : null}
                    <form className="Formu ">
                        <fieldset style={{ border: '1px solid black', borderRadius: "10px", padding: "10px", margin: "10px" }}>
                            {this.props.tipo != 'Editar' ? <Elem fun="Inp" type='' name="cpf" font={this.state.cpf[0]} place={this.state.cpf[1]} /*Lista={this.state.Nome}*/ ext="cpf" onChange={this.handleChange} /> : null}

                            <Elem fun="Inp" type='' name="nome" font={this.state.Nome[0]} place={this.state.Nome[1]} /*Lista={this.state.Nome}*/ ext="Nome" onChange={this.handleChange} />
                            <Elem fun="Inp" type='' name="email" font={this.state.Email[0]} place={this.state.Email[1]} ext="Email" onChange={this.handleChange} />
                            <Elem fun="Inp" type='password' name="senha" font={this.state.Senha[0]} place={this.state.Senha[1]} ext="senha" onChange={this.handleChange} />
                            <Elem fun="Inp" type='password' name="confirmse" font={this.state.Confirma[0]} place={this.state.Confirma[1]} ext="senha2" onChange={this.handleChange} />
                            <Elem fun="Inp" type='tel' name="telefone" length='15' font={this.state.Tel[0]} place={this.state.Tel[1]} ext="tel" onChange={this.handleChange} />
                            <Elem fun="Inp" type="tel" name="endereco" font={this.state.Endereco[0]} place={this.state.Endereco[1]} ext="Endereco" onChange={this.handleChange} />
                        </fieldset>
                        <Elem fun="But" type='reset' cor='red' text='Resetar' />
                        {this.props.tipo != "Editar" ? <Button variant="success" onClick={(e) => { this.Cadastrar(e) }}>Cadastrar</Button> : <Button variant="success" onClick={(e) => { this.Editar(e) }}>Editar</Button>}
                    </form>
                    {this.props.tipo != 'Editar' ? <p>Ja possui conta? <strong><span className="clicavel" onClick={this.trocar}>entre</span></strong></p> : null}
                </div>
            )
        }


    }



    /*Add = (event) => {
    
        event.preventDefault();
        fetch(this.url, {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
                nome: this.state.values.nome,
                email: this.state.values.email,
                senha: this.state.values.senha,
                telefone: this.state.values.telefone,
                idade: this.state.values.idade,
                notificacao: this.state.values.notificacao
            })
        }).then((resposta) => {
            return resposta.json()
        }).then((resp) => {
            alert(resp.mensagem)
            this.props.showtab(true)
        })
    }*/



}

//parte responsavel pela ewstruturação de formulario de login de usuario
export class LogUser extends React.Component {
    static contextType = Contexto

    constructor(props) {
        super(props)
        this.url = 'http://www.localhost:3004/Clientes'
        this.state = {
            Email: ['Seu email', 'Email'],
            Senha: ['Senha', 'Qual sua senha'],
            status: "funcionou", msg: "",
            values: { nome: 'a', email: '', senha: '', logou: 0, redirect: '/LogCad' }
        }

    }

    trocar = () => {
        this.props.status({ tipo: "cadastro" })
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


    async Logar(e) {
        const user = this.state.values
        const conta = new Contas(this.url, user.cpf, user.nome, user.email, user.senha, user.telefone, user.endereco)
        const resposta = await conta.Login('Login')
        await Autenticar(resposta.body.token)
        this.setState({ status: resposta.status })
        this.setState({ msg: resposta.msg })
        this.update(resposta.status,resposta)
        
    }

    update(status, data) {
        if (status === -1) {
            this.setState({ status: "Erro" })
            return
        } else {
            const token = data.body.token
            const user = data.body.resp
            this.context.setUser({
                cpf: user.cpf,
                Nome: user.nome,
                Telefone: user.telefone,
                Senha: user.senha,
                Email: user.email,
                Endereco: user.endereco,
                Token:token
            })
            this.setState({ status: "finalizei" })

        }

    }



    //função que leva de volta após 3 segs
    render() {
        if (this.state.status === "finalizei") {
            return (
                <div>
                    <h4>Voltando para conta principal</h4>
                    <br />
                    <Carregar />
                    <br />
                    <br />
                    <p>Aguarde</p>
                    <Navigate to={'/'} replace='false' />

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
                                    {this.state.status === -1 ? <div className="failed">{this.state.msg}</div> : null}
                                        <fieldset className="content">
                                            <Elem fun="Inp" type='' name="email" font={this.state.Email[0]} place={this.state.Email[1]} ext="Email" onChange={this.handleChange} />
                                            <Elem fun="Inp" type='password' name="senha" font={this.state.Senha[0]} place={this.state.Senha[1]} ext="senha" onChange={this.handleChange} />
                                            {this.state.values.logou < 0 ? <p>Conta não encontrada confira se os dados estão corretos</p> : null}
                                            <br />
                                            <Button variant="success" onClick={(e) => { this.Logar(e) }}>Entre</Button>
                                        </fieldset>
                                    </form>
                                    <p>Não encontrou sua conta? <strong><span className="clicavel" onClick={this.trocar}>cadastra-se</span></strong></p>
                                </div>
                                <br /><br /><br />
                                <h3 style={{ textAlign: "center" }}>É um empregado nosso?<br /><br /><LinkContainer to={"/FuncLogCad"}><span className="clicavel">entrar em sua conta</span></LinkContainer></h3>
                            </div>
                        )
                    }}</Contexto.Consumer>
            )
        }
    }
}
