import { useSearchParams } from "react-router-dom";
import ProductoCard from "../components/ProductoCard.jsx";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useProductos } from "../context/ProductosContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { filtrarProductos, obtenerCategorias } from "../utils/productos.js";

export default function Categorias() {
    const { productos } = useProductos();
    const { agregar } = useCarrito();
    const { mostrar } = useToast();
    const [parametros, setParametros] = useSearchParams();
    const categoria = parametros.get("cat") || "";
    const categorias = obtenerCategorias(productos);

    function elegir(nombre) {
        setParametros(nombre === "" ? {} : { cat: nombre });
    }

    function manejarAgregar(producto) {
        agregar(producto);
        mostrar("Producto '" + producto.nombre + "' añadido al carrito.");
    }

    return (
        <>
            <h2 className="text-center texto-cecilia mb-4">{categoria === "" ? "Todas las categorías" : "Categoría: " + categoria}</h2>
            <ul className="nav nav-pills justify-content-center gap-2 mb-4">
                <li className="nav-item">
                    <button type="button" className={"nav-link" + (categoria === "" ? " active bg-cecilia" : " texto-cecilia")} onClick={() => elegir("")}>Todas</button>
                </li>
                {categorias.map((nombre) => (
                    <li className="nav-item" key={nombre}>
                        <button type="button" className={"nav-link" + (categoria === nombre ? " active bg-cecilia" : " texto-cecilia")} onClick={() => elegir(nombre)}>{nombre}</button>
                    </li>
                ))}
            </ul>
            <div className="row g-4">
                {filtrarProductos(productos, { categoria }).map((producto) => (
                    <ProductoCard key={producto.id} producto={producto} onAgregar={manejarAgregar} />
                ))}
            </div>
        </>
    );
}
