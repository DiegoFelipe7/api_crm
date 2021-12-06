import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layaout from "./layaout/Layaout";
import Inicios from "./paginas/Inicios";
import NuevoCliente from "./paginas/NuevoCliente";
import EditarCliente from "./paginas/EditarCliente";
import VerCliente from "./paginas/VerCliente";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layaout />}>
          <Route index element={<Inicios />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
          <Route path=":id" element={<VerCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
