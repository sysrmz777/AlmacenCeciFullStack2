import { Link } from "react-router-dom";

export default function NoEncontrada() {
    return (
        <div className="text-center py-5">
            <h2 className="texto-cecilia">Página no encontrada</h2>
            <p className="text-muted">Esta sección todavía no está disponible.</p>
            <Link to="/" className="btn btn-cecilia">Volver al inicio</Link>
        </div>
    );
}
