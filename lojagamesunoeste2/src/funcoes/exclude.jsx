//função responsavel por excluir itens no banco de dados
export default async function Excluir(url,cpf){
    return fetch(`${url}/${cpf}`,{method:"DELETE"}).then((resposta)=>{
        return resposta.json()
    }).then((resp)=>{
        console.log('eu chamei',resp)
        return resp
    }).catch((error)=>{
        console.log('eu chamei',error)
    })
}