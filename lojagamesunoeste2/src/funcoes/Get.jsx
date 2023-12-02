//função de get e variações

export async function Get(url) {
    console.log(url)
    return fetch(url, { method: "GET" }).then((resposta) => {
        return resposta.json()
    }).then((resp) => {
        console.log(resp)
        return resp.itens
    }).catch((e) => { return console.error(); })

}


export async function GetImage(url, pcod,x) {
    try {
            return fetch(`${url}/${pcod}`, { method: "GET" }).then((resposta) => {
                return resposta.json()
            }).then((resp) => {
                return resp
            })

    } catch (error) {
        return ({ msg: error })
    }
}

export async function GetSort(url,tipo){
    try{
        return fetch(`${url}/${tipo}`).then((resposta)=>{
            return resposta.json()
        }).then((resp)=>{
            return resp
        })
    } catch(erro){
        return ({msg:erro})
    }
}

export async function GetUrl(url,pcod,nome,tipo){
    try{
        return fetch(`${url}/${pcod}-${nome}.${tipo}`).then((resposta)=>{
            return resposta.json()
        }).then((resp)=>{
            return resp
        })
    } catch(erro){
        return ({msg:erro})
    }
}

export async function getSome(url,id){
    return fetch(`${url}/${id}`,{method:'GET'}).then((resposta)=>{
        return resposta.json()
    }).then((resp)=>{
        return resp
    })
}
