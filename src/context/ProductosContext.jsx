import { createContext, useContext, useEffect, useState } from "react";
import { catalogoInicial } from "../data/productos.js";
import { siguienteId } from "../utils/productos.js";

const ProductosContext = createContext(null);

function leerProductos() {
    try {
        const guardados = JSON.parse(localStorage.getItem("productos"));
        if (!Array.isArray(guardados) || guardados.length === 0) return catalogoInicial;
        const porId = new Map(catalogoInicial.map((p) => [p.id, p]));
        return guardados.map((p) => {
            const base = porId.get(p.id);
            if (base && (!p.imagen || p.imagen === "/Imagen/sin-imagen.svg" || p.imagen.endsWith(".jng") || p.imagen.endsWith(".jnpng") || p.imagen === "/Imagen/fideos.jpg" || p.imagen === "/Imagen/agua.png")) {
                return { ...p, imagen: base.imagen };
            }
            return p;
        });
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
