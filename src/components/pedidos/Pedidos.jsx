import { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Pedido from "./Pedido";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      const { data } = await clienteAxios.get("/pedidos");
      setPedidos(data);
    };
    consultarApi();
  }, []);

  return (
    <>
      <ul className="listado-pedidos">
        {pedidos &&
          pedidos.map((pedido) => <Pedido key={pedido._id} pedido={pedido} />)}
      </ul>
    </>
  );
};

export default Pedidos;
