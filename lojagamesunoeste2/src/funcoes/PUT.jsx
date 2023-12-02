export async function PUTmsg(url,funcCPF){
    return fetch(url,{method:'PUT',headers:{'content-type':"application/json"},body:JSON.stringify({
        'funcCPF':funcCPF
    })}).then((resp)=>{
        return resp.json()
    }).then((resposta)=>{
        return resposta
    })
}