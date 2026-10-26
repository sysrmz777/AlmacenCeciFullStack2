import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { guardarSesion, obtenerSesion, obtenerUsuarios } from "../data/usuarios.js";
import AdminNavbar from "./AdminNavbar.jsx";
import Footer from "./Footer.jsx";

// Layout Admin con control de acceso por rol
export default function LayoutAdmin() {
    const [sesion, setSesion] = useState(() => obtenerSesion());

    useEffect(() => {
        const actualizar = () => setSesion(obtenerSesion());
        window.addEventListener("sesionActualizada", actualizar);
        return () => window.removeEventListener("sesionActualizada", actualizar);
    }, []);

    function entrarComoAdminDemo() {
        const admin = obtenerUsuarios().find((u) => u.tipo === 1);
        if (admin) {
            guardarSesion(admin);
            setSesion(obtenerSesion());
        }
    }

    if (!sesion || (sesion.tipo !== 1 && sesion.tipo !== 2)) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <AdminNavbar />
                <main className="container py-5 flex-grow-1 text-center">
                    <div className="card p-4 mx-auto" style={{ maxWidth: "520px", borderTop: "5px solid #c62828" }}>
                        <h2 className="h4 text-danger">Acceso restringido al Panel Administrador</h2>
                        <p className="text-muted">
                            Debes iniciar sesión con una cuenta de <strong>Administrador</strong> o <strong>Vendedor</strong> para gestionar el almacén.
                        </p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-center">
                            <Link to="/login" className="btn btn-cecilia">Ir a Iniciar Sesión</Link>
                            <button type="button" className="btn btn-dark" onClick={entrarComoAdminDemo}>
                                Entrar como Admin Demo
                            </button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <AdminNavbar />
            <main className="container py-4 flex-grow-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
