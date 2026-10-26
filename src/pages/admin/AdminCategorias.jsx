import { useState } from "react";
import { Link } from "react-router-dom";
import CampoFormulario from "../../components/CampoFormulario.jsx";
import { useProductos } from "../../context/ProductosContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { categoriasBase } from "../../data/productos.js";
import { contarPorCategoria, formatearPrecio } from "../../utils/productos.js";

function leerCategoriasAdmin() {
    try {
        const guardadas = JSON.parse(localStorage.getItem("categorias_almacen"));
        return Array.isArray(guardadas) && guardadas.length > 0 ? guardadas : categoriasBase;
    } catch {
        return categoriasBase;
    }
}

// Admin Categorias
export default function AdminCategorias() {
    const { productos } = useProductos();
    const { mostrar } = useToast();
    const [categorias, setCategorias] = useState(leerCategoriasAdmin);
    const [nuevaCategoria, setNuevaCategoria] = useState("");
    const [seleccionada, setSeleccionada] = useState(null);
    const conteo = contarPorCategoria(productos);

    function agregarCategoria(e) {
        e.preventDefault();
        const limpia = nuevaCategoria.trim();
        if (limpia.length < 3) {
            mostrar("El nombre de la categoría debe tener al menos 3 caracteres.", "danger");
            return;
        }
        if (categorias.some((c) => c.toLowerCase() === limpia.toLowerCase())) {
            mostrar("Esa categoría ya existe.", "warning");
            return;
        }
        const actualizadas = [...categorias, limpia];
        setCategorias(actualizadas);
        localStorage.setItem("categorias_almacen", JSON.stringify(actualizadas));
        setNuevaCategoria("");
        mostrar("Categoría '" + limpia + "' agregada.");
    }

    function eliminarCategoria(nombre) {
        if ((conteo[nombre] || 0) > 0) {
            mostrar("No puedes eliminar una categoría que tiene productos asociados.", "warning");
            return;
        }
        const restantes = categorias.filter((c) => c !== nombre);
        setCategorias(restantes);
        localStorage.setItem("categorias_almacen", JSON.stringify(restantes));
        mostrar("Categoría eliminada.", "warning");
    }

    const productosDeCategoria = seleccionada ? productos.filter((p) => p.categoria === seleccionada) : [];

    return (
        <>
            <h2 className="mb-3">Categorías del Almacén</h2>

            <div className="row g-4">
                <div className="col-12 col-lg-4">
                    <div className="card p-3">
                        <h3 className="h5">Nueva Categoría</h3>
                        <form onSubmit={agregarCategoria}>
                            <CampoFormulario
                                id="nuevaCategoria"
                                etiqueta="Nombre de la categoría:"
                                valor={nuevaCategoria}
                                onCambio={setNuevaCategoria}
                                maxLength={50}
                                placeholder="Ej: Lácteos, Panadería..."
                            />
                            <button type="submit" className="btn btn-dark w-100">Guardar Categoría</button>
                        </form>
                    </div>
                </div>

                <div className="col-12 col-lg-8">
                    <div className="table-responsive">
                        <table className="table table-striped align-middle bg-white">
                            <thead>
                                <tr><th>Categoría</th><th className="text-end">Productos</th><th>Acciones</th></tr>
                            </thead>
                            <tbody>
                                {categorias.map((nombre) => (
                                    <tr key={nombre}>
                                        <td className="fw-bold">{nombre}</td>
                                        <td className="text-end">{conteo[nombre] || 0}</td>
                                        <td className="text-end text-nowrap">
                                            <button type="button" className="btn btn-outline-primary btn-sm me-1" onClick={() => setSeleccionada(nombre)}>
                                                Ver detalle
                                            </button>
                                            <Link to={"/categorias?cat=" + encodeURIComponent(nombre)} className="btn btn-outline-dark btn-sm me-1">
                                                Ver en tienda
                                            </Link>
                                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => eliminarCategoria(nombre)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {seleccionada && (
                        <div className="card p-3 mt-3 border-success">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h4 className="h6 texto-cecilia mb-0">Productos en categoría: {seleccionada}</h4>
                                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setSeleccionada(null)}>Cerrar</button>
                            </div>
                            {productosDeCategoria.length === 0 ? (
                                <p className="small text-muted mb-0">No hay productos registrados en esta categoría.</p>
                            ) : (
                                <ul className="list-group list-group-flush small">
                                    {productosDeCategoria.map((p) => (
                                        <li key={p.id} className="list-group-item d-flex justify-content-between">
                                            <span>{p.codigo} - {p.nombre}</span>
                                            <span>{formatearPrecio(p.precio)} (Stock: {p.stock})</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
