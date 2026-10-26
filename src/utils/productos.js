import { esStockCritico } from "./validaciones.js";

export function formatearPrecio(valor) {
    return "$" + Number(valor).toLocaleString("es-CL");
}

export function obtenerCategorias(productos) {
    return [...new Set(productos.map((p) => p.categoria))].sort();
}

export function filtrarProductos(productos, { texto = "", categoria = "" } = {}) {
    const buscado = texto.trim().toLowerCase();
    return productos.filter((p) => {
        const coincideCategoria = categoria === "" || p.categoria === categoria;
        const coincideTexto = buscado === "" || p.nombre.toLowerCase().includes(buscado) || p.descripcion.toLowerCase().includes(buscado);
        return coincideCategoria && coincideTexto;
    });
}

export function obtenerOfertas(productos) {
    return productos.filter((p) => p.precioAnterior && p.precioAnterior > p.precio);
}

export function porcentajeDescuento(producto) {
    if (!producto.precioAnterior || producto.precioAnterior <= producto.precio) return 0;
    return Math.round((1 - producto.precio / producto.precioAnterior) * 100);
}

export function siguienteId(productos) {
    return productos.reduce((mayor, p) => Math.max(mayor, p.id), 0) + 1;
}

export function obtenerRelacionados(productos, producto, maximo = 3) {
    return productos.filter((p) => p.categoria === producto.categoria && p.id !== producto.id).slice(0, maximo);
}

export function contarPorCategoria(productos) {
    return productos.reduce((conteo, p) => ({ ...conteo, [p.categoria]: (conteo[p.categoria] || 0) + 1 }), {});
}

export function estadoStock(producto) {
    if (Number(producto.stock) <= 0) return "agotado";
    if (esStockCritico(producto.stock, producto.stockCritico)) return "critico";
    return "disponible";
}

export function validarProducto(form, existentes = [], idActual = null) {
    const errores = {};

    const codigo = (form.codigo || "").trim();
    if (codigo.length < 3) errores.codigo = "El código debe tener al menos 3 caracteres.";
    else if (existentes.some((p) => p.codigo.toLowerCase() === codigo.toLowerCase() && p.id !== idActual)) errores.codigo = "Ya existe un producto con ese código.";

    const nombre = (form.nombre || "").trim();
    if (nombre === "") errores.nombre = "El nombre es obligatorio.";
    else if (nombre.length > 100) errores.nombre = "Máximo 100 caracteres.";

    if ((form.descripcion || "").length > 500) errores.descripcion = "Máximo 500 caracteres.";

    if (form.precio === "" || isNaN(Number(form.precio)) || Number(form.precio) < 0) errores.precio = "Ingresa un precio igual o mayor a 0.";

    if (form.precioAnterior !== "" && (isNaN(Number(form.precioAnterior)) || Number(form.precioAnterior) <= Number(form.precio))) {
        errores.precioAnterior = "El precio anterior debe ser mayor al precio actual.";
    }

    if (!form.categoria) errores.categoria = "Selecciona una categoría.";

    if (form.stock === "" || !Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) errores.stock = "El stock debe ser un número entero mayor o igual a 0.";

    if (form.stockCritico !== "" && (!Number.isInteger(Number(form.stockCritico)) || Number(form.stockCritico) < 0)) {
        errores.stockCritico = "El stock crítico debe ser un número entero mayor o igual a 0.";
    }

    return errores;
}
