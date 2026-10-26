import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ItemCarrito from "../components/ItemCarrito.jsx";
import Modal from "../components/Modal.jsx";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { formatearPrecio } from "../utils/productos.js";

// Carrito
export default function Carrito() {
    const { carrito, total, cambiarCantidad, eliminar, vaciar } = useCarrito();
    const { mostrar } = useToast();
    const navegar = useNavigate();
    const [pendiente, setPendiente] = useState(null);

    function confirmar() {
        if (pendiente.tipo === "eliminar") {
            eliminar(pendiente.id);
            mostrar("Producto eliminado del carrito.", "warning");
        } else {
            vaciar();
            mostrar("Carrito vaciado.", "warning");
        }
        setPendiente(null);
    }

    function irAPagar() {
        if (carrito.length === 0) {
            mostrar("Agrega productos antes de finalizar la compra.", "warning");
            return;
        }
        navegar("/compra");
    }

    const textoModal = pendiente && pendiente.tipo === "eliminar" ? "¿Quieres eliminar este producto del carrito?" : "¿Quieres vaciar todo el carrito?";

    return (
        <div className="card p-4 mx-auto" style={{ maxWidth: "650px", borderTop: "5px solid #2e7d32" }}>
            <h2 className="text-center texto-cecilia">Mi Carrito de Compras</h2>
            <ul className="list-group my-3">
                {carrito.length === 0 && <li className="list-group-item text-center text-muted">Tu carrito está vacío.</li>}
                {carrito.map((item) => (
                    <ItemCarrito key={item.id} item={item} onCambiar={cambiarCantidad} onEliminar={(id) => setPendiente({ tipo: "eliminar", id })} />
                ))}
            </ul>
            <h3 className="h4 text-end texto-cecilia mb-3">Total: {formatearPrecio(total)}</h3>
            <div className="d-grid gap-2 d-sm-flex">
                <button type="button" className="btn btn-cecilia flex-fill" onClick={irAPagar}>Finalizar Compra</button>
                <button type="button" className="btn btn-outline-secondary flex-fill" disabled={carrito.length === 0} onClick={() => setPendiente({ tipo: "vaciar" })}>Vaciar Carrito</button>
            </div>
            <p className="text-center mt-3 mb-0"><Link className="fw-bold texto-cecilia text-decoration-none" to="/productos">← Volver al catálogo</Link></p>

            <Modal
                abierto={pendiente !== null}
                titulo="Confirmar acción"
                onCerrar={() => setPendiente(null)}
                pie={(
                    <>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setPendiente(null)}>Cancelar</button>
                        <button type="button" className="btn btn-danger" onClick={confirmar}>Confirmar</button>
                    </>
                )}
            >
                {textoModal}
            </Modal>
        </div>
    );
}
