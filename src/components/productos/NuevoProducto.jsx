import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const NuevoProducto = () => {
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
  });

  const [archivo, guardarArchivo] = useState("");

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

  const validarFormulario = () => {};

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("imaen", archivo);

    try {
      const res = await clienteAxios.post("/productos", formData, {
        "Content-Type": "multipart/form-data",
      });
      if (res.status === 200) {
        Swal.fire("Editar Correctamente", res.data.mensaje, "success");
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
    <form onSubmit={handleSubmit}>
      <legend>Llena todos los campos</legend>

      <div className="campo">
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Nombre Producto"
          name="nombre"
          onChange={leerInformacionProducto}
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
        />
      </div>

      <div className="campo">
        <label>Imagen:</label>
        <input type="file" name="imagen" onChange={leerArchivo} />
      </div>

      <div className="enviar">
        <input
          type="submit"
          class="btn btn-azul"
          value="Agregar Producto"
          onClick={validarFormulario}
        />
      </div>
    </form>
  );
};

export default NuevoProducto;
