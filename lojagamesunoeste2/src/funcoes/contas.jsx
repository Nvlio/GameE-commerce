import Excluir from "./exclude.jsx";
import Atualizar from "../funcoes/Update.jsx";
import Logar from "./Logar.jsx";
import { Autenticar, CheckAuteticacao } from "./Autenticar.jsx";


//classe responsavel por chamar metodos relacionadas a classes

export class Contas {
    #url
    #cpf;
    #nome;
    #email;
    #senha;
    #confirm;
    #telefone;
    #endereco
    #nivel;
    #lojaId

    constructor(url, cpf, nome, email, senha, tel, endereco, nivel = null, lojaid = null) {
        this.#url = url
        this.#cpf = cpf
        this.#nome = nome
        this.#email = email
        this.#senha = senha
        this.#telefone = tel
        this.#endereco = endereco
        this.#nivel = nivel
        this.#lojaId = lojaid
    }

    Teste() {

    }

    async Cadastrar() {
        return fetch(this.#url, {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
                cpf: this.#cpf,
                nome: this.#nome,
                telefone: this.#telefone,
                senha: this.#senha,
                email: this.#email,
                endereco: this.#endereco,
                nivel: this.#nivel,
                lojaid: this.#lojaId
            })
        }).then((resposta) => {
            return resposta.json()
        }).then((resp) => {
            console.log(resp)
            if (resp.msg) {
                return ({ status: -1, msg: resp.msg.message })
            } else {
                return ({ status: 0, msg: "",token:resp.token })
            }
        }).catch((e) => {
            return ({
                resposta: -1,
                msg: e
            })
        })
    }

    async Login(tipo,) {
        const resposta = await Logar(this.#url, tipo, this.#email, this.#senha)
        console.log(resposta)
        
        return resposta
    }

    async Excluir() {
        Excluir(this.#url, this.#cpf)
    }

    async Editar() {
        const resposta = await Atualizar(this.#url, this.#cpf, this.#nome, this.#telefone, this.#senha, this.#email, this.#endereco, this.#nivel)
        return resposta
    }

}