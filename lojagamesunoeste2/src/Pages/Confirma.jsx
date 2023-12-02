import { useNavigate } from "react-router-dom";
import Default from "./PageDefault"
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";


export default function Confirma(props) {
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState(0)

    function HandleClick() {
        window.open("http://localhost:3000/notaFiscal", "_blank")
    }

    useEffect(() => {
        if (confirm === 1) {
            navigate('/')
        }
    }, [confirm])

    return (
        <div style={{ paddingTop: '8%' }}>
            <Default estilo={['0px', "center"]} title={props.title} subtitle={props.subtitle} divtitle={['']} link={['']}>
                <Button style={{ margin: '03%' }} onClick={HandleClick} variant="info">ver nota fiscal</Button>

                <Button style={{ margin: '03%' }} onClick={() => { setConfirm(1) }} variant="success">Voltar</Button>
            </Default>
        </div>
    )
}