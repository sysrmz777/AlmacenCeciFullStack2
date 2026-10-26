import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario.jsx";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { obtenerSesion, registrarOrden } from "../data/usuarios.js";
import { comunas, regiones } from "../data/zonas.js";
import { formatearPrecio } from "../utils/productos.js";
import { validarCorreo, validarNombre, validarObligatorio } from "../utils/validaciones.js";

// Compra y Checkout
export default function Compra() {
    const { carrito, total, vaciar } = useCarrito();
    const { mostrar } = useToast();
    const navegar = useNavigate();
    const sesion = obtenerSesion();
    const [form, setForm] = useState({
        nombre: sesion ? sesion.nombre : "",
        correo: sesion ? sesion.correo : "",
        direccion: sesion && sesion.direccion ? sesion.direccion : "",
        regionId: sesion && sesion.region ? String(sesion.region) : "",
        comunaId: sesion && sesion.comuna ? String(sesion.comuna) : ""
    });
    const [intentado, setIntentado] = useState(false);

    if (carrito.length === 0) {
        return (
            <div className="text-center">
                <h2 className="texto-cecilia">No hay productos para pagar</h2>
                <Link to="/productos" className="btn btn-cecilia mt-3">Ir al catálogo</Link>
            </div>
        );
    }

    const cambiar = (campo) => (valor) => setForm({ ...form, [campo]: valor });
    const comunasDeLaRegion = comunas.filter((c) => c.id_region === Number(form.regionId));
    const resultados = {
        nombre: validarNombre(form.nombre),
        correo: validarCorreo(form.correo),
        direccion: validarObligatorio(form.direccion, "La dirección"),
        regionId: validarObligatorio(form.regionId, "La región"),
        comunaId: validarObligatorio(form.comunaId, "La comuna")
    };
    const mensaje = (campo) => (intentado || form[campo] !== "" ? resultados[campo].mensaje : "");

    function procesar(resultadoPago) {
        setIntentado(true);
        if (!Object.values(resultados).every((r) => r.valido)) {
            mostrar("Completa los datos de despacho antes de pagar.", "danger");
            return;
        }
        if (resultadoPago === "ok") {
            const comunaObj = comunas.find((c) => String(c.id) === String(form.comunaId));
            const unidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
            const numeroOrden = "AC-" + String(Date.now()).slice(-6);
            const ordenGuardada = registrarOrden({
                numero: numeroOrden,
                nombre: form.nombre,
                correo: form.correo,
                direccion: form.direccion,
                comuna: comunaObj ? comunaObj.nombre : "",
                unidades,
                total,
                estado: "Pagado",
                items: carrito
            });
            vaciar();
            navegar("/compra/ok", {
                state: {
                    numero: ordenGuardada.id,
                    total: ordenGuardada.total,
                    unidades: ordenGuardada.unidades,
                    correo: ordenGuardada.correo,
                    cliente: ordenGuardada.cliente,
                    direccion: ordenGuardada.direccion,
                    comuna: ordenGuardada.comuna,
                    items: ordenGuardada.items
                }
            });
        } else {
            navegar("/compra/error");
        }
    }

    return (
        <div className="row g-4">
            <div className="col-12 col-lg-7">
                <div className="card p-4" style={{ borderTop: "5px solid #2e7d32" }}>
                    <h2 className="texto-cecilia">Datos de despacho</h2>
                    <form onSubmit={(e) => { e.preventDefault(); procesar("ok"); }} noValidate>
                        <CampoFormulario id="nombre" etiqueta="Nombre completo:" valor={form.nombre} onCambio={cambiar("nombre")} maxLength={100} mensaje={mensaje("nombre")} esValido={resultados.nombre.valido} />
                        <CampoFormulario id="correo" etiqueta="Correo Electrónico:" valor={form.correo} onCambio={cambiar("correo")} maxLength={100} mensaje={mensaje("correo")} esValido={resultados.correo.valido} />
                        <CampoFormulario id="direccion" etiqueta="Dirección:" valor={form.direccion} onCambio={cambiar("direccion")} maxLength={150} mensaje={mensaje("direccion")} esValido={resultados.direccion.valido} />
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <CampoFormulario id="region" etiqueta="Región:" componente="select" valor={form.regionId} onCambio={(v) => setForm({ ...form, regionId: v, comunaId: "" })} mensaje={mensaje("regionId")} esValido={resultados.regionId.valido}>
                                    <option value="">Seleccione</option>
                                    {regiones.map((r) => <option key={r.id} value={r.id}>{r.nombre}</option>)}
                                </CampoFormulario>
                            </div>
                            <div className="col-12 col-md-6">
                                <CampoFormulario id="comuna" etiqueta="Comuna:" componente="select" valor={form.comunaId} onCambio={cambiar("comunaId")} disabled={form.regionId === ""} mensaje={mensaje("comunaId")} esValido={resultados.comunaId.valido}>
                                    <option value="">Seleccione</option>
                                    {comunasDeLaRegion.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                                </CampoFormulario>
                            </div>
                        </div>
                        <div className="d-grid gap-2 d-sm-flex">
                            <button type="submit" className="btn btn-cecilia flex-fill">Pagar ahora</button>
                            <button type="button" className="btn btn-outline-danger flex-fill" onClick={() => procesar("error")}>Simular pago rechazado</button>
                        </div>
                        <p className="form-text mt-2 mb-0">La pasarela de pago es demostrativa y registra la boleta en el sistema.</p>
                    </form>
                </div>
            </div>
            <div className="col-12 col-lg-5">
                <div className="card p-4">
                    <h2 className="h4 texto-cecilia">Resumen del pedido</h2>
                    <ul className="list-group list-group-flush mb-3">
                        {carrito.map((item) => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between">
                                <span>{item.nombre} x {item.cantidad}</span>
                                <span>{formatearPrecio(item.precio * item.cantidad)}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="h5 text-end texto-cecilia mb-0">Total: {formatearPrecio(total)}</p>
                </div>
            </div>
        </div>
    );
}
