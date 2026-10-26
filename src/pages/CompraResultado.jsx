import { Link, useLocation, useParams } from "react-router-dom";
import NoEncontrada from "./NoEncontrada.jsx";
import { formatearPrecio } from "../utils/productos.js";

// Resultado de compra
export default function CompraResultado() {
    const { estado } = useParams();
    const { state } = useLocation();

    if (estado === "ok") {
        return (
            <div className="card p-4 mx-auto text-center" style={{ maxWidth: "600px", borderTop: "5px solid #2e7d32" }}>
                <h2 className="texto-cecilia">¡Compra realizada con éxito!</h2>
                {state ? (
                    <p className="mb-3">
                        Tu pedido <strong>{state.numero}</strong> ({state.unidades} unidades por {formatearPrecio(state.total)}) fue registrado.
                        Enviaremos el detalle a {state.correo}.
                    </p>
                ) : (
                    <p className="mb-3">Tu pedido fue registrado correctamente.</p>
                )}
                <div className="d-flex justify-content-center gap-2 mb-3">
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => alert("Boleta descargada")}>
                        Imprimir boleta en PDF
                    </button>
                    <button type="button" className="btn btn-success btn-sm" onClick={() => alert("Se ha enviado la boleta por correo")}>
                        Enviar boleta por email
                    </button>
                </div>
                <Link to="/productos" className="btn btn-cecilia">Seguir comprando</Link>
            </div>
        );
    }

    if (estado === "error") {
        return (
            <div className="card p-4 mx-auto text-center" style={{ maxWidth: "600px", borderTop: "5px solid #c62828" }}>
                <h2 className="text-danger">No pudimos procesar el pago</h2>
                <p className="mb-3">El pago fue rechazado. Tu carrito sigue guardado, puedes intentarlo nuevamente.</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-center">
                    <Link to="/compra" className="btn btn-cecilia">Reintentar pago</Link>
                    <Link to="/carrito" className="btn btn-outline-secondary">Volver al carrito</Link>
                </div>
            </div>
        );
    }

    return <NoEncontrada />;
}
