
//função que atualiza no servidor
export default async function Atualizar(url,cpf,nome,tel,senha,email,endereco,nivel){
    return fetch(`${url}/${cpf}`,{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({
        cpf:cpf,
        nome:nome,
        telefone:tel,
        senha:senha,
        email:email,
        endereco:endereco,
        nivel:nivel
    })}).then((resposta)=>{
        return resposta.json()
    }).then((resp)=>{
        return ({status:0,resposta:resp})
    }).catch((error)=>{
        return({
            resposta:-1,
            msg:error
        })
    })
}