import { createContext, useContext, useEffect, useState } from "react";
import { agregarProducto, cambiarCantidadItem, eliminarItem, calcularTotal, contarUnidades } from "../utils/carrito.js";

const CarritoContext = createContext(null);

function leerCarrito() {
    try {
        return JSON.parse(localStorage.getItem("carrito")) || [];
    } catch {
        return [];
    }
}

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState(leerCarrito);

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    const valor = {
        carrito,
        cantidad: contarUnidades(carrito),
        total: calcularTotal(carrito),
        agregar: (producto, cantidad = 1) => setCarrito((actual) => agregarProducto(actual, producto, cantidad)),
        cambiarCantidad: (id, delta) => setCarrito((actual) => cambiarCantidadItem(actual, id, delta)),
        eliminar: (id) => setCarrito((actual) => eliminarItem(actual, id)),
        vaciar: () => setCarrito([])
    };

    return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
    return useContext(CarritoContext);
}
