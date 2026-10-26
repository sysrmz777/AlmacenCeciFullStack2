import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal.jsx";
import { useProductos } from "../../context/ProductosContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { estadoStock, formatearPrecio } from "../../utils/productos.js";

export default function AdminProductos() {
    const { productos, eliminar, restaurar } = useProductos();
    const { mostrar } = useToast();
    const [soloCriticos, setSoloCriticos] = useState(false);
    const [porEliminar, setPorEliminar] = useState(null);

    const visibles = soloCriticos ? productos.filter((p) => estadoStock(p) !== "disponible") : productos;

    function confirmarEliminar() {
        eliminar(porEliminar.id);
        mostrar("Producto '" + porEliminar.nombre + "' eliminado.", "warning");
        setPorEliminar(null);
    }

    return (
        <>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <h2 className="mb-0">Productos</h2>
                <div className="d-flex gap-2">
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => { restaurar(); mostrar("Catálogo restaurado."); }}>Restaurar catálogo</button>
                    <Link to="/admin/productos/nuevo" className="btn btn-cecilia btn-sm">Nuevo producto</Link>
                </div>
            </div>

            <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="soloCriticos" checked={soloCriticos} onChange={(e) => setSoloCriticos(e.target.checked)} />
                <label className="form-check-label" htmlFor="soloCriticos">Mostrar solo stock crítico o agotado</label>
            </div>

            <div className="table-responsive">
                <table className="table table-striped align-middle bg-white">
                    <thead>
                        <tr><th>Código</th><th>Nombre</th><th>Categoría</th><th className="text-end">Precio</th><th className="text-end">Stock</th><th>Estado</th><th></th></tr>
                    </thead>
                    <tbody>
                        {visibles.map((p) => {
                            const estado = estadoStock(p);
                            return (
                                <tr key={p.id}>
                                    <td>{p.codigo}</td>
                                    <td>{p.nombre}</td>
                                    <td>{p.categoria}</td>
                                    <td className="text-end">{formatearPrecio(p.precio)}</td>
                                    <td className="text-end">{p.stock}</td>
                                    <td>
                                        {estado === "agotado" && <span className="badge text-bg-secondary">Agotado</span>}
                                        {estado === "critico" && <span className="badge text-bg-warning">Crítico</span>}
                                        {estado === "disponible" && <span className="badge text-bg-success">OK</span>}
                                    </td>
                                    <td className="text-nowrap">
                                        <Link to={"/admin/productos/" + p.id + "/editar"} className="btn btn-outline-dark btn-sm me-1">Editar</Link>
                                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => setPorEliminar(p)}>Eliminar</button>
                                    </td>
                                </tr>
                            );
                        })}
                        {visibles.length === 0 && <tr><td colSpan={7} className="text-center text-muted">No hay productos para mostrar.</td></tr>}
                    </tbody>
                </table>
            </div>

            <Modal
                abierto={porEliminar !== null}
                titulo="Eliminar producto"
                onCerrar={() => setPorEliminar(null)}
                pie={(
                    <>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setPorEliminar(null)}>Cancelar</button>
                        <button type="button" className="btn btn-danger" onClick={confirmarEliminar}>Eliminar</button>
                    </>
                )}
            >
                {porEliminar && "¿Seguro que quieres eliminar '" + porEliminar.nombre + "'?"}
            </Modal>
        </>
    );
}
