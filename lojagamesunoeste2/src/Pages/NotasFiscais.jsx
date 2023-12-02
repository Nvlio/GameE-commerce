import React from "react"

//nota fiscal da compra é só uma imagem por que é um exemplo
export const Nota = React.forwardRef((props,ref)=>{
    return (
        <div ref={ref}>
            <div style={{ textAlign: 'center' }} >
                <img src="https://infosimples.com/assets/images/imagens/ocr-nfse-sp-sao-paulo.jpg" width={'80%'} />
            </div>
        </div>
    )
})