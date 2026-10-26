export function validarRut(rut) {
    if (!rut) return false;
    const valor = rut.replace(/\./g, "").replace("-", "").toUpperCase();
    if (valor.length < 8 || valor.length > 9) return false;

    const cuerpo = valor.slice(0, -1);
    const dv = valor.slice(-1);
    if (!/^[0-9]+$/.test(cuerpo)) return false;

    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resto = 11 - (suma % 11);
    const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
    return dv === dvEsperado;
}

export function esCorreoPermitido(correo) {
    const valor = (correo || "").trim().toLowerCase();
    return valor.endsWith("@duoc.cl") || valor.endsWith("@profesor.duoc.cl") || valor.endsWith("@gmail.com");
}

export function validarCorreo(correo) {
    const valor = (correo || "").trim().toLowerCase();
    if (valor === "") return { valido: false, mensaje: "El correo es obligatorio." };
    if (valor.length > 100) return { valido: false, mensaje: "Máximo 100 caracteres." };
    if (!esCorreoPermitido(valor)) return { valido: false, mensaje: "Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com" };
    return { valido: true, mensaje: "✓ Correo válido" };
}

export function validarPassword(password) {
    const valor = password || "";
    if (valor === "") return { valido: false, mensaje: "La contraseña es obligatoria." };
    if (valor.length < 4 || valor.length > 10) {
        return { valido: false, mensaje: "Debe tener entre 4 y 10 caracteres (llevas " + valor.length + ")." };
    }
    return { valido: true, mensaje: "✓ Contraseña válida" };
}

export function esStockCritico(stock, stockCritico) {
    if (stock === "" || stockCritico === "") return false;
    return Number(stock) <= Number(stockCritico);
}

export function validarRutCampo(rut) {
    const valor = (rut || "").trim();
    if (valor === "") return { valido: false, mensaje: "El RUT es obligatorio." };
    if (!validarRut(valor)) return { valido: false, mensaje: "RUT inválido. Ejemplo: 19011022-2" };
    return { valido: true, mensaje: "✔ RUT válido" };
}

export function validarNombre(nombre, maximo = 100) {
    const valor = (nombre || "").trim();
    if (valor === "") return { valido: false, mensaje: "El nombre es obligatorio." };
    if (valor.length > maximo) return { valido: false, mensaje: "Máximo " + maximo + " caracteres." };
    return { valido: true, mensaje: "✔ Nombre válido" };
}

export function validarObligatorio(valor, etiqueta) {
    if (String(valor || "").trim() === "") return { valido: false, mensaje: etiqueta + " es obligatorio." };
    return { valido: true, mensaje: "" };
}

export function validarConfirmacion(password, confirmacion) {
    if ((confirmacion || "") === "") return { valido: false, mensaje: "Debes confirmar la contraseña." };
    if (password !== confirmacion) return { valido: false, mensaje: "Las contraseñas no coinciden." };
    return { valido: true, mensaje: "✔ Las contraseñas coinciden" };
}
