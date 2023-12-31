const Pedido = ({ pedido }) => {
  const { cliente, _id } = pedido;

  return (
    <>
      <li className="pedido">
        <div className="info-pedido">
          <p className="id">ID: {_id}</p>
          <p className="nombre">
            Cliente: {cliente.nombre} {cliente.apellido}{" "}
          </p>

          <div className="articulos-pedido">
            <p className="productos">Artículos Pedido: </p>
            <ul>
              {pedido.pedido.map((articulos) => (
                <li key={_id + articulos._id}>
                  <p>{articulos.producto.nombre}</p>
                  <p>Precio: ${articulos.producto.precio}</p>
                  <p>Cantidad: {articulos.cantidad}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="total">Total: ${pedido.total} </p>
        </div>
        <div className="acciones">
          <button type="button" className="btn btn-rojo btn-eliminar">
            <i className="fas fa-times"></i>
            Eliminar Pedido
          </button>
        </div>
      </li>
    </>
  );
};

export default Pedido;
