import salvarIMG from "../Funcões/imagens.js"
import modImg from "../Modelos/imgMod.js"


export default class imagectrl {

    //metodo voltado a pegar imagem especifica
    async GETNAME(req, resp) {
        let i = 0
        if (req.method === "GET") {
            const ans = req.params.name.split('.')
                const imagem = new modImg(null, ans[0], null)
                const resposta = await imagem.pegardadosId(ans[1])
                console.log(resposta)
                return resp.json({ resposta })
            } 


        else {
            return resp.json({ resp: 'metodo não permitido' })
        }

    }

    //metodo voltado a adicionar imagem
    async POST(req,resp) {
        console.log(req.body)
        const body= req.body
        const nome = body.nome0.split('-')[0]
        const codProd = body.idProd
        salvarIMG(body)
        const image = new modImg(nome,codProd)
        const resposta = await image.adicionarDados(body)
        return resp.json({msg:resposta})
    }

    async DELETE() {
        console.log('deletei')
    }
};