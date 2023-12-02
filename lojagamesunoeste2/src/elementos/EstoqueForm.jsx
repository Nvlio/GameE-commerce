import React, { useContext } from "react";
import { Carregar, } from "../elementos/funcionalidades.jsx";
import Elem from "../elementos/Reutilizavel.jsx";
import "../App.css"
import { Contexto } from "../Contextualizacao.jsx";
import { Navigate } from "react-router-dom";
import "../estilo/estilo.css"
import { LinkContainer } from "react-router-bootstrap";
import Button from 'react-bootstrap/Button';

import { PostEstoque, PostImg } from "../funcoes/Post.jsx";
import { Prev } from "react-bootstrap/esm/PageItem.js";




export class FormEstoque extends React.Component {

    constructor(props) {
        super(props)
        this.url = 'http://localhost:2023/contas/'
        this.state = {
            Nome: ['Nome do produto', 'ex: assssins creed,etc...'],
            Plataforma: ['plataforma do produto', 'Exemplo: (pc,xbox,PS5,Nintendo Switch)'],
            idLoja: ['codigo da loja, verifique o seu documento se precisar', 'codigo aqui'],
            Quantidade: ['quantidade que vai ser adicionada', 'quantidade'],
            Valor: ['preço individual do produto', 'valor'],
            Lancamento: ['data de lancamento do produto', 'ex:11/05/2019'],
            Distribuidora: ['distribuidora do produto', 'ex:Ubisoft, Rockstar,...'],
            values: { nome: 'a', plataforma: '', idloja: '', quantidade: '', valor: '', lancamento: '', distribuidora: '', nomeImg: '', images: '' },
            status: false
        }

    }

    handleFiles = (event) => {
        const files = event.target.files
        const names = []
        const promises = []

        Object.values(files).forEach((file) => {
            const reader = new FileReader()

            promises.push(
                new Promise((resolve) => {
                    reader.onload = ((event) => {
                        const B64 = event.target.result
                        names.push(file.name)
                        resolve(B64)
                    });
                    reader.readAsDataURL(file);
                })
            )

        })

        Promise.all(promises).then((result) => {
            console.log(names)
            this.setState((prevState) => ({
                values: {
                    ...prevState.values,
                    nomeImg: names,
                    images: result
                }
            }))
        })
    }

    handleChange = (item, valor) => {
        console.log('item', item)
        if (item === 'nome' || item === 'plataforma' || item === 'idloja' || item === 'quantidade' || item === 'valor' || item === "lancamento" || item === "distribuidora") {
            this.setState(prevState => ({
                values: {
                    ...prevState.values,
                    [item]: valor
                }
            }))
            console.log(this.state.values.nomeImg)
            console.log(this.state.values.images)
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

    async Adicionar(e) {
        e.preventDefault();
        if (this.state.values.nomeImg === '' && this.state.values.valor !== '') {
            alert('coloque as fotos do produto')
        } else {
            const resposta = await PostEstoque('http://www.localhost:3004/Estoque', this.state.values)
            if (this.state.values.nomeImg !== "") {
                const imagesFim = await PostImg("http://www.localhost:3004/Imagens", this.state.values, resposta.msg.idProduto)

            }
            if (resposta) {

                this.setState({ status: true })
            }
        }

    }

    //função que leva de volta após 3 segs
    render() {
        if (this.state.status === true) {
            return (
                <div>
                    <h4>Estoque atualizado</h4>


                </div>
            )
        } else {
            return (
                //pega dados e usa sem precisar de props
                <div>
                    <div className="content">
                        <form className="Formu" >
                            <fieldset className="content">

                                <Elem fun="Inp" type='' name="nome" font={this.state.Nome[0]} place={this.state.Nome[1]} ext="Nome" onChange={this.handleChange} />
                                <br />
                                <Elem fun="Inp" type='' name="plataforma" font={this.state.Plataforma[0]} place={this.state.Plataforma[1]} ext="Nome" onChange={this.handleChange} />
                                <br />
                                <Elem fun="Inp" type='number' name="idloja" font={this.state.idLoja[0]} place={this.state.idLoja[1]} ext="Nome" onChange={this.handleChange} />
                                <br />
                                <Elem fun="Inp" type='number' name="quantidade" font={this.state.Quantidade[0]} place={this.state.Quantidade[1]} ext="Nome" onChange={this.handleChange} />
                                <br /><br />
                                <p>só faça essa parte caso o produto adicionado não exista no banco de dados</p>
                                <hr />
                                <Elem fun="Inp" type='number' name="valor" font={this.state.Valor[0]} place={this.state.Valor[1]} ext="Nome" onChange={this.handleChange} />
                                <br />
                                <Elem fun="Inp" type='' name="lancamento" font={this.state.Lancamento[0]} place={this.state.Lancamento[1]} ext="Nome" onChange={this.handleChange} />
                                <br />
                                <Elem fun="Inp" type='' name="distribuidora" font={this.state.Distribuidora[0]} place={this.state.Distribuidora[1]} ext="Nome" onChange={this.handleChange} />
                                <br /><br />
                                <label htmlFor="foto">Escolha uma foto:</label><br />
                                <input type="file" name="foto" multiple onChange={(e) => { this.handleFiles(e) }}></input>
                                <hr />
                                <Button onClick={(e) => { this.Adicionar(e) }} variant="success">Adicionar</Button>
                            </fieldset>
                        </form>

                    </div>
                </div>

            )
        }
    }
}
