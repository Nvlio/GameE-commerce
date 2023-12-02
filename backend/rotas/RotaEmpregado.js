import router from "express"
import EmpregadoControle from "../Controle/ControleEmp.js"

const EmpRota = new router()
const CtrEMp = new EmpregadoControle()

EmpRota
.get('/',CtrEMp.GET)
.post('/',CtrEMp.POST)
.post('/:tipo',CtrEMp.POST)
.get('/:cpf',CtrEMp.GETVal)
.put('/:cpf',CtrEMp.PUT)
.delete('/:cpf',CtrEMp.DELETE)

export default EmpRota