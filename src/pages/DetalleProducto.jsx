import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Migas from "../components/Migas.jsx";
import ProductoCard from "../components/ProductoCard.jsx";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useProductos } from "../context/ProductosContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { estadoStock, formatearPrecio, obtenerRelacionados, porcentajeDescuento } from "../utils/productos.js";

export default function DetalleProducto() {
    const { id } = useParams();
    const { productos, obtener } = useProductos();
    const { agregar } = useCarrito();
    const { mostrar } = useToast();
    const [cantidad, setCantidad] = useState(1);
    const producto = obtener(id);

    if (!producto) {
        return (
            <div className="text-center">
                <h2 className="texto-cecilia">Producto no encontrado</h2>
                <Link to="/productos" className="btn btn-cecilia mt-3">Volver al catálogo</Link>
            </div>
        );
    }

    const estado = estadoStock(producto);
    const descuento = porcentajeDescuento(producto);
    const maximo = Math.max(producto.stock, 1);

    function cambiarCantidad(delta) {
        setCantidad((actual) => Math.min(maximo, Math.max(1, actual + delta)));
    }

    function manejarAgregar() {
        agregar(producto, cantidad);
        mostrar(cantidad + " x '" + producto.nombre + "' añadido al carrito.");
    }

    return (
        <>
            <Migas items={[{ texto: "Home", a: "/" }, { texto: "Productos", a: "/productos" }, { texto: producto.nombre }]} />
            <div className="row g-4 mb-5">
                <div className="col-12 col-md-5">
                    <img src={producto.imagen} alt={producto.nombre} className="img-fluid bg-white border rounded p-3 w-100" />
                </div>
                <div className="col-12 col-md-7">
                    <span className="badge text-bg-light border mb-2">{producto.categoria}</span>
                    <h2 className="texto-cecilia">{producto.nombre}</h2>
                    <p>{producto.descripcion}</p>
                    <p className="mb-1">
                        {descuento > 0 && <span className="precio-descuento text-decoration-line-through me-2">{formatearPrecio(producto.precioAnterior)}</span>}
                        <span className="fw-bold texto-cecilia fs-3">{formatearPrecio(producto.precio)}</span>
                        {descuento > 0 && <span className="badge bg-danger ms-2">-{descuento}%</span>}
                    </p>
                    <p>
                        {estado === "agotado" && <span className="badge text-bg-secondary">Agotado</span>}
                        {estado === "critico" && <span className="badge text-bg-warning">Últimas {producto.stock} unidades</span>}
                        {estado === "disponible" && <span className="badge text-bg-success">Disponible ({producto.stock} unidades)</span>}
                    </p>
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <button type="button" className="btn btn-outline-success btn-sm" aria-label="Disminuir cantidad" onClick={() => cambiarCantidad(-1)} disabled={cantidad <= 1}>-</button>
                        <span className="px-2">{cantidad}</span>
                        <button type="button" className="btn btn-outline-success btn-sm" aria-label="Aumentar cantidad" onClick={() => cambiarCantidad(1)} disabled={cantidad >= maximo}>+</button>
                    </div>
                    <button type="button" className="btn btn-cecilia" disabled={estado === "agotado"} onClick={manejarAgregar}>Añadir al carrito</button>
                </div>
            </div>

            {obtenerRelacionados(productos, producto).length > 0 && (
                <section>
                    <h3 className="h4 texto-cecilia mb-3">Productos relacionados</h3>
                    <div className="row g-4">
                        {obtenerRelacionados(productos, producto).map((relacionado) => (
                            <ProductoCard key={relacionado.id} producto={relacionado} onAgregar={(p) => { agregar(p); mostrar("'" + p.nombre + "' añadido al carrito."); }} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
