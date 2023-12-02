import { useContext } from "react"
import { Contexto } from "../Contextualizacao"
import { LinkContainer } from "react-router-bootstrap"

export default function InfoProfile(props) {
    const { user, setUser } = useContext(Contexto)


    //parte que vai conter dados do perfil
    return (
        <div style={{ border: '1px solid black',margin:'5% 30%', borderRadius: '10px', display:"flex",justifyContent:"center" }}>
            <div style={{textAlign:"justify",padding:'5%'}}>
            <h3>Nome: {user.Nome}</h3>
            <br/>
            <h3>Email: {user.Email}</h3>
            <br/>
            <h3>Telefone: {user.Telefone}</h3>
            <br/>
            <h3>Endereco: {user.Endereco}</h3>
            <br/>
            {user.Nivel!=undefined?<div><h3>{user.Nivel}</h3><br/><h3>{user.LojaId}</h3></div>:null}
            </div>

        </div>
    )
}