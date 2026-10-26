import { createContext, useContext, useEffect, useState } from "react";
import { catalogoInicial } from "../data/productos.js";
import { siguienteId } from "../utils/productos.js";

const ProductosContext = createContext(null);

function leerProductos() {
    try {
        const guardados = JSON.parse(localStorage.getItem("productos"));
        return Array.isArray(guardados) && guardados.length > 0 ? guardados : catalogoInicial;
    } catch {
        return catalogoInicial;
    }
}

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState(leerProductos);

    useEffect(() => {
        localStorage.setItem("productos", JSON.stringify(productos));
    }, [productos]);

    const valor = {
        productos,
        obtener: (id) => productos.find((p) => p.id === Number(id)),
        crear: (producto) => setProductos((actual) => [...actual, { ...producto, id: siguienteId(actual) }]),
        actualizar: (producto) => setProductos((actual) => actual.map((p) => (p.id === producto.id ? producto : p))),
        eliminar: (id) => setProductos((actual) => actual.filter((p) => p.id !== id)),
        restaurar: () => setProductos(catalogoInicial)
    };

    return <ProductosContext.Provider value={valor}>{children}</ProductosContext.Provider>;
}

export function useProductos() {
    return useContext(ProductosContext);
}
