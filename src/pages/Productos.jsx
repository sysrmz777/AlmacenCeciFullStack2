import { useState } from "react";
import CampoFormulario from "../components/CampoFormulario.jsx";
import ProductoCard from "../components/ProductoCard.jsx";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useProductos } from "../context/ProductosContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { filtrarProductos, obtenerCategorias } from "../utils/productos.js";

export default function Productos() {
    const { productos } = useProductos();
    const { agregar } = useCarrito();
    const { mostrar } = useToast();
    const [texto, setTexto] = useState("");
    const [categoria, setCategoria] = useState("");

    const visibles = filtrarProductos(productos, { texto, categoria });

    function manejarAgregar(producto) {
        agregar(producto);
        mostrar("Producto '" + producto.nombre + "' añadido al carrito.");
    }

    return (
        <>
            <h2 className="text-center texto-cecilia mb-4">Nuestros Productos</h2>
            <div className="row g-3 mb-3">
                <div className="col-12 col-md-8">
                    <CampoFormulario id="buscar" etiqueta="Buscar producto:" valor={texto} onCambio={setTexto} placeholder="Ej: arroz, jugo..." />
                </div>
                <div className="col-12 col-md-4">
                    <CampoFormulario id="filtroCategoria" etiqueta="Categoría:" componente="select" valor={categoria} onCambio={setCategoria}>
                        <option value="">Todas</option>
                        {obtenerCategorias(productos).map((c) => <option key={c} value={c}>{c}</option>)}
                    </CampoFormulario>
                </div>
            </div>
            {visibles.length === 0 && <p className="text-center text-muted">No encontramos productos con ese criterio.</p>}
            <div className="row g-4">
                {visibles.map((producto) => (
                    <ProductoCard key={producto.id} producto={producto} onAgregar={manejarAgregar} />
                ))}
            </div>
        </>
    );
}
