
//função resposnavel por traduzir retorno de imagens do servidor para blob
export default function toBlob(file, nome) {
    const tipo = nome.split('.')[1]
    const byteC = atob(file)
    const byteN = new Array(byteC.length)
    for (let i = 0; i < byteC.length; i++) {
        byteN[i] = byteC.charCodeAt(i);
    }
    const byteA = new Uint8Array(byteN)
    const blob = new Blob([byteA], { type: `image/${tipo}` })

    return blob
}