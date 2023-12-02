import router from 'express'
import CompraControle from '../Controle/ControleCompra.js'

//cria objeto de rotas e de controle
const CompraRota = new router()
const ctrCompra = new CompraControle()

//rotas de cliente, que chama os metodos de controle de acordo com link
CompraRota
.get('/',ctrCompra.GET)
.post('/',ctrCompra.POST)
.get('/:id',ctrCompra.GETVal)
.put('/:id',ctrCompra.PUT)
.delete('/:id',ctrCompra.DELETE)

export default CompraRota