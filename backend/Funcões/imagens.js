import fs from 'fs'
import path from 'path'

export default function salvarIMG(objeto) {
    console.log('fui chamado')
    const caminho = 'D:/TrabalhoFaculdade/fotos/produtos';

    for (let i = 0; i < 5; i++) {
        let nomeArquivo;
        if (i==0){
            const tipo = objeto[`nome${1}`].split('.')[1]
            nomeArquivo = objeto[`nome${i}`].split('-')[0]+`.${tipo}`
        }else{
            nomeArquivo = objeto[`nome${i}`]
        }
        
        const caminhoCompleto = path.join(caminho, nomeArquivo)
        const img = objeto[`imagem${i}`]

        const B64 = img.replace(/^data:image\/\w+;base64,/,'')
        const buffer64 = Buffer.from(B64, 'base64')

        try {
            fs.writeFileSync(caminhoCompleto, buffer64,'binary')
            console.log("arquivo adicionado no servidor")
        } catch (err) {
            console.log('Algo deu errado')
            return -1
        }
    }
    return 1
}