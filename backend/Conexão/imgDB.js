import connect from "./ConectDB.js";
import modImg from "../Modelos/imgMod.js";
import fs from 'fs'
import { rejects } from "assert";
import connectar from "./ConectDB.js";

//classe responsavel para a comunicação e execução correta de dados vindos do sql
export default class dbImg {

    async GET() {
    }

    async GETID(pcod) {
        try {
            const conexao = await connectar()
            const valor = [pcod.split('-')[0]]
            const sql = "SELECT * FROM imagens WHERE prodcod = ?"
            const [lista] = await conexao.query(sql,valor)
            const list =[]
            for (let img of lista){
                const image = new modImg(img.imagem,img.prodcod,img.cod)
                list.push(image.ToJson())
            }
            return (list)
        } catch (erro) {
            return { status: false, message: erro }
        }
    }

    async PUT(nome, desc, cod, nivel) {
    }

    async POST(nome, pro,index) {
        if (index==0){
            const tipo = nome.split('.')[1]
            nome = `${nome.split('-')[0]}.${tipo}`
        }
        try {
            const conexao = await connect()
            const sql = "INSERT INTO imagens (imagem,prodcod) VALUES (?,?)"
            const values = [nome,  pro]
            console.log(values)

            await conexao.query(sql, values)
            return { status: true, message: "Imagem adicionada!" }
        } catch (erro) {
            console.log(erro)
            return { status: false, message: erro }
        }
    }

    //metodo que excluir arquivo 
    async Exclude(name){
        const path = 'D:/Portifolio/Site_Umbrella novo/fotos'
            fs.unlink(`${path}/${name}`,(err)=>{
                if(err){
                    return {msg:'ocorreu um erro ao excluir foto'}
                }else{
                    return {msg:"imagem excluida com sucesso!"}
                }
            })
        
    }

    //ao excluir verifica qual o codigo forneceido, ele recupera o nome e realiza a exclusaõa do arquivo referido
    async DELETE( pcod, cod) {
        const conexao = await connect()
        let values;
        let code;
        let name;
        if (pcod != null) {
            code = 'prod'
            values = [pcod]

        } else {
            code='cod'
            values = [cod]
        }
        name = await this.GETID(pcod,cod)
        await this.Exclude(name[0]['nome'])
        const sql = `DELETE FROM imagens WHERE ${code} = ?`
        await conexao.query(sql, values)
        return { status: true, message: "imagem Apagada!" }
    }
};