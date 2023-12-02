import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Get } from "../funcoes/Get.jsx";
const lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export function TabelaRel(props) {
    const url = "http://www.localhost:3004/"
    const [data, setData] = useState()


    useEffect(() => {
        console.log(props.organizar,"==quantidade and",props.actionC,"==Compras",props.organizar==="quantidade" && props.actionC==="Compras")
        console.log(props.organizar,"==receitaand",props.actionC,"==Compras",props.organizar==="receita" && props.actionC==="Compras")

        const get = async function () {
        
            let resp
            if (props.organizar==="valor"||props.organizar==="quantidade"||props.organizar==="receita"){
                resp = await Get(`${url}${props.actionC}/${props.organizar}`)
            }else{
                resp = await Get(`${url}${props.actionC}`)
            }
            setData(resp)
        }
        get()
    }, [props.actionC, props.organizar])


    return (
        //head 
        <div style={{ border: '1px solid black', height: '100%', width: "80%", margin: '2% 10%' }}>

            {data === undefined ? null :
                <div>

                    <div style={{ border: '1px solid black', display: "flex", flexDirection: Row }}>
                        {Object.keys(data[0]).map((info) => {
                            return (

                                <p style={{ border: '1px solid black', padding: '0px', margin: '0px', width: '40%' }}>{info}</p>
                            )
                        })}
                    </div>

                    <div>
                        {data.map((item) => {
                            Object.values(item)
                            return (
                                <div style={{ border: '1px solid black', display: "flex", flexDirection: Row }}>
                                    {Object.values(item).map((value) => {
                                        return (
                                            <p style={{ border: '1px solid black', padding: '0px', margin: '0px', width: '40%' }}>{value}</p>
                                        )
                                    })}
                                </div>
                            )
                        }

                        )}
                    </div>
                </div>
            }

        </div>
    )

}



export function TabelaEstoque(props) {
    const [data, setData] = useState()


    useEffect(() => {
        const get = async function () {
            console.log(`${props.url}/null-${props.action}-''`)
            const resp = await Get(`${props.url}/null-${props.action}-''`)
            setData(resp)
        }
        get()
    }, [props.action])


    return (
        //head 
        <div style={{ border: '1px solid black', height: '100%', width: "80%", margin: '2% 10%' }}>

            {data === undefined ? null :
                <div>

                    <div style={{ border: '1px solid black', display: "flex", flexDirection: Row }}>
                        {Object.keys(data[0]).map((info) => {
                            return (

                                <p style={{ border: '1px solid black', padding: '0px', margin: '0px', width: '40%' }}>{info}</p>
                            )
                        })}
                    </div>

                    <div>
                        {data.map((item) => {
                            Object.values(item)
                            return (
                                <div style={{ border: '1px solid black', display: "flex", flexDirection: Row }}>
                                    {Object.values(item).map((value) => {
                                        return (
                                            <p style={{ border: '1px solid black', padding: '0px', margin: '0px', width: '40%' }}>{value}</p>
                                        )
                                    })}
                                </div>
                            )
                        }

                        )}
                    </div>
                </div>
            }

        </div>
    )

}