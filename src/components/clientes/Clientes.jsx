import { useContext, useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Cliente from "./Cliente";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import CRMContext from "../../../context/CRMContext";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  const [auth, guardarAuth] = useContext(CRMContext);

  const navigate = useNavigate();

  //cuando se elimine un cliente renderizara los nuevos clientes
  useEffect(() => {
    if (auth.token !== "") {
      console.log(auth.token);
      //Query a la Api
      const consultarApi = async () => {
        try {
          const { data } = await clienteAxios.get("/clientes", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setClientes(data);
        } catch (error) {
          if (error.response.status == 500) {
            console.log(error);
            navigate("/iniciar-sesion");
          }
        }
      };

      consultarApi();
    } else {
      navigate("/iniciar-sesion");
    }
  }, [clientes]);

  if (!auth.auth) {
    navigate("/iniciar-sesion");
  }

  if (!clientes.length) return <Spinner />;

  return (
    <>
      <h2>Clientes</h2>
      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        {" "}
        <i class="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      <ul className="listado-clientes">
        {clientes &&
          clientes.map((cliente) => (
            <Cliente key={cliente._id} cliente={cliente} />
          ))}
      </ul>
    </>
  );
};

export default Clientes;
