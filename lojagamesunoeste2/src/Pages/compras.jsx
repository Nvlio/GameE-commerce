import React,{ useState } from 'react'

import Default from './PageDefault.jsx'
import Elem from '../elementos/Reutilizavel.jsx'
import { BasicLista } from '../elementos/Lista.jsx'

export default function FinalizarTela(props){
    /*
    const [qntd,setQntd] = useState('')
    const [endereco,setEndereco] = useState()
     */

    function handleChange(item, valor) {
        if(item==="nome"){
            props.dados(prevDados=>({
                ...prevDados,
                "endereco":valor
            }))
        }else{
            props.dados(prevDados=>({
                ...prevDados,
                'qntd':valor
            }))
        }
        
    }

    

    return(
    <div style={{ border: '1px solid black', width: '70%' }}>
        <Default link={''} estilo={['0px', "center"]} title={'Vamos finalizar esse chefão com você'} subtitle={'formas de pagamento'} >
            <div style={{ margin: '5% 5%' }}>
                {props.status==="Error"?<div style={{backgroundColor:'red',color:'white',width:'100%'}}>Quantidade insuficiente</div>:null}
                <Elem  fun="Inp" type='number' name="qntd" font={'Quantidade que vc deseja'} place={"quantidade  "} /*Lista={this.state.Nome}*/ ext="Qntd" onChange={handleChange} />

            </div>
            <div style={{ border: '1px solid black', margin: '50px 100px 50px 100px' }}>
                <BasicLista guardar={props.pagamento}>
                    <img src={require('../elementos/fotos/boleto-logo.png')} alt={`payimg-boleto`} height={'100px'} />
                    <img src={require('../elementos/fotos/pix-logo.png')} alt={`payimg-pix`} height={'100px'} />
                    <img src={require('../elementos/fotos/Mastercard-logo.png')} alt={`payimg-mastercard`} height={'100px'} />
                </BasicLista>
            </div>
            <div style={{ border: '1px solid black', borderRadius: "10px", padding: "10px", margin: "20px 25% 20px 25% " }}>
                <Elem  fun="Inp" type='' name="nome" font={'Escreva se vc deseja receber em outro endereço'} place={"novo endereço"} /*Lista={this.state.Nome}*/ ext="Nome" onChange={handleChange}/>
            </div>

        </Default>
    </div>)
}