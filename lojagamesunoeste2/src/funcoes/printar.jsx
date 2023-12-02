import React,{ useRef } from "react";
import {useReactToPrint} from "react-to-print";
import Button from 'react-bootstrap/Button';

import { Nota } from "../Pages/NotasFiscais.jsx";


// responsavel por printarr componente de nota fiscal
export const ImprimirComponente = ()=>{
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content:()=>componentRef.current,
    })

    return(
        <div style={{textAlign:"center"}}>
            <Button onClick={handlePrint}  variant="info">Imprimir</Button>
            <div style={{border:'1px solid black',borderRadius:'10px',padding:'10px',margin:'10px'}}>
            <Nota ref={componentRef}/>
            </div>
        </div>
    )
}