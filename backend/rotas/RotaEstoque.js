import router from 'express'
import EstoqueControle from '../Controle/ControleEstoq.js'

//cria objeto de rotas e de controle
const EstoqueRota = new router()
const ctr = new EstoqueControle()

//rotas de cliente, que chama os metodos de controle de acordo com link
EstoqueRota
.get('/',ctr.GET)
.post('/',ctr.POST)
.get('/:id',ctr.GETVal)
.put('/:id',ctr.PUT)
.delete('/:id',ctr.DELETE)

export default EstoqueRota