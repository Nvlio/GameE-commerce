import './App.css';
import { MainU, Profile, E404,NotaFiscal, Compras, ConectarUser, Chats, Produto, Relatorios, ConectarFunc, Estoque, TelaFInalizar, Editar, Deletar } from './Paginas.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CheckAuteticacao } from './funcoes/Autenticar.jsx';
import { useContext, useEffect, useState } from 'react';
import ProtectRoute from './ProtectRoutes.jsx';
import { Contexto } from './Contextualizacao.jsx';

function App() {
  const [isValid, setIsValid] = useState(false)
  const { user } = useContext(Contexto)

  

  //{isValid===true?<MainU/>:<ConectarUser/> }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainU />} />

          <Route path='/Compras' element={<Compras />} />

          <Route path='/MinhaCompra/:data' element={<ProtectRoute />} >
            <Route path="" element={<TelaFInalizar />} />
          </Route>

          <Route path='/notaFiscal' element={<NotaFiscal/>}/>

          <Route path='/UserLogCad' element={<ConectarUser />} />

          <Route path='/FuncLogCad' element={<ConectarFunc />} />

          <Route path='/Chat' element={<ProtectRoute />} >
            <Route path='' element={<Chats />} />
          </Route>

          <Route path='/Produto/:id' element={<Produto />} />

          <Route path='/Estoque' element={<ProtectRoute />} >
            <Route path='' element={<Estoque />} />
          </Route>

          <Route path='/Relatorios' element={<ProtectRoute />}>
            <Route path='' element={<Relatorios />} />
          </Route>

          <Route path="/Profile" element={<ProtectRoute />} >
            <Route path="" element={<Profile />} />
          </Route>

          <Route path='/Editar' element={<ProtectRoute />}>
            <Route path='' element={<Editar />} />
          </Route>

          <Route path='/Excluir' element={<ProtectRoute />} >
            <Route path='' element={<Deletar />} />
          </Route>

          <Route path="/*" element={<E404 />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
