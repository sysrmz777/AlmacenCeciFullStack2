import { useEffect, useState } from "react";
import { guardarOrdenes, obtenerOrdenes } from "../../data/usuarios.js";
import { formatearPrecio } from "../../utils/productos.js";

// Admin Ordenes
export default function AdminOrdenes() {
    const [ordenes, setOrdenes] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState("");
    const [boleta, setBoleta] = useState(null);

    useEffect(() => {
        setOrdenes(obtenerOrdenes());
    }, []);

    function cambiarEstado(id, nuevoEstado) {
        const actualizadas = ordenes.map((o) => (o.id === id ? { ...o, estado: nuevoEstado } : o));
        setOrdenes(actualizadas);
        guardarOrdenes(actualizadas);
        if (boleta && boleta.id === id) {
            setBoleta({ ...boleta, estado: nuevoEstado });
        }
    }

    const visibles = filtroEstado === "" ? ordenes : ordenes.filter((o) => o.estado === filtroEstado);
    const totalRecaudado = visibles.reduce((acc, o) => acc + Number(o.total || 0), 0);

    return (
        <>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <h2 className="mb-0">Órdenes y Boletas</h2>
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="filtroEstadoOrden" className="small fw-bold mb-0">Estado:</label>
                    <select id="filtroEstadoOrden" className="form-select form-select-sm" style={{ width: "160px" }} value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                        <option value="">Todas ({ordenes.length})</option>
                        <option value="Pagado">Pagado</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Pendiente">Pendiente</option>
                    </select>
                </div>
            </div>

            {boleta && (
                <div className="card p-4 mb-4 border-success">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <h3 className="h5 texto-cecilia mb-1">Boleta Electrónica #{boleta.id}</h3>
                            <p className="small text-muted mb-0">Fecha de emisión: {boleta.fecha}</p>
                        </div>
                        <span className="badge text-bg-success">{boleta.estado}</span>
                    </div>
                    <div className="row g-2 mb-3 small">
                        <div className="col-md-4"><strong>Cliente:</strong> {boleta.cliente}</div>
                        <div className="col-md-4"><strong>Correo:</strong> {boleta.correo}</div>
                        <div className="col-md-4"><strong>Despacho:</strong> {boleta.direccion || "Retiro en local"} {boleta.comuna ? "(" + boleta.comuna + ")" : ""}</div>
                    </div>
                    {boleta.items && boleta.items.length > 0 && (
                        <div className="table-responsive mb-3">
                            <table className="table table-sm table-bordered mb-0">
                                <thead>
                                    <tr><th>Producto</th><th className="text-end">Precio</th><th className="text-end">Cantidad</th><th className="text-end">Subtotal</th></tr>
                                </thead>
                                <tbody>
                                    {boleta.items.map((item, idx) => (
                                        <tr key={item.id || idx}>
                                            <td>{item.nombre}</td>
                                            <td className="text-end">{formatearPrecio(item.precio)}</td>
                                            <td className="text-end">{item.cantidad}</td>
                                            <td className="text-end">{formatearPrecio(item.precio * item.cantidad)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                        <p className="h5 texto-cecilia mb-0">Total Pagado: {formatearPrecio(boleta.total)}</p>
                        <div className="d-flex gap-2">
                            <button type="button" className="btn btn-outline-success btn-sm" onClick={() => cambiarEstado(boleta.id, "Enviado")}>
                                Marcar Enviado
                            </button>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setBoleta(null)}>
                                Cerrar Boleta
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-striped align-middle bg-white">
                    <thead>
                        <tr><th>Nro Boleta</th><th>Fecha</th><th>Cliente</th><th>Correo</th><th className="text-end">Total</th><th>Estado</th><th>Acción</th></tr>
                    </thead>
                    <tbody>
                        {visibles.map((ord) => (
                            <tr key={ord.id}>
                                <td>#{ord.id}</td>
                                <td>{ord.fecha}</td>
                                <td>{ord.cliente}</td>
                                <td>{ord.correo}</td>
                                <td className="text-end">{formatearPrecio(ord.total)}</td>
                                <td>
                                    <span className={"badge " + (ord.estado === "Pagado" ? "text-bg-success" : ord.estado === "Enviado" ? "text-bg-primary" : "text-bg-warning")}>
                                        {ord.estado}
                                    </span>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => setBoleta(ord)}>
                                        Mostrar Boleta
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-end fw-bold texto-cecilia mb-0">Total en órdenes listadas: {formatearPrecio(totalRecaudado)}</p>
        </>
    );
}
