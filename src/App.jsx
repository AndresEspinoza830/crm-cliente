import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";
import Clientes from "./components/clientes/Clientes";
import NuevoCliente from "./components/clientes/NuevoCliente";
import Productos from "./components/productos/Productos";
import Pedidos from "./components/pedidos/Pedidos";
import EditarCliente from "./components/clientes/EditarCliente";
import NuevoProducto from "./components/productos/NuevoProducto";
import EditarProducto from "./components/productos/EditarProducto";
import NuevoPedido from "./components/pedidos/NuevoPedido";
import Login from "./components/auth/Login";
import CRMContext, { CRMProvider } from "../context/CRMContext";
import { useContext } from "react";

function App() {
  const [auth, guardarAuth] = useContext(CRMContext);

  return (
    <BrowserRouter>
      <CRMProvider>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />

          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/" element={<Clientes />} />
              <Route path="/clientes/nuevo" element={<NuevoCliente />} />
              <Route
                path="/clientes/editar/:idCliente"
                element={<EditarCliente />}
              />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/nuevo" element={<NuevoProducto />} />
              <Route
                path="/productos/editar/:idProducto"
                element={<EditarProducto />}
              />

              <Route path="/pedidos" element={<Pedidos />} />
              <Route
                path="/pedidos/nuevo/:idCliente"
                element={<NuevoPedido />}
              />
              <Route path="/iniciar-sesion" element={<Login />} />
            </Routes>
          </main>
        </div>
      </CRMProvider>
    </BrowserRouter>
  );
}

export default App;
