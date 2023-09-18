import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";

const NuevoPedido = () => {
  const { idCliente } = useParams();

  const [cliente, gurdarCliente] = useState({});
  const [busqueda, guardarBusqueda] = useState("");
  const [productos, guardarProductos] = useState([]);
  const [total, guardarTotal] = useState(0);

  useEffect(() => {
    const consultarApi = async () => {
      const { data } = await clienteAxios.get(`/clientes/${idCliente}`);
      gurdarCliente(data);
    };
    consultarApi();
    actualizarTotal();
  }, [productos]);

  const { nombre, apellido, empresa, email, telefono } = cliente;

  const buscarProducto = async (e) => {
    e.preventDefault();

    //obtener producto dela busqueda
    const resultadoBusqueda = await clienteAxios.post(
      `/productos/busqueda/${busqueda}`
    );
    //Si no hay resultados
    if (resultadoBusqueda.data[0]) {
      let productoResultado = resultadoBusqueda.data[0];

      //Agregar la llave producto (agregando campos al objeto)
      productoResultado.producto = resultadoBusqueda.data[0]._id;
      productoResultado.cantidad = 0;

      guardarProductos([...productos, productoResultado]);
    } else {
      //si no hay resultados
      Swal.fire({
        type: "error",
        title: "No Resultados",
        text: "No hay resultados",
      });
    }
  };

  const leerDatosBusqueda = (e) => {
    guardarBusqueda(e.target.value);
  };

  //actualizar la cantidad de productos
  const restarProductos = (i) => {
    const todosProductos = [...productos];

    if (todosProductos[i].cantidad === 0) return;

    todosProductos[i].cantidad--;

    //almacenar en el state
    guardarProductos(todosProductos);
  };

  const aumentarProductos = (i) => {
    const todosProductos = [...productos];

    todosProductos[i].cantidad++;

    guardarProductos(todosProductos);
  };

  //elimina un producto del state
  const eliminarProductoPedido = (id) => {
    //No sacamos una copia con ..., porque fitlert devuelve un arreglo diferente
    const todosProductos = productos.filter(
      (producto) => producto.producto !== id
    );
    guardarProductos(todosProductos);
  };

  const actualizarTotal = () => {
    if (productos.length === 0) {
      guardarTotal(0);
      return;
    }

    //Calcular nuevo total
    let nuevoTotal = 0;
    productos.map(
      (producto) => (nuevoTotal += producto.cantidad * producto.precio)
    );

    guardarTotal(nuevoTotal);
  };

  const navigate = useNavigate();

  //Almacena el pedido enla base de datos
  const realizarPedido = async (e) => {
    e.preventDefault();

    //construir el objeto
    const pedido = {
      cliente: idCliente,
      pedido: productos,
      total: total,
    };

    const res = await clienteAxios.post(`/pedidos/nuevo/${idCliente}`, pedido);

    //leer resultado
    if (res.status === 200) {
      Swal.fire({
        type: "success",
        title: "Correcto",
        text: res.data.mensaje,
      });
    } else {
      Swal.fire({
        type: "error",
        title: "Hubo un problema",
        text: "Intentalo de nuevo",
      });
    }

    navigate("/pedidos");
  };

  return (
    <>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>
          Nombre: {nombre} {apellido}
        </p>
        <p>Telefono: {telefono}</p>
      </div>

      <FormBuscarProducto
        buscarProducto={buscarProducto}
        busqueda={busqueda}
        leerDatosBusqueda={leerDatosBusqueda}
      />

      <ul className="resumen">
        {productos &&
          //para saber a que producto le dio + o -, le pasamos el index
          productos.map((producto, index) => (
            <FormCantidadProducto
              key={producto._id}
              producto={producto}
              restarProductos={restarProductos}
              aumentarProductos={aumentarProductos}
              eliminarProductoPedido={eliminarProductoPedido}
              index={index}
            />
          ))}
      </ul>
      <p className="total">
        Total a Pagar: <span>$ {total}</span>
      </p>
      {total > 0 ? (
        <form onSubmit={realizarPedido}>
          <div className="enviar">
            <input
              type="submit"
              className="btn btn-verde btn-block"
              value="Realizar Pedido"
            />
          </div>
        </form>
      ) : null}
    </>
  );
};

export default NuevoPedido;
