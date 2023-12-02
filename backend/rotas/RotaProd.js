import router from 'express'
import ProdControle from '../Controle/ControleProd.js'

//cria objeto de rotas e de controle
const ProdRota = new router()
const ctrLoja = new ProdControle()

//rotas de cliente, que chama os metodos de controle de acordo com link
ProdRota
.get('/',ctrLoja.GET)
.post('/',ctrLoja.POST)
.get('/:id',ctrLoja.GETVal)
.put('/:id',ctrLoja.PUT)
.delete('/:id',ctrLoja.DELETE)

export default ProdRota