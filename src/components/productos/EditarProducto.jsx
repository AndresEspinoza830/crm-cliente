import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import Spinner from "../layout/Spinner";

const EditarProducto = () => {
  const { idProducto } = useParams();

  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
  });

  const [archivo, guardarArchivo] = useState("");

  const consultarApi = async () => {
    const productoConsulta = await clienteAxios.get(`/productos/${idProducto}`);
    guardarProducto(productoConsulta.data);
  };

  useEffect(() => {
    consultarApi();
  }, []);

  //leer datos del formulario
  const leerInformacionProducto = (e) => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  const { nombre, precio, imagen } = producto;

  // if (!nombre) return <Spinner />;

  const navigate = useNavigate();

  const editarProducto = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("imagen", archivo);

    try {
      const res = await clienteAxios.put(`/productos/${idProducto}`, formData, {
        "Content-Type": "multipart/form-data",
      });
      console.log(res);
      if (res.status === 200) {
        Swal.fire("Editado Correctamente", "Producto actualizado", "success");
      }
    } catch (error) {
      console.log(error);
      //lanzar alerta
      Swal.fire({
        type: "error",
        title: "Hubo un error",
        text: "Vuelva a intentarlo",
      });
    } finally {
      navigate("/productos");
    }
  };

  return (
    <>
      <h2>Editar Cliente</h2>
      <form onSubmit={editarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInformacionProducto}
            defaultValue={producto.nombre}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            min="1"
            step="1"
            placeholder="Precio"
            onChange={leerInformacionProducto}
            defaultValue={producto.precio}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {imagen ? <img src={`http://localhost:5004/${imagen}`} /> : null}
          <input type="file" name="imagen" onChange={leerArchivo} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Editar Producto"
          />
        </div>
      </form>
    </>
  );
};

export default EditarProducto;
