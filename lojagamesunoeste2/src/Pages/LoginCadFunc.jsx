import React, { useContext } from "react";
import { Carregar, } from "../elementos/funcionalidades.jsx";
import Elem from "../elementos/Reutilizavel.jsx";
import "../App.css"
import { Contexto } from "../Contextualizacao.jsx";
import { Navigate } from "react-router-dom";
import "../estilo/estilo.css"
import { LinkContainer } from "react-router-bootstrap";
import { Contas } from "../funcoes/contas.jsx";
import Button from 'react-bootstrap/Button';
import { PostUsuario } from "../funcoes/Post.jsx";
import { Autenticar } from "../funcoes/Autenticar.jsx";


//parte responsavel pela estruturação de formulario de cadastro de funcionario

export class CadFunc extends React.Component {



    constructor(props) {
        super(props)
        this.url = 'http://localhost:2023/contas'
        this.state = {
            cpf: ['CPF do funcionario', "00000000000"],
            Nome: ['Nome completo ', 'Nome do funciionario'],
            Email: ['Endereço de email do funcionário', 'email (exemplo@mail.com)'],
            Senha: ['senha do funcionário','pode ser atualizada depois'],
            Tel: ['Numero de telefone', 'escreva o telefone (99)99999-9999'],
            Endereco: ['endereço', 'escreva aqui o endereço'],
            IDloja:["ID da loja vinculada ao funcionario",""],
            Nivel:["Nivel do funcionario","3=funcionario normal, 2=funcionario TI, 1=gerente"],
            status:false,
            values: { cpf: '', nome: '', email: '', senha: '', telefone: '', endereco: '',idloja:'',nivel:'' }
        }
    }

    trocar = () => {
        this.props.status({ tipo: "login" })
    }

    handleChange = (item, valor) => {
        this.setState({status:"false"})
        if (item === 'cpf' ||item === 'nome' || item === 'email' || item === 'senha' || item === 'telefone' || item ==="endereco" || item ==="idloja" || item === 'nivel') {
            this.setState(prevState => ({
                values: {
                    ...prevState.values,
                    [item]: valor
                }
            }))
        }
    }

    //criar a função cadastro
    async Adicionar(e) {
        e.preventDefault()
        const func = this.state.values
        const resp = await PostUsuario('http://www.localhost:3004/Empregados',{cpf:func.cpf,nome:func.nome,email:func.email,senha:func.senha,telefone:func.telefone,endereco:func.endereco,idloja:func.idloja,nivel:func.nivel})
        this.setState({status:resp.resp})
    }

    render() {
        return (
            <div className="content">
                <form className="Formu ">
                    <fieldset style={{ border: '1px solid black', borderRadius: "10px", padding: "10px", margin: "10px" }}>
                        <Elem fun="Inp" type='' name="cpf" font={this.state.cpf[0]} place={this.state.cpf[1]} /*Lista={this.state.Nome}*/ ext="CPF" onChange={this.handleChange} />
                        <Elem fun="Inp" type='' name="nome" font={this.state.Nome[0]} place={this.state.Nome[1]} /*Lista={this.state.Nome}*/ ext="Nome" onChange={this.handleChange} />
                        <Elem fun="Inp" type='' name="email" font={this.state.Email[0]} place={this.state.Email[1]} ext="Email" onChange={this.handleChange} />
                        <Elem fun="Inp" type='password' name="senha" font={this.state.Senha[0]} place={this.state.Senha[1]} ext="senha" onChange={this.handleChange} />                        <Elem fun="Inp" type='tel' name="telefone" length='15' font={this.state.Tel[0]} place={this.state.Tel[1]} ext="tel" onChange={this.handleChange} />
                        <Elem fun="Inp" type="tel" name="endereco" font={this.state.Endereco[0]} place={this.state.Endereco[1]} ext="Endereco" onChange={this.handleChange} />
                        <Elem fun="Inp" type="number" name="idloja" font={this.state.IDloja[0]} place={this.state.IDloja[1]} ext="idloja" onChange={this.handleChange} />
                        <Elem fun="Inp" type="number" name="nivel" font={this.state.Nivel[0]} place={this.state.Nivel[1]} ext="nivel" onChange={this.handleChange} />

                        <Button style={{margin:'10px 10px'}}variant="danger" onClick={(e) => { this.Logar(e) }}>Resetar</Button>
                        <Button variant="success" onClick={(e) => { this.Adicionar(e) }}>Adicionar</Button>

                    </fieldset>
                </form>
                {this.state.status==='work'?<div style={{backgroundColor:'green',color:"white"}}><p>Funcionario adicionado</p></div>:null}
            </div>
        )
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
//parte responsavel pela estruturação de formulario de login de funcionario

export class LogFunc extends React.Component {
    static contextType = Contexto

    constructor(props) {
        super(props)
        this.url = 'http://www.localhost:3004/Empregados'
        this.state = {
            Nome: ['seu Email', 'Email'],
            Senha: ['Senha', 'Qual sua senha'],
            values: { nome: 'a', email: '', senha: '', logou: 0, redirect: '/LogCad' }
        }

    }


    handleChange = (item, valor) => {
        if (item === 'email' || item === 'senha') {
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

    async Logar(e) {
        //-1 deu ruim|0 esta normal| 1 terminou| 2 arregando
        this.setState({ status: 2 })
        const user = this.state.values
        const conta = new Contas(this.url, user.cpf, user.nome, user.email, user.senha, user.telefone, user.endereco)
        const resposta = await conta.Login('Login')
        await Autenticar(resposta.body.token)
        this.setState({ status: resposta.status })
        this.setState({ msg: resposta.msg })
        this.update(resposta.status, resposta)
    }

    update(status, data) {
        if (status === -1) {
            this.setState({ status: -1 })
            return
        } else {
            const user = data.body.resp
            this.context.setUser({
                cpf: user.cpf,
                Nome: user.nome,
                Telefone: user.telefone,
                Senha: user.senha,
                Email: user.email,
                Endereco: user.endereco,
                Nivel:user.nivel,
                lojaId:user.lojaID,
                token:data.body.token
            })
            this.setState({ status: 1 })


        }

    }

    //função que leva de volta após 3 segs
    render() {
        if (this.state.status === 1) {
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
                                            <Elem fun="Inp" type='' name="email" font={this.state.Nome[0]} place={this.state.Nome[1]} ext="Email" onChange={this.handleChange} />
                                            <Elem fun="Inp" type='password' name="senha" font={this.state.Senha[0]} place={this.state.Senha[1]} ext="senha" onChange={this.handleChange} />
                                            {this.state.values.logou < 0 ? <p>Conta não encontrada confira se os dados estão corretos</p> : null}
                                            <Button variant="success" onClick={(e) => { this.Logar(e) }}>Entre</Button>
                                        </fieldset>
                                    </form>

                                </div>
                                <br /><br /><br />
                            </div>
                        )
                    }}</Contexto.Consumer>
            )
        }
    }
}
