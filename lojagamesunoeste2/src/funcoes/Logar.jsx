
//função resposnavel por realizar um login no servidor
export default async function Logar(url, tipo, email, senha) {
    console.log(`url:${url}, tipo:${tipo}, email:${email},senha:${senha}`)
    return fetch(`${url}/${tipo}`, {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
            senha: senha,
            email: email
        })
    }).then((resposta) => {
        return resposta.json()
    }).then((resp) => {
        if (resp.msg) {

            console.log(resp)
            return ({ status: -1, msg: resp.msg.message })
        } else {
            return ({ status: 1, msg: "", body: resp })
        }
    }).catch((e) => {
        return ({
            resposta: -1,
            msg: e
        })
    })
}