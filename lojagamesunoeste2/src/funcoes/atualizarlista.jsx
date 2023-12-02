
//responsavel por atualizar lista (em progresso)
export default function Atualizaimglista(itens){
    alert('fui chamado?')
    itens.map((item,ind)=>{
        if(ind<5){
            console.log('item:',item)
            return ' x'
        }
    })


    /*async function GetImg(id,nome, ind) {
        const conta = new Produtos("http://www.localhost:3004/Imagens")
        console.log(nome)
        if (ind<=5 && listaImg.length<6) {
            const valores = await conta.GetImg(id)
            console.log(`nome:${nome},valor:${valores.resposta.nome}`)
            setListaImg((prevListaImg) => [...prevListaImg, valores])
        }
        
    }*/
}