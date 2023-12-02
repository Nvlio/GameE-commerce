//services
import { PostCompra, PostMSG } from "../src/funcoes/Post.jsx"
import Excluir from "./funcoes/exclude.jsx";
//elementos
import { FormEstoque } from "./elementos/EstoqueForm.jsx";

//pages


//externo
import ReactToPrint from "react-to-print";

import Default from "./Pages/PageDefault.jsx";
import FinalizarTela from "./Pages/compras.jsx";
import { Navibar } from "./elementos/Nav.jsx";
import { useState, useContext, useEffect, useRef } from "react"
import { LogUser, CadUser } from "./Pages/LoginCadUser.jsx";
import { CadFunc, LogFunc } from "./Pages/LoginCadFunc.jsx";
import { MenuCompra, MenuLado, MenuTop, } from "./elementos/Menu.jsx";
import Worker from "./Pages/PageWorker.jsx";
import { Contexto } from "./Contextualizacao.jsx";
import AvisarLog from "./Pages/AvisoConta.jsx";
import Prod from "./Pages/Produtos.jsx";
import Button from 'react-bootstrap/Button';
import { TabelaRel, TabelaEstoque } from "./elementos/tabela.jsx";
import TelaView from "./elementos/ViewTela.jsx";
import { ListaChat } from "./elementos/Chats.jsx";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import InfoProfile from "./Pages/Profile.jsx";
import Produtos from "./funcoes/Produtos.jsx";
import toBlob from "./funcoes/blob.jsx";
import Confirma from "./Pages/Confirma.jsx";
import { ListaProd } from "./elementos/Lista.jsx";
import { GetUrl } from "./funcoes/Get.jsx";
import Elem from "./elementos/Reutilizavel.jsx";
import { PUTmsg } from "./funcoes/PUT.jsx";
import { upload } from "@testing-library/user-event/dist/upload.js";
import {ImprimirComponente} from "./funcoes/printar.jsx";

//pagina inicial para clientes e não logados
export const MainU = () => {
    const { user } = useContext(Contexto)
    //caso nivel do usuario não seja indefinido envia para a pagina de funcionario direto
    if (user.Nivel !== undefined) {
        return (
            <MainF />
        )
    } else {
        return (
            <div>
                <Navibar />
                <Default estilo={['0px', "center"]} title={'Pronto para descobrir seu proximo jogo favorito?'} subtitle={'Aqui na GameX prezamos pela sua experiencia gamer'} normal={'E ai pronto para o proximo nivel?'} divtitle={['jogos', 'chat', 'conta']} link={['/Compras', '/Chat', '/Profile']} >
                    <img src={require("./elementos/fotos/MainFoto.png")} height="100%" width="100%" alt="foto principal" />
                    <p>Sua conta</p>
                </Default>
            </div>
        )
    }
};

//pagina principal apenas para funcionarios
export const MainF = () => {
    const { user, setUser } = useContext(Contexto)

    //caso não tenha nenhum dado ou não tenha nivel significa que não esta logado ou não é funcionario
    if (user.Nome === "" || user.Nivel === "") {
        return (
            <div>
                <Navibar />
                <AvisarLog />
            </div>
        )
    } else {
        return (

            <div>
                <Navibar />
                <section style={{ display: "flex", flexDirection: 'row', paddingTop: '100px', width: '100%' }} >
                    <div style={{ width: '20%' }}>
                        <MenuLado options={['chats', 'Atualizar estoque']} links={['Chat', 'Estoque', 'Relatorios', 'Excluir', 'FuncLogCad']} nivel={user.Nivel} especial={['Relatorios', 'Excluir conta', 'Adicionar conta']} />
                    </div>
                    <div style={{ width: '80%' }}>
                        <Worker title={'Bem vindo'} subtitle={'Vamos iniciar nosso trabalho'} >
                            <img src={require("./elementos/fotos/Background trabalhador.png")} height="500px" width="85%" alt="foto principal" />
                        </Worker>
                    </div>
                </section>
            </div>
        )
    }
};
//pagina do perfil do usuario contendo informações e funcionalidades basicas
export const Profile = () => {
    const { user, setUser } = useContext(Contexto)

    if (user.Nome === "") {
        return (
            <Navigate to={"/UserLogCad"} replace="false" />
        )
    } else {
        return (
            <div>
                <Navibar />
                <div style={{ paddingTop: '10%' }}>
                    <Default estilo={['0px', "center"]} title={user.Nome} subtitle={'Informações de sua conta'} divtitle={['']} link={['']}>
                        <InfoProfile />

                        <LinkContainer to={"/Editar"}><p>Editar sua conta</p></LinkContainer>
                        <LinkContainer to={"/Excluir"}><p>Excluir sua conta</p></LinkContainer>
                    </Default>
                </div>
            </div>
        );
    }
}

//pagina foada para realizar a edição das informações da conta
export const Editar = () => {
    const { user } = useContext(Contexto)
    return (
        <div>
            <Navibar />
            <div style={{ paddingTop: '10%' }}>
                <Default estilo={['0px', "center"]} title={'Editar conta'} subtitle={''} normal={''} divtitle={['Sim']} link={['/']} func={'excluir'}>
                    {user.Nivel !== undefined ? <CadFunc /> : <CadUser cpf={user.cpf} tipo={'Editar'} />}
                </Default>
            </div>
        </div>
    );
}

//pagina para a exclusão de contas
export const Deletar = () => {
    const { user } = useContext(Contexto)
    const [cpf, setCpf] = useState('')
    const [status, setStatus] = useState('normal')

    function handleChange(item, valor) {
        setStatus('processando')
        setCpf(valor)
    }

    async function Demitir() {
        const resp = await Excluir('http://www.localhost:3004/Empregados', cpf)
        setStatus(resp.msg.resp)
    }

    if (user.Nivel !== undefined) {
        return (
            <div>
                <Navibar />
                <div style={{ paddingTop: '10%' }}>
                    <Default estilo={['0px', "center"]} title={'Demitir Funcionario'} subtitle={'Ao excluir a conta do usuario você terá que criar outra!'} normal={'Tenha certeza antes de continuar?'} divtitle={[]} link={['']} func={''}>
                        <img src={require("./elementos/fotos/CrashDaDemissão.png")} height="40%" width="40%" alt="foto principal" />
                    </Default>
                    <div style={{ padding: '5% 10%', }}>
                        <Elem fun="Inp" type='' name="cpf" font={'CPF do funcionario'} place={"siga esse exemplo:11111111111"} ext="CPF" onChange={handleChange} />
                        {status !== "normal" ? <div>
                            <p>Você realmente tem certerza que quer realizar a exclusão da conta?</p>
                            <Button style={{ margin: '10% 45%', }} onClick={() => { Demitir() }} variant="danger">Sim</Button>
                        </div>
                            : null}
                        {/*<Button style={{ margin: '10% 45%', }} onClick={() => { Demitir() }} variant="danger">Excluir</Button>*/}
                        {status === 'work' ? <div style={{ backgroundColor: 'red', color: 'white', textAlign: "center", borderRadius: '10%' }}><p>Conta de funcionario excluida  </p></div> : status !== "normal" ? <div style={{ backgroundColor: 'red', color: 'white', textAlign: "center", borderRadius: '10%' }}><p>Funcionario não encontrado</p></div> : null}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Navibar />
                <div style={{ paddingTop: '10%' }}>
                    <Default estilo={['0px', "center"]} title={'Excluir sua conta'} subtitle={'Ao excluir sua conta você não terá mais acesso a promoções e outros beneficios'} normal={'deseja continuar?'} divtitle={['Sim']} link={['/']} func={'excluir'}>
                        <img src={require("./elementos/fotos/MarioTriste.png")} height="40%" width="40%" alt="foto principal" />
                    </Default>
                </div>
            </div>
        );
    }
}


//pagina que vai conter a lista de produtos disponiveis para comprar
export const Compras = () => {
    const [status,setStatus] = useState()

    return (
        <div>
            <Navibar />
            <section style={{ display: "flex", flexDirection: 'row', paddingTop: '100px', width: '100%' }} >
                <div style={{ width: '20%' }}>
                    <MenuCompra tipo ={setStatus} height={'100%'} options={['Menor preço', 'Maior preço']} />
                </div>
                <div style={{ width: '80%' }}>
                    <Worker title={'Produtos'} />
                    <ListaProd tipo={status} mar={['100px', '20px', '540px']} link={'/Produto'} />
                </div>
            </section>
        </div>
    )
};

//tela responsavel por realizar a compra
export const TelaFInalizar = () => {
    const { user } = useContext(Contexto)
    const data = useParams().data
    const preco = data.split('-')[1]
    const [payment, setPayment] = useState('')
    const [dados, setDados] = useState({
        'qntd': "",
        'endereco': "",
        'cpf': user.cpf,
        'data': data.split('-')[0],
        'preco': preco
    })
    const [status, setStatus] = useState(false)

    const navigate = useNavigate()

    async function Enviar() {
        const resp = await PostCompra('http://www.localhost:3004/Compras', dados.cpf, dados.data, dados.qntd, dados.preco, dados.endereco, payment)
        console.log(resp.msg)
        if (resp.msg.resp === "work") {
            console.log('fui    ')
            setStatus(true)
        } else {
            setStatus('Error')
        }
    }

    useEffect(() => {
        console.log(status)
    }, [status])


    if (user.Nome && status !== true) {
        return (
            <div>
                <Navibar />
                <div style={{ padding: '150px 00px 0px 100px', display: "flex", flexDirection: 'row' }}>
                    <FinalizarTela status={status} pagamento={setPayment} dados={setDados} />
                    <div style={{ textAlign: "center", margin: '50px 100px 50px 100px' }}>
                        <Default pagamento={payment} dadosCompra={dados} link={""} title={['R$:', preco]} info={"UMA PROMOÇÃO SELVAGEM APARECEU!!"} estilo={['100px', "justify"]}> {/*aqui vai ser o nome que passa ao clicar no item */}

                            <Button style={{ margin: '30%' }} onClick={Enviar} variant="success">Comprar</Button>
                        </Default>
                    </div>
                </div>
            </div >
        )

    } else if (status === true) {
        return (
            <div>
                <Navibar />
                <Confirma title={'compra finalizada'} subtitle={'clique no botão para voltar'} />
            </div>
        )
    }


};

export const NotaFiscal = () => {
    return(
        <ImprimirComponente/>
    )
}

//tela responsavel pelo cadastro e login de usarios 
export const ConectarUser = () => {
    const [status, setStatus] = useState({ tipo: 'login' })
    const { user, setUser } = useContext(Contexto)
    //se tiver nome envia para a primeira opção, se tiver nivel manda para pagina de funcionario, se não envia para pagina principal

    //se for login chama esse caminho
    if (status.tipo === "login") {
        return (
            <div>
                <Navibar />
                <div style={{ paddingTop: '120px' }}>
                    <Default link={''} estilo={['0px', "center",]} title={'Logar'} subtitle={'Entre na sua conta'} >
                        <LogUser status={setStatus} />
                    </Default>
                </div>
            </div>
        )
    }
    else {
        //se não for é cadastro
        return (
            <div>
                <Navibar />
                <div style={{ paddingTop: '120px' }}>
                    <Default link={''} title={'Cadastrar'} subtitle={'Crie sua conta'}  >
                        <CadUser status={setStatus} />
                    </Default>
                </div>
            </div>
        )
    }

};

//pagina para cadastro e login de funcionarios (cadastro só é permitido para gerente)
export const ConectarFunc = () => {
    const { user } = useContext(Contexto)
    if (user.Nome !== "" && user.Nivel === 1) {
        return (
            <div>
                <Navibar />
                <div style={{ paddingTop: '120px' }}>
                    <Default link={''} title={'Entre na sua conta'} subtitle={'necessário ser empregado e ter a conta'} normal={'se não conseguir e for um erro, falar com seu empregador'} >
                        <CadFunc />
                    </Default>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Navibar />
                <div style={{ paddingTop: '120px' }}>
                    <Default link={''} title={'Entre na sua conta'} subtitle={'necessário ser empregado e ter a conta'} normal={'se não conseguir e for um erro, falar com seu empregador'} >
                        <LogFunc />
                    </Default>
                </div>
            </div>
        )
    }
    /*return (
        <div>
            <Navibar />

            <Default title={'Logar ou cad'} subtitle={'Cadastrar ou logar'} normal={'Cadastrar'} >
            <CadFunc status={setStatus} />
            </Default>
        </div>
    )
}*/
};

//pagina contendo tanto a lista de chats disponiveis quanto o proprio chat
export const Chats = () => {

    //vai mudar para uma pagina expandida do item ao mudar o status, ocorre ao clicar no chat escolhido
    const [status, setStatus] = useState('normal')
    const { user } = useContext(Contexto)
    const [codigo, setCodigo] = useState('')
    const [msg, setMsg] = useState('')
    const [mudar, setMudar] = useState('')



    function handleChange(item, values) {
        setMsg(values)
    }

    async function keyDown(key) {
        if (key === 'Enter') {
            let cpf;
            let funccpf;
            let dono;
            let idmens;
            if (user.Nivel !== undefined) {
                funccpf = user.cpf
                dono = 2
            } else {
                cpf = user.cpf
                dono = 1
            }
            if (codigo !== '' && status !== "Adicionar") {
                console.log(status)
                idmens = codigo
            } else {
                idmens = "New"
            }

            const resposta = await PostMSG('http://www.localhost:3004/Chats', { "conversa": msg, "clieCPF": cpf, "funcCPF": funccpf, 'dono': dono, 'idmsg': idmens })
            console.log(resposta)
            setStatus('expanded')
            setMudar(resposta.msg.data)
            setCodigo(resposta.msg.idmsg)
        }
    }

    async function Update() {
        const resposta = await PUTmsg(`http://www.localhost:3004/Chats/${codigo}`, user.cpf)
        console.log(resposta)
    }


    useEffect(() => {
        console.log(user.Nivel, '=== undefined', user.Nivel === undefined)
        console.log(codigo, '=== undefined', codigo === undefined)
        if (user.Nivel !== undefined && codigo !== '') {
            console.log('sou true')
            Update()
        }
    }, [codigo])

    if (status === "normal") {
        return (
            <div>
                <Navibar />
                <div style={{ paddingTop: "8%" }}>
                    <Default link={''} title={'Conversas'} subtitle={''} normal={''} estilo={['100px', "justify"]} >
                        {user.Nivel === undefined ? <p className="clicavel" onClick={() => { setStatus('Adicionar') }}>Add</p>
                            :
                            null}
                        <ListaChat mar={['0px', '0px', '600px']} link={''} setstatus={setStatus} status={status} codigo={setCodigo} />
                    </Default>
                </div>
            </div>)

    } else {
        return (
            <div>
                <Navibar />

                <section style={{ paddingTop: '5px', width: '100%' }} >
                    <div style={{ width: '100%', paddingTop: '90px' }}>
                        <Default link={''} title={''} subtitle={''} normal={'mensagem'} estilo={['100px', "justify"]} >
                            <p className="clicavel" onClick={() => { setStatus('normal') }}>Voltar</p>
                            <TelaView status={status} data={mudar} id={codigo} />
                            <div style={{ border: '1px solid black', padding: '5px' }}>
                                <Elem fun="Inp" tipo="enviar" type='' name="msg" place={"Escreva uma mensagem"} ext="CPF" onChange={handleChange} onKeyDown={keyDown} />
                            </div>
                        </Default>

                    </div>

                </section>
            </div>)
    }

};

//pagina de um produto qualquer
export function Produto() {
    const url = "http://www.localhost:3004"
    const id = useParams()
    const [dataP, setDataP] = useState()
    //ATUALIZAÇÃO ABAIXO
    const [imageP, setImageP] = useState()

    async function getData() {
        const conta = new Produtos(`${url}/Produtos/`, id.id)
        const resp = await conta.GetOne()
        setDataP(resp)
        //GetUrl o ultimo parametro é ou m ou u (m-mutiplo) (u-unico)
        const foto = await GetUrl(`${url}/Imagens/`, id.id, resp.nome, 'm')
        const lista = [
        ]

        foto.resposta.map((item, index) => {
            const url = URL.createObjectURL(toBlob(item.img, item.nome))
            lista.push(url)
        })
        setImageP(lista)
    }

    useEffect(() => {
        getData()
    }, [id])


    return (
        <div>
            <Navibar />
            <section style={{ display: "flex", flexDirection: 'row', paddingTop: '10px', width: '100%' }} >
                <div style={{ width: '20%', paddingTop: '120px', border: '1px solid black' }}>
                    <h4>Outros produtos</h4>
                    <MenuCompra height={''} options={[null]} />
                    <ListaProd mar={['0px', '0px', '490px']} link={'/Produto'} />
                </div>
                <div style={{ width: '60%' }}>
                    {imageP === undefined ? null : <Prod nome={dataP.nome} listafirst={imageP[0]} listrest={[imageP[1], imageP[2], imageP[3], imageP[4]]} />}
                </div>
                <div style={{ width: '20%', border: "1px solid black", padding: '150px 10px 10px 10px' }}>

                    {dataP === undefined ? null :
                        <Default link={`/MinhaCompra/${id.id}-${dataP.preco}`} title={dataP.nome} subtitle={dataP.plataforma} normal={`R$:${dataP.preco}`} info={'promoção 10% pelo PIX'} estilo={['100px', "justify"]}> {/*aqui vai ser o nome que passa ao clicar no item */}
                            <Button style={{ margin: '30%' }} variant="success">Comprar</Button>
                        </Default>

                    }
                </div>
            </section>
        </div>
    )

};

//pagina referente ao estoque 
export const Estoque = () => {
    const { user } = useContext(Contexto)
    const [status, setStatus] = useState('verificarall')
    const [data, setData] = useState("")
    //                    <MenuCompra height={''} options={[null]} />

    //verificaall é a pagina referente ao padrão da amstragem de estoque
    if (user.Nivel !== undefined) {
        if (status === "verificarall") {
            return (
                <div>
                    <Navibar />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: "20%", paddingTop: "150px" }}>
                            <MenuCompra height={''} options={[null]} Status={status} setStatus={setStatus} data={setData} />
                        </div>
                        <div style={{ paddingTop: '150px', width: "80%" }}>
                            <Default link={''} title={'Estoques'} subtitle={"escreva o codigo da loja"} >

                            </Default>
                        </div>
                    </div>
                </div>
            )
            //verificaunique mostra todo o estoque de um item na loja especifica
        } else if (status === "verificarunique") {
            return (
                <div>
                    <Navibar />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ width: "20%", paddingTop: "150px" }}>
                            <MenuCompra height={''} options={[null]} Status={status} setStatus={setStatus} data={setData} />
                        </div>
                        <div style={{ paddingTop: '150px', width: "80%" }}>
                            <Default link={''} title={'EstoquesEspecifico'} >
                                <TabelaEstoque url={'http://www.localhost:3004/Estoque'} action={data} />
                                <Button style={{ margin: '30%' }} onClick={() => { setStatus('ADD') }} variant="success">Adicionar</Button>
                            </Default>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <Navibar />
                    <div style={{ paddingTop: '150px' }}>
                        <Default link={''} title={'Adicionar no Estoques'} >
                            {/*atualizar aqui para ter apenas um tipo */}
                            <div style={{ border: "1px solid black", borderRadius: '10px', margin: '20px' }}>
                                <FormEstoque />
                            </div>
                            <h3 className="clicavel" onClick={() => { setStatus('verificarall') }} >voltar</h3>
                        </Default>
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div>
                <AvisarLog />
            </div>
        )
    }
};

//pagina de relatorio de compra (só o gerete deve tter acesso)
export const Relatorios = () => {
    const { user } = useContext(Contexto)
    const [action, setAction] = useState()
    const [organizar, setOrganizar] = useState("")


    if (user.Nivel !== undefined) {
        return (
            <div>
                <Navibar />
                <div style={{ paddingTop: '150px' }}>
                    <Default title={'Relatorios'} divtitle={['principal']} link={['/']}>
                        <MenuTop action={setAction} action2={setOrganizar} tipos={['Compras', 'Gastos']} />
                        {action == "Compras" ?
                            <MenuTop action={setOrganizar} tipos={['quantidade', 'receita']} /> :
                            action == "Gastos" ?
                                <MenuTop action={setOrganizar} tipos={['valor']} /> :
                                null}
                        <TabelaRel actionC={action} organizar={organizar} />
                    </Default>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <AvisarLog />
            </div>
        )
    }
};

//pagina de não encontrado
export const E404 = () => {
    return (
        <div>
            <Navibar />
            <Default tipoclass="container" title={'Infelizmente essa pagina esta em outro castelo'} subtitle={'Desculpa mas não foi encontrado a pagina'} normal={'volte para a pgaina principal'} divtitle={['principal']} link={['/']}>
                <img src={require("./elementos/fotos/OIG.jpg")} height="350px" width="350px" />
            </Default>
        </div>
    )
};

