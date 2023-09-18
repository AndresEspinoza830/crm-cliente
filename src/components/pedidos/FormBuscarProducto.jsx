import React from "react";

const FormBuscarProducto = ({
  buscarProducto,
  leerDatosBusqueda,
  busqueda,
}) => {
  return (
    <form onSubmit={buscarProducto}>
      <legend>Busca un Producto y agrega una cantidad</legend>

      <div className="campo">
        <label>Productos:</label>
        <input
          type="text"
          placeholder="Nombre Productos"
          name="productos"
          onChange={leerDatosBusqueda}
        />
      </div>

      <input
        type="submit"
        value="Buscar Producto"
        className="btn btn-azul btn-block"
      />
    </form>
  );
};

export default FormBuscarProducto;
