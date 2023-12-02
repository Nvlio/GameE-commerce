import router from 'express'
import imagectrl from '../controle/ImgCtrl.js'
import multer from 'multer'

const imgrota = new router()
const img = new imagectrl()

//se fode ai meu amigo

// Função de configuração do multer
const configureMulter = () => multer({
    storage: armazenamento,
    limits: { fieldSize: 10 * 1024 * 1024 } // Ajuste o limite conforme necessário
});

// Serve para adicionar fotos com as datas para diferenciar elas
const armazenamento = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'D:\\TrabalhoFaculdade\\fotos\\produtos');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

imgrota.post('/', configureMulter().array('foto', 5), (req, res, next) => {
    console.log('imagens',req.body.imagem0===req.body.imagem1);
    img.POST(req, res, next);
})
    .get('/:name', img.GETNAME)
    
    .delete('/id', img.DELETE)

export default imgrota