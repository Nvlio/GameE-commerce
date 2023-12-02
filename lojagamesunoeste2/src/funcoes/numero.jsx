
//função reponsavel por retornar numero de um servidor especifico
export default GetN(url){
    fetch(`${url}/number`,{method:"GET"}).then((resposta)=>{
        return resposta.json()
    }).then((resp)=>{
        console.log(resp)
        return resp
    })
}