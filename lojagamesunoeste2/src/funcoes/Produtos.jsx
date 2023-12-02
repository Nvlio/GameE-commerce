import React from "react";
import { Get, GetImage, GetSort } from "./Get.jsx";


//classe responsavel por chamar metodos relacionadas a produtos
export default class Produtos {
    #url
    #id
    #nome
    #plataforma
    #preco
    #lancamento
    #distribuidora

    constructor(url, id, nome, plataforma, preco, lancamento, distribuidora) {
        this.#url = url
        this.#id = id
        this.#nome = nome
        this.#plataforma = plataforma
        this.#preco = preco
        this.#lancamento = lancamento
        this.#distribuidora = distribuidora
    }

    //metodo para pegar lista
    async GetAll(tipo) {
        let lista;
        if (tipo) {
            const listaOrdenada = await GetSort(this.#url, tipo)
            lista = listaOrdenada.itens
        } else {
            lista = await Get(this.#url)
        }
        return lista
    }

    
    async GetOne() {
        const urlP = this.#url + this.#id
        const lista = await Get(urlP)
        return lista[0]
    }

    //metodo que pega imagem
    async GetImg(prodID) {
        const resposta = await GetImage(this.#url, prodID, 1)
        return resposta
    }
}