import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { guardarSesion, registrarNuevoUsuario } from "../data/usuarios.js";
import { comunas, regiones } from "../data/zonas.js";
import { validarConfirmacion, validarCorreo, validarNombre, validarObligatorio, validarPassword, validarRutCampo } from "../utils/validaciones.js";

const vacio = { nombre: "", rut: "", correo: "", regionId: "", comunaId: "", password: "", confirmacion: "" };

// Registro
export default function Registro() {
    const [form, setForm] = useState(vacio);
    const [intentado, setIntentado] = useState(false);
    const navegar = useNavigate();
    const { mostrar } = useToast();

    const cambiar = (campo) => (valor) => setForm({ ...form, [campo]: valor });
    const cambiarRegion = (valor) => setForm({ ...form, regionId: valor, comunaId: "" });
    const comunasDeLaRegion = comunas.filter((c) => c.id_region === Number(form.regionId));

    const resultados = {
        nombre: validarNombre(form.nombre),
        rut: validarRutCampo(form.rut),
        correo: validarCorreo(form.correo),
        regionId: validarObligatorio(form.regionId, "La región"),
        comunaId: validarObligatorio(form.comunaId, "La comuna"),
        password: validarPassword(form.password),
        confirmacion: validarConfirmacion(form.password, form.confirmacion)
    };
    const mensaje = (campo) => (intentado || form[campo] !== "" ? resultados[campo].mensaje : "");

    function enviar(e) {
        e.preventDefault();
        setIntentado(true);
        if (!Object.values(resultados).every((r) => r.valido)) {
            mostrar("Corrige los errores antes de registrarte.", "danger");
            return;
        }
        const registro = registrarNuevoUsuario({
            nombre: form.nombre,
            rut: form.rut,
            correo: form.correo,
            password: form.password,
            regionId: form.regionId,
            comunaId: form.comunaId,
            tipo: 3
        });
        if (!registro.ok) {
            mostrar(registro.mensaje, "danger");
            return;
        }
        guardarSesion(registro.usuario);
        mostrar("¡Cuenta creada y sesión iniciada como " + registro.usuario.nombre + "!");
        navegar("/");
    }

    return (
        <div className="card p-4 mx-auto" style={{ maxWidth: "600px", borderTop: "5px solid #2e7d32" }}>
            <h2 className="text-center texto-cecilia">Crear Cuenta</h2>
            <form onSubmit={enviar} noValidate>
                <CampoFormulario id="nombre" etiqueta="Nombre completo:" valor={form.nombre} onCambio={cambiar("nombre")} maxLength={100} mensaje={mensaje("nombre")} esValido={resultados.nombre.valido} />
                <CampoFormulario id="rut" etiqueta="RUN (ej: 19011029-K):" valor={form.rut} onCambio={cambiar("rut")} placeholder="19011029-K" mensaje={mensaje("rut")} esValido={resultados.rut.valido} />
                <CampoFormulario id="correo" etiqueta="Correo Electrónico:" valor={form.correo} onCambio={cambiar("correo")} maxLength={100} placeholder="@gmail.com o @duoc.cl" mensaje={mensaje("correo")} esValido={resultados.correo.valido} />
                <div className="row">
                    <div className="col-12 col-md-6">
                        <CampoFormulario id="region" etiqueta="Región:" componente="select" valor={form.regionId} onCambio={cambiarRegion} mensaje={mensaje("regionId")} esValido={resultados.regionId.valido}>
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
                <CampoFormulario id="password" etiqueta="Contraseña (4 a 10 caracteres):" tipo="password" valor={form.password} onCambio={cambiar("password")} maxLength={10} mensaje={mensaje("password")} esValido={resultados.password.valido} />
                <CampoFormulario id="confirmacion" etiqueta="Confirmar contraseña:" tipo="password" valor={form.confirmacion} onCambio={cambiar("confirmacion")} maxLength={10} mensaje={mensaje("confirmacion")} esValido={resultados.confirmacion.valido} />
                <button type="submit" className="btn btn-cecilia w-100">Registrarme</button>
                <p className="text-center mt-3 mb-0">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
            </form>
        </div>
    );
}
