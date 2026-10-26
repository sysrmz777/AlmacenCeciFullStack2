// Datos usuarios, sesion y ordenes
export const tiposUsuario = { 1: "Administrador", 2: "Vendedor", 3: "Cliente" };

export const usuarios = [
    { id: 10001, run: "19011029K", nombre: "Alvaro Ramirez", correo: "alvaro.ramirez@duoc.cl", password: "admin", telefono: "+56 9 9111 2222", tipo: 1 },
    { id: 10002, run: "111111111", nombre: "Fernando Reyes", correo: "fernando.reyes@duoc.cl", password: "admin", telefono: "+56 9 8765 4321", tipo: 1 },
    { id: 10003, run: "190110222", nombre: "Benjamín Mora", correo: "benja.mora@gmail.com", password: "1234", telefono: "+56 9 7777 8888", tipo: 1 },
    { id: 10004, run: "111111111", nombre: "Carlos Rodríguez", correo: "carlos.rodriguez@duoc.cl", password: "1234", telefono: "+56 9 8765 4321", tipo: 2 },
    { id: 10005, run: "19011029K", nombre: "Laura Fernández", correo: "laura.fernandez@gmail.com", password: "1234", telefono: "+56 9 5555 6666", tipo: 3 },
    { id: 10006, run: "111111111", nombre: "Valentina Guajardo", correo: "vale.guajardo@duoc.cl", password: "1234", telefono: "+56 9 6543 2109", tipo: 3 },
    { id: 10007, run: "19011029K", nombre: "Sebastián Orrego", correo: "seba.orrego@profesor.duoc.cl", password: "1234", telefono: "+56 9 4444 3333", tipo: 2 },
    { id: 10008, run: "111111111", nombre: "Valeria Peña", correo: "valeria.pena@gmail.com", password: "1234", telefono: "+56 9 3334 4444", tipo: 3 }
];

export const ordenesIniciales = [
    {
        id: "20260701",
        fecha: "20-10-2026",
        cliente: "Laura Fernández",
        correo: "laura.fernandez@gmail.com",
        direccion: "Av. Pajaritos 1234",
        comuna: "Maipú",
        unidades: 2,
        total: 2800,
        estado: "Pagado",
        items: [
            { id: 1, nombre: "Criollitas", precio: 1300, cantidad: 1 },
            { id: 3, nombre: "CocaCola", precio: 1500, cantidad: 1 }
        ]
    },
    {
        id: "20260702",
        fecha: "21-10-2026",
        cliente: "Valentina Guajardo",
        correo: "vale.guajardo@duoc.cl",
        direccion: "Esquina Blanca 501",
        comuna: "Maipú",
        unidades: 3,
        total: 3580,
        estado: "Enviado",
        items: [
            { id: 4, nombre: "Arroz grado 1 (1 kg)", precio: 1290, cantidad: 2 },
            { id: 5, nombre: "Fideos espagueti (400 g)", precio: 990, cantidad: 1 }
        ]
    },
    {
        id: "20260705",
        fecha: "23-10-2026",
        cliente: "Valeria Peña",
        correo: "valeria.pena@gmail.com",
        direccion: "San Martín 890",
        comuna: "Santiago",
        unidades: 2,
        total: 2100,
        estado: "Pendiente",
        items: [
            { id: 1, nombre: "Criollitas", precio: 1300, cantidad: 1 },
            { id: 2, nombre: "Fruna", precio: 800, cantidad: 1 }
        ]
    }
];

// CRUD Usuarios en localStorage
export function obtenerUsuarios() {
    try {
        const guardados = JSON.parse(localStorage.getItem("usuarios_almacen"));
        return Array.isArray(guardados) && guardados.length > 0 ? guardados : usuarios;
    } catch {
        return usuarios;
    }
}

export function guardarUsuarios(lista) {
    localStorage.setItem("usuarios_almacen", JSON.stringify(lista));
}

export function registrarNuevoUsuario(datos) {
    const actual = obtenerUsuarios();
    const correoLimpio = (datos.correo || "").trim().toLowerCase();
    if (actual.some((u) => u.correo.toLowerCase() === correoLimpio)) {
        return { ok: false, mensaje: "Ya existe una cuenta registrada con ese correo." };
    }
    const nuevo = {
        id: Date.now(),
        run: (datos.run || datos.rut || "19011029K").toUpperCase(),
        nombre: (datos.nombre || "Usuario").trim(),
        correo: correoLimpio,
        password: datos.password || "1234",
        telefono: datos.telefono || "",
        regionId: datos.regionId || "",
        comunaId: datos.comunaId || "",
        tipo: Number(datos.tipo) || 3
    };
    const actualizados = [...actual, nuevo];
    guardarUsuarios(actualizados);
    return { ok: true, usuario: nuevo, lista: actualizados };
}

// Sesion activa en localStorage
export function obtenerSesion() {
    try {
        return JSON.parse(localStorage.getItem("sesion_almacen")) || null;
    } catch {
        return null;
    }
}

export function guardarSesion(usuario) {
    if (!usuario) {
        localStorage.removeItem("sesion_almacen");
    } else {
        const sesion = {
            id: usuario.id,
            run: usuario.run || "19011029K",
            nombre: usuario.nombre,
            correo: usuario.correo,
            telefono: usuario.telefono || "",
            tipo: usuario.tipo
        };
        localStorage.setItem("sesion_almacen", JSON.stringify(sesion));
    }
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("sesionActualizada"));
    }
}

export function autenticarUsuario(correo, password) {
    const correoLimpio = (correo || "").trim().toLowerCase();
    const lista = obtenerUsuarios();
    const encontrado = lista.find((u) => u.correo.toLowerCase() === correoLimpio);
    if (!encontrado) {
        return { ok: false, mensaje: "No existe un usuario registrado con ese correo." };
    }
    if (encontrado.password && encontrado.password !== password) {
        return { ok: false, mensaje: "Contraseña incorrecta." };
    }
    guardarSesion(encontrado);
    return { ok: true, usuario: encontrado };
}

// CRUD Ordenes en localStorage
export function obtenerOrdenes() {
    try {
        const guardadas = JSON.parse(localStorage.getItem("ordenes_almacen"));
        return Array.isArray(guardadas) && guardadas.length > 0 ? guardadas : ordenesIniciales;
    } catch {
        return ordenesIniciales;
    }
}

export function guardarOrdenes(lista) {
    localStorage.setItem("ordenes_almacen", JSON.stringify(lista));
}

export function registrarOrden(nuevaOrden) {
    const actual = obtenerOrdenes();
    const hoy = new Date();
    const fechaTexto = String(hoy.getDate()).padStart(2, "0") + "-" + String(hoy.getMonth() + 1).padStart(2, "0") + "-" + hoy.getFullYear();
    const orden = {
        id: nuevaOrden.numero || ("AC-" + String(Date.now()).slice(-6)),
        fecha: nuevaOrden.fecha || fechaTexto,
        cliente: nuevaOrden.nombre || nuevaOrden.cliente || "Cliente",
        correo: (nuevaOrden.correo || "").trim().toLowerCase(),
        direccion: nuevaOrden.direccion || "",
        comuna: nuevaOrden.comuna || "",
        unidades: nuevaOrden.unidades || 1,
        total: Number(nuevaOrden.total) || 0,
        estado: nuevaOrden.estado || "Pagado",
        items: nuevaOrden.items || []
    };
    const actualizadas = [orden, ...actual];
    guardarOrdenes(actualizadas);
    return orden;
}
