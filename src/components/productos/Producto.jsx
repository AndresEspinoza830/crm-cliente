import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const Producto = ({ producto }) => {
  const { _id: idProducto, nombre, precio, imagen } = producto;

  const eliminarProducto = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un producto eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAxios.delete(`/productos/${id}`).then((res) => {
          if (res.status == 200) {
            Swal.fire("Eliminado!", res.data.mensaje, "success");
          }
        });
      }
    });
  };

  return (
    <li className="producto">
      <div className="info-producto">
        <p className="nombre">{nombre}</p>
        <p className="precio">${precio} </p>
        {imagen ? <img src={`http://localhost:5004/${imagen}`} /> : null}
      </div>
      <div className="acciones">
        <Link to={`/productos/editar/${idProducto}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto
        </Link>

        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarProducto(idProducto)}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
};

export default Producto;
