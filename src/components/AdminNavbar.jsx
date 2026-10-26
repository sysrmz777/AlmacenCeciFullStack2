import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// Admin Navbar
const enlaces = [
    ["/admin", "Dashboard"],
    ["/admin/ordenes", "Ordenes"],
    ["/admin/productos", "Productos"],
    ["/admin/categorias", "Categorías"],
    ["/admin/usuarios", "Usuarios"],
    ["/admin/reportes", "Reportes"],
    ["/admin/perfil", "Perfil"]
];

export default function AdminNavbar() {
    const [abierto, setAbierto] = useState(false);
    const cerrar = () => setAbierto(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <span className="navbar-brand fw-bold">Panel Administrador</span>
                <button className="navbar-toggler" type="button" aria-label="Abrir menú" aria-expanded={abierto} onClick={() => setAbierto(!abierto)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"collapse navbar-collapse" + (abierto ? " show" : "")}>
                    <ul className="navbar-nav ms-auto">
                        {enlaces.map(([ruta, texto]) => (
                            <li className="nav-item" key={ruta}>
                                <NavLink end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} to={ruta} onClick={cerrar}>{texto}</NavLink>
                            </li>
                        ))}
                        <li className="nav-item"><Link className="nav-link" to="/" onClick={cerrar}>← Volver a la Tienda</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
