import router from 'express'
import LojaControle from '../Controle/ControleLoja.js'

//cria objeto de rotas e de controle
const LojaRota = new router()
const ctrLoja = new LojaControle()

//rotas de cliente, que chama os metodos de controle de acordo com link
LojaRota
.get('/',ctrLoja.GET)
.post('/',ctrLoja.POST)
.get('/:id',ctrLoja.GETVal)
.put('/:id',ctrLoja.PUT)
.delete('/:id',ctrLoja.DELETE)

export default LojaRota