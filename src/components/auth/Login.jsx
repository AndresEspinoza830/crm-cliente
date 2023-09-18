import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import CRMContext from "../../../context/CRMContext";

const Login = () => {
  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [auth, guardarAuth] = useContext(CRMContext);

  const leerDatos = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();

    //autenticar
    try {
      const { data } = await clienteAxios.post("/iniciar-sesion", credenciales);
      localStorage.setItem("token", data.token);
      guardarAuth({ token: data.token, auth: true });
      Swal.fire("Login Correcto", "Has iniciado Sesion", "success");
      navigate("/");
    } catch (error) {
      //si es un error de epxress, autenticacion
      if (error.response) {
        Swal.fire({
          type: "error",
          title: "Hubo un error",
          text: error.response.data.mensaje,
        });
        //error de cors
      } else {
        Swal.fire({
          type: "error",
          title: "Hubo un error",
          text: "Hubo un error",
        });
      }
    }
  };

  return (
    <div className="login">
      <h2>Iniciar Sesion</h2>
      <div className="contenedor-formulario">
        <form onSubmit={iniciarSesion}>
          <div className="campo">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email para Iniciar Sesion"
              required
              onChange={leerDatos}
            />
          </div>
          <div className="campo">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password para Iniciar Sesion"
              required
              onChange={leerDatos}
            />
          </div>
          <input
            type="submit"
            value="Iniciar Sesion"
            className="btn btn-verde btn-block"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
