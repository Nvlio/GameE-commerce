import router from 'express'
import MSGControle from '../Controle/ControleMSG.js'

//cria objeto de rotas e de controle
const MSGRota = new router()
const ctrCompra = new MSGControle()

//rotas de cliente, que chama os metodos de controle de acordo com link
MSGRota
.get('/',ctrCompra.GET)
.post('/',ctrCompra.POST)
.get('/:id',ctrCompra.GETVal)
.put('/:id',ctrCompra.PUT)
.delete('/:id',ctrCompra.DELETE)

export default MSGRota