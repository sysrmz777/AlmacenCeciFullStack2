import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useProductos } from "../context/ProductosContext.jsx";
import { guardarSesion, obtenerSesion } from "../data/usuarios.js";
import { obtenerCategorias } from "../utils/productos.js";
import MenuCategorias from "./MenuCategorias.jsx";

// Navbar
const enlaces = [
    ["/", "Home"],
    ["/productos", "Productos"],
    ["/ofertas", "Ofertas"],
    ["/nosotros", "Nosotros"],
    ["/blog", "Blog"],
    ["/contacto", "Contacto"]
];

export default function Navbar() {
    const [abierto, setAbierto] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [sesion, setSesion] = useState(() => obtenerSesion());
    const { cantidad } = useCarrito();
    const { productos } = useProductos();
    const navegar = useNavigate();
    const cerrar = () => setAbierto(false);

    useEffect(() => {
        const actualizar = () => setSesion(obtenerSesion());
        window.addEventListener("sesionActualizada", actualizar);
        return () => window.removeEventListener("sesionActualizada", actualizar);
    }, []);

    function cerrarSesion() {
        guardarSesion(null);
        cerrar();
        navegar("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-cecilia">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/" onClick={cerrar}>Almacén Cecilia</Link>
                    <button className="navbar-toggler" type="button" aria-label="Abrir menú" aria-expanded={abierto} onClick={() => setAbierto(!abierto)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={"collapse navbar-collapse" + (abierto ? " show" : "")}>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button type="button" className="nav-link btn btn-link" onClick={() => { cerrar(); setMenuAbierto(true); }}>Categorías</button>
                            </li>
                            {enlaces.map(([ruta, texto]) => (
                                <li className="nav-item" key={ruta}>
                                    <NavLink end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to={ruta} onClick={cerrar}>{texto}</NavLink>
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2">
                            {sesion && (sesion.tipo === 1 || sesion.tipo === 2) && (
                                <Link className="btn btn-warning btn-sm" to="/admin" onClick={cerrar}>Admin</Link>
                            )}
                            {sesion ? (
                                <>
                                    <span className="text-white small fw-bold px-1">Hola, {sesion.nombre}</span>
                                    <button type="button" className="btn btn-outline-light btn-sm" onClick={cerrarSesion}>Cerrar Sesión</button>
                                </>
                            ) : (
                                <Link className="btn btn-outline-light btn-sm" to="/login" onClick={cerrar}>Iniciar Sesión</Link>
                            )}
                            <Link className="btn btn-light btn-sm" to="/carrito" onClick={cerrar}>Carrito ({cantidad})</Link>
                        </div>
                    </div>
                </div>
            </nav>
            <MenuCategorias abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} categorias={obtenerCategorias(productos)} />
        </>
    );
}
