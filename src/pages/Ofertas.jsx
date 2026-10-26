import ProductoCard from "../components/ProductoCard.jsx";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useProductos } from "../context/ProductosContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { obtenerOfertas } from "../utils/productos.js";

export default function Ofertas() {
    const { productos } = useProductos();
    const { agregar } = useCarrito();
    const { mostrar } = useToast();
    const ofertas = obtenerOfertas(productos);

    function manejarAgregar(producto) {
        agregar(producto);
        mostrar("Producto '" + producto.nombre + "' añadido al carrito.");
    }

    return (
        <>
            <h2 className="text-center texto-cecilia mb-4">Las mejores ofertas de la semana</h2>
            {ofertas.length === 0 && <p className="text-center text-muted">Por ahora no hay ofertas disponibles.</p>}
            <div className="row g-4">
                {ofertas.map((producto) => (
                    <ProductoCard key={producto.id} producto={producto} onAgregar={manejarAgregar} />
                ))}
            </div>
        </>
    );
}
