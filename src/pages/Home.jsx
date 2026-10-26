import { Link } from "react-router-dom";
import Carrusel from "../components/Carrusel.jsx";
import ProductoCard from "../components/ProductoCard.jsx";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useProductos } from "../context/ProductosContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { obtenerOfertas } from "../utils/productos.js";

const diapositivas = [
    { titulo: "Ofertas de la semana", texto: "Precios rebajados en abarrotes y bebidas.", boton: "Ver ofertas", enlace: "/ofertas", fondo: "bg-cecilia" },
    { titulo: "Todo para tu despensa", texto: "Arroz, fideos, aceite y mucho más.", boton: "Ver categorías", enlace: "/categorias", fondo: "bg-dark" },
    { titulo: "¿Dudas o pedidos?", texto: "Escríbenos y te respondemos a la brevedad.", boton: "Contáctanos", enlace: "/contacto", fondo: "bg-secondary" }
];

const beneficios = [
    ["Entregas Rápidas", "Llevamos tus compras directo a la puerta de tu casa."],
    ["Calidad Garantizada", "Los mejores productos seleccionados especialmente para ti."],
    ["Atención Vecinal", "Contáctanos por WhatsApp o mediante nuestro formulario web."]
];

export default function Home() {
    const { productos } = useProductos();
    const { agregar } = useCarrito();
    const { mostrar } = useToast();
    const destacados = obtenerOfertas(productos).slice(0, 3);

    function manejarAgregar(producto) {
        agregar(producto);
        mostrar("'" + producto.nombre + "' añadido al carrito.");
    }

    return (
        <>
            <Carrusel items={diapositivas} />

            <section className="bg-white border rounded p-4 p-md-5 text-center mb-4">
                <h2 className="texto-cecilia">Bienvenidos a Almacén Cecilia</h2>
                <p className="lead">Tu almacén de barrio con los mejores precios, ofertas y la atención cercana de siempre.</p>
                <Link to="/productos" className="btn btn-cecilia btn-lg">Ir al Catálogo de Productos</Link>
            </section>

            {destacados.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-center texto-cecilia mb-3">Productos en oferta</h2>
                    <div className="row g-4">
                        {destacados.map((producto) => (
                            <ProductoCard key={producto.id} producto={producto} onAgregar={manejarAgregar} />
                        ))}
                    </div>
                </section>
            )}

            <section className="bg-white border rounded p-4 text-center mx-auto mb-4" style={{ maxWidth: "800px" }}>
                <h2 className="texto-cecilia">Publicidad</h2>
                <p>Conoce más sobre la magia y los productos de nuestro almacén:</p>
                <div className="ratio ratio-16x9">
                    <iframe
                        src="https://www.youtube.com/embed/_MHV-IEZmWc"
                        title="Spot Publicitario Almacén Cecilia"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>

            <section className="row g-3 text-center">
                {beneficios.map(([titulo, texto]) => (
                    <div className="col-12 col-md-4" key={titulo}>
                        <div className="card h-100 p-3">
                            <h3 className="h5 texto-cecilia">{titulo}</h3>
                            <p className="mb-0">{texto}</p>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
