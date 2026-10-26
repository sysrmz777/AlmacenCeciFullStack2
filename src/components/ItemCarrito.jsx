import { formatearPrecio } from "../utils/productos.js";

export default function ItemCarrito({ item, onCambiar, onEliminar }) {
    return (
        <li className="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2">
            <span>{item.nombre} ({formatearPrecio(item.precio)})</span>
            <span className="d-flex align-items-center gap-2">
                <button type="button" className="btn btn-outline-success btn-sm" aria-label={"Quitar una unidad de " + item.nombre} onClick={() => onCambiar(item.id, -1)} disabled={item.cantidad <= 1}>-</button>
                <span data-testid="cantidad">{item.cantidad}</span>
                <button type="button" className="btn btn-outline-success btn-sm" aria-label={"Agregar una unidad de " + item.nombre} onClick={() => onCambiar(item.id, 1)}>+</button>
            </span>
            <strong>{formatearPrecio(item.precio * item.cantidad)}</strong>
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => onEliminar(item.id)}>Eliminar</button>
        </li>
    );
}
