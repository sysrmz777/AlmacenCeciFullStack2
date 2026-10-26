import { Link } from "react-router-dom";
import { useProductos } from "../../context/ProductosContext.jsx";
import { obtenerOrdenes, obtenerUsuarios, tiposUsuario } from "../../data/usuarios.js";
import { contarPorCategoria, estadoStock, formatearPrecio, obtenerOfertas } from "../../utils/productos.js";

// Admin Reportes
export default function AdminReportes() {
    const { productos } = useProductos();
    const ordenes = obtenerOrdenes();
    const usuarios = obtenerUsuarios();

    const totalVentas = ordenes.reduce((suma, o) => suma + Number(o.total || 0), 0);
    const valorInventario = productos.reduce((suma, p) => suma + p.precio * p.stock, 0);
    const unidadesTotales = productos.reduce((suma, p) => suma + Number(p.stock || 0), 0);
    const criticos = productos.filter((p) => estadoStock(p) !== "disponible");
    const ofertas = obtenerOfertas(productos);
    const porCategoria = contarPorCategoria(productos);

    return (
        <>
            <h2 className="mb-4">Reportes del Sistema</h2>

            <div className="row g-3 mb-4">
                <div className="col-6 col-lg-3">
                    <div className="card p-3 text-center h-100">
                        <p className="small text-muted mb-1">Ventas acumuladas</p>
                        <p className="h4 texto-cecilia mb-0">{formatearPrecio(totalVentas)}</p>
                        <small className="text-muted">{ordenes.length} boletas emitidas</small>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="card p-3 text-center h-100">
                        <p className="small text-muted mb-1">Valorización de stock</p>
                        <p className="h4 texto-cecilia mb-0">{formatearPrecio(valorInventario)}</p>
                        <small className="text-muted">{unidadesTotales} unidades en bodega</small>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="card p-3 text-center h-100">
                        <p className="small text-muted mb-1">Alertas de reposición</p>
                        <p className="h4 text-warning-emphasis mb-0">{criticos.length}</p>
                        <small className="text-muted">{ofertas.length} productos en oferta</small>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="card p-3 text-center h-100">
                        <p className="small text-muted mb-1">Cuentas registradas</p>
                        <p className="h4 texto-cecilia mb-0">{usuarios.length}</p>
                        <small className="text-muted">Clientes y personal</small>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-12 col-lg-6">
                    <div className="card p-3 h-100">
                        <h3 className="h5 texto-cecilia">Inventario valorizado por categoría</h3>
                        <table className="table table-sm align-middle mb-0">
                            <thead>
                                <tr><th>Categoría</th><th className="text-end">Productos</th><th className="text-end">Unidades</th><th className="text-end">Valor Total</th></tr>
                            </thead>
                            <tbody>
                                {Object.entries(porCategoria).map(([cat, cant]) => {
                                    const prodsCat = productos.filter((p) => p.categoria === cat);
                                    const unids = prodsCat.reduce((s, p) => s + p.stock, 0);
                                    const valor = prodsCat.reduce((s, p) => s + p.precio * p.stock, 0);
                                    return (
                                        <tr key={cat}>
                                            <td>{cat}</td>
                                            <td className="text-end">{cant}</td>
                                            <td className="text-end">{unids}</td>
                                            <td className="text-end">{formatearPrecio(valor)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="card p-3 h-100">
                        <h3 className="h5 texto-cecilia">Distribución de usuarios por rol</h3>
                        <ul className="list-group list-group-flush mb-3">
                            {Object.entries(tiposUsuario).map(([idTipo, nombreRol]) => {
                                const cantidadRol = usuarios.filter((u) => u.tipo === Number(idTipo)).length;
                                return (
                                    <li key={idTipo} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span>{nombreRol}</span>
                                        <span className="badge text-bg-dark">{cantidadRol} usuarios</span>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="d-flex gap-2 mt-auto">
                            <Link to="/admin/ordenes" className="btn btn-outline-success btn-sm flex-fill">Ver Boletas</Link>
                            <Link to="/admin/productos" className="btn btn-outline-dark btn-sm flex-fill">Gestionar Stock</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
