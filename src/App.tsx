import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaginaBaseAdmin from './paginas/administracao/PaginaBaseAdmin';
import AdministracaoRestaurantes from './paginas/administracao/restaurantes';
import FormularioRestaurante from './paginas/administracao/restaurantes/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin/' element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
      </Route>
    </Routes>
  );
}

export default App;
