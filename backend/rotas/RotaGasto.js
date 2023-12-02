import router from 'express'
import GastoLojaControl from '../Controle/ControleGastos.js'

//cria objeto de rotas e de controle
const GastoRota = new router()
const ctr = new GastoLojaControl()

//rotas de cliente, que chama os metodos de controle de acordo com link
GastoRota
.get('/',ctr.GET)
.post('/',ctr.POST)
.get('/:id',ctr.GETVal)
.put('/:id',ctr.PUT)
.delete('/:id',ctr.DELETE)

export default GastoRota