import { Link } from "react-router-dom";
import { useProductos } from "../../context/ProductosContext.jsx";
import { usuarios } from "../../data/usuarios.js";
import { contarPorCategoria, estadoStock, formatearPrecio, obtenerOfertas } from "../../utils/productos.js";

function Indicador({ titulo, valor }) {
    return (
        <div className="col-6 col-lg-3">
            <div className="card h-100 p-3 text-center">
                <p className="text-muted small mb-1">{titulo}</p>
                <p className="h3 texto-cecilia mb-0">{valor}</p>
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const { productos } = useProductos();
    const criticos = productos.filter((p) => estadoStock(p) !== "disponible");
    const porCategoria = contarPorCategoria(productos);
    const mayor = Math.max(...Object.values(porCategoria), 1);
    const valorInventario = productos.reduce((suma, p) => suma + p.precio * p.stock, 0);

    return (
        <>
            <h2 className="mb-4">Dashboard</h2>
            <div className="row g-3 mb-4">
                <Indicador titulo="Productos" valor={productos.length} />
                <Indicador titulo="En oferta" valor={obtenerOfertas(productos).length} />
                <Indicador titulo="Stock crítico" valor={criticos.length} />
                <Indicador titulo="Usuarios" valor={usuarios.length} />
            </div>

            <div className="row g-4">
                <div className="col-12 col-lg-6">
                    <div className="card p-3 h-100">
                        <h3 className="h5">Productos por categoría</h3>
                        {Object.entries(porCategoria).map(([nombre, cantidad]) => (
                            <div key={nombre} className="mb-2">
                                <div className="d-flex justify-content-between small"><span>{nombre}</span><span>{cantidad}</span></div>
                                <div className="barra-categoria" style={{ width: (cantidad / mayor) * 100 + "%" }}></div>
                            </div>
                        ))}
                        <p className="small text-muted mt-3 mb-0">Valor del inventario: {formatearPrecio(valorInventario)}</p>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="card p-3 h-100">
                        <h3 className="h5">Productos con stock crítico</h3>
                        {criticos.length === 0 && <p className="text-muted mb-0">No hay productos con stock crítico.</p>}
                        <ul className="list-group list-group-flush">
                            {criticos.map((p) => (
                                <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <Link to={"/admin/productos/" + p.id + "/editar"}>{p.nombre}</Link>
                                    <span className={"badge " + (estadoStock(p) === "agotado" ? "text-bg-secondary" : "text-bg-warning")}>{p.stock} unid.</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
