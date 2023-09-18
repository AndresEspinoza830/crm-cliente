import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";

const EditarCliente = () => {
  const { idCliente } = useParams();

  const [cliente, datosCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  const consultarApi = async () => {
    const { data } = await clienteAxios.get(`/clientes/${idCliente}`);
    datosCliente(data);
  };

  //query a la api
  useEffect(() => {
    consultarApi();
  }, []);

  const navigate = useNavigate();

  const actualizarState = (e) => {
    datosCliente({ ...cliente, [e.target.name]: e.target.value });
    console.log(cliente);
  };

  const validarCliente = () => {
    const { nombre, apellido, email, empresa, telefono } = cliente;

    let valido =
      !nombre.length ||
      !apellido.length ||
      !email.length ||
      !empresa.length ||
      !telefono.length;

    return valido;
  };

  const actualizarCliente = (e) => {
    e.preventDefault();

    clienteAxios.put(`/clientes/${idCliente}`, cliente).then((res) => {
      if (res.data.code === 11000) {
        Swal.fire({
          type: "error",
          title: "Hubo un error",
          text: "Ese cliente ya esta registrado",
        });
      } else {
        console.log(res.data);
        Swal.fire("Correcto", res.data.mensaje, "success");
      }

      //Redireccionar
      navigate("/");
    });
  };

  return (
    <>
      <h2>Editar Cliente</h2>

      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
            value={cliente.nombre}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualizarState}
            value={cliente.apellido}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
            value={cliente.empresa}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
            value={cliente.email}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualizarState}
            value={cliente.telefono}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Cambios"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  );
};

export default EditarCliente;
