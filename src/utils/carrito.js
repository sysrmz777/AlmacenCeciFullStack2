// Carrito
export function agregarProducto(carrito, producto, cantidad = 1) {
    const unidades = Math.max(1, Math.floor(Number(cantidad)) || 1);
    const tope = producto.stock !== undefined ? Number(producto.stock) : 999;
    const existente = carrito.find((item) => item.id === producto.id);
    if (existente) {
        const nuevaCantidad = Math.min(tope, existente.cantidad + unidades);
        return carrito.map((item) => (item.id === producto.id ? { ...item, cantidad: nuevaCantidad } : item));
    }
    return [...carrito, { id: producto.id, nombre: producto.nombre, precio: producto.precio, stock: tope, cantidad: Math.min(tope, unidades) }];
}

export function cambiarCantidadItem(carrito, id, delta) {
    return carrito
        .map((item) => {
            if (item.id !== id) return item;
            const tope = item.stock !== undefined ? Number(item.stock) : 999;
            const nueva = Math.min(tope, item.cantidad + delta);
            return { ...item, cantidad: nueva };
        })
        .filter((item) => item.cantidad > 0);
}

export function eliminarItem(carrito, id) {
    return carrito.filter((item) => item.id !== id);
}

export function calcularTotal(carrito) {
    return carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
}

export function contarUnidades(carrito) {
    return carrito.reduce((suma, item) => suma + item.cantidad, 0);
}
