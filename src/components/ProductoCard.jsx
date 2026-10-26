import { Link } from "react-router-dom";
import { estadoStock, formatearPrecio, porcentajeDescuento } from "../utils/productos.js";

export default function ProductoCard({ producto, onAgregar }) {
    const estado = estadoStock(producto);
    const descuento = porcentajeDescuento(producto);
    const ruta = "/productos/" + producto.id;

    return (
        <div className="col-12 col-sm-6 col-lg-4">
            <article className="card h-100 text-center card-producto position-relative">
                {descuento > 0 && <span className="badge bg-danger position-absolute top-0 start-0 m-2">-{descuento}%</span>}
                <Link to={ruta}>
                    <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
                </Link>
                <div className="card-body d-flex flex-column">
                    <span className="badge text-bg-light border align-self-center mb-2">{producto.categoria}</span>
                    <h3 className="h5 card-title"><Link className="link-none" to={ruta}>{producto.nombre}</Link></h3>
                    <p className="mb-2">
                        {descuento > 0 && <span className="precio-descuento text-decoration-line-through me-2">{formatearPrecio(producto.precioAnterior)}</span>}
                        <span className="fw-bold texto-cecilia fs-5">{formatearPrecio(producto.precio)}</span>
                    </p>
                    {estado === "critico" && <p className="small text-warning-emphasis mb-2">¡Quedan pocas unidades!</p>}
                    <button type="button" className="btn btn-dark mt-auto" disabled={estado === "agotado"} onClick={() => onAgregar(producto)}>
                        {estado === "agotado" ? "Agotado" : "Añadir al carrito"}
                    </button>
                </div>
            </article>
        </div>
    );
}
