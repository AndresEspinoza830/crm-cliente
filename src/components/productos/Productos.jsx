import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Producto from "./Producto";
import Spinner from "../layout/Spinner";
import CRMContext from "../../../context/CRMContext";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  const [auth, guardarAuth] = useContext(CRMContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token !== "") {
      const consultarApi = async () => {
        try {
          const { data } = await clienteAxios.get("/productos", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setProductos(data);
        } catch (error) {
          if (error.response.status == 500) {
            navigate("/iniciar-sesion");
          }
        }
      };
      consultarApi();
    } else {
      navigate("/iniciar-sesion");
    }
  }, [productos]);

  if (!auth.auth) {
    navigate("/iniciar-sesion");
  }

  if (!productos.length) return <Spinner />;

  return (
    <>
      <h2>Productos</h2>

      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos &&
          productos.map((producto) => {
            return <Producto key={producto._id} producto={producto} />;
          })}
      </ul>
    </>
  );
};

export default Productos;
