export async function PostCompra(url, cpf, prodId, qntd, valor, endereco, payment) {
    const dataCompra = new Date()
    const data = `${dataCompra.getDate()}/${dataCompra.getMonth()}/${dataCompra.getFullYear()}`
    console.log(payment)
    let preco
    console.log(payment, '=1', payment === 1)
    if (payment === 1) {
        preco = valor - valor * 0.10
    } else {
        preco = valor
    }

    return fetch(url, {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
            'data': data,
            'qntd': qntd,
            'valor': preco,
            'clientCPF': cpf,
            'prodID': prodId,
            'endereco': endereco
        })
    }).then((resp) => {
        return (resp.json())
    })
}

export async function PostEstoque(url, objeto) {
    console.log(url, objeto)
    return fetch(url, {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
            qntd: objeto.quantidade,
            lojaID: objeto.idloja,
            nome: objeto.nome,
            plataforma: objeto.plataforma,
            valor: objeto.valor,
            lancamento: objeto.lancamento,
            distribuidora: objeto.distribuidora
        })
    }).then((resp) => {
        return resp.json()
    }).then((resposta) => {
        console.log(resposta)
        return resposta
    })
}

export async function PostUsuario(url, objeto) {
    console.log('sou o url', url)
    console.log(objeto)

    return fetch(url, {
        method: "POST", headers: { 'content-type': 'application/json' }, body: JSON.stringify({
            cpf: objeto.cpf,
            nome: objeto.nome,
            telefone: objeto.telefone,
            senha: objeto.senha,
            email: objeto.email,
            nivel: objeto.nivel,
            endereco: objeto.endereco,
            lojaID: objeto.idloja,
        })
    }).then((resp) => {
        return resp.json()
    }).then((resposta) => {
        console.log('finalizei')
        console.log(resposta)
        return resposta
    }).catch((e) => {
        return { msg: e }
    })
}

export async function PostMSG(url, objeto) {
    console.log(url, objeto)
    return fetch(url, {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
            conversa: objeto.conversa,
            clieCPF: objeto.clieCPF,
            funcCPF: objeto.funcCPF,
            IDmsg: objeto.idmsg,
            dono: objeto.dono
        })
    }).then((resp) => {
        return resp.json()
    }).then((resposta) => {
        return resposta
    })
}

export async function PostImg(url, objeto, codigo) {
    const formData = new FormData()
    let x = 1
    objeto.nomeImg.forEach((nome, index) => {
        formData.append(`nome${index}`, `${objeto.nome}-${index}.${nome.split('.')[nome.split('.').length-1]}`)
        
        console.log("eu dei: ",nome)
        console.log('eu sou legal juro',nome.split('.')[nome.split('.').length-1])
    })
    objeto.images.forEach((img, index) => {
        
        formData.append(`imagem${index}`, img)
    })
    formData.append('idProd', codigo)
    console.log(url, objeto.nomeImg, objeto.images)
    console.log(formData)
    fetch(url, { method: 'POST', body: formData }).then((resp) => {
        return resp.json()
    }).then((resposta) => {
        console.log(resposta)
        return resposta
    })
}