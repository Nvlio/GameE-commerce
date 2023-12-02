
import React from 'react'
export class Teste extends React.Component {
    constructor(props) {
        super(props)
        this.texto = props.texto
        this.url = 'http://localhost:2023/contas/'
        this.state = {
            Nome: ['Nome completo', 'Seu nome'],
            Senha: ['Senha', 'Qual sua senha'],
            values: { nome: 'a', email: '', senha: '', logou: 0, redirect: '/LogCad' }
        }

    }
    
    trocar(){
        alert(this.props.trocar)
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
            return (
                <div><h1>{this.texto}</h1></div>
            )
        
    }
}