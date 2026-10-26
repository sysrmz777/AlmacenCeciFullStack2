import { useState } from "react";
import CampoFormulario from "../components/CampoFormulario.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { validarCorreo, validarNombre, validarRutCampo } from "../utils/validaciones.js";

const vacio = { nombre: "", rut: "", correo: "", mensaje: "" };

export default function Contacto() {
    const [form, setForm] = useState(vacio);
    const [intentado, setIntentado] = useState(false);
    const { mostrar } = useToast();

    const cambiar = (campo) => (valor) => setForm({ ...form, [campo]: valor });
    const resNombre = validarNombre(form.nombre);
    const resRut = validarRutCampo(form.rut);
    const resCorreo = validarCorreo(form.correo);
    const visible = (campo) => intentado || form[campo] !== "";

    function enviar() {
        setIntentado(true);
        if (!resNombre.valido || !resRut.valido || !resCorreo.valido) {
            mostrar("Revisa los campos marcados antes de enviar.", "danger");
            return;
        }
        mostrar("¡Mensaje enviado! Te responderemos a la brevedad.");
        setForm(vacio);
        setIntentado(false);
    }

    function limpiar() {
        setForm(vacio);
        setIntentado(false);
    }

    return (
        <div className="card p-4 mx-auto" style={{ maxWidth: "600px", borderTop: "5px solid #2e7d32" }}>
            <h2 className="text-center texto-cecilia">Formulario de Contacto</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <CampoFormulario id="nombre" etiqueta="Nombre (Max 100):" valor={form.nombre} onCambio={cambiar("nombre")} maxLength={100}
                    mensaje={visible("nombre") ? resNombre.mensaje : ""} esValido={resNombre.valido} />
                <CampoFormulario id="rut" etiqueta="RUT (ej: 12345678-K):" valor={form.rut} onCambio={cambiar("rut")} placeholder="12345678-K"
                    mensaje={visible("rut") ? resRut.mensaje : ""} esValido={resRut.valido} />
                <CampoFormulario id="correo" etiqueta="Correo Electrónico:" valor={form.correo} onCambio={cambiar("correo")} maxLength={100} placeholder="@gmail.com o @duoc.cl"
                    mensaje={visible("correo") ? resCorreo.mensaje : ""} esValido={resCorreo.valido} />
                <CampoFormulario id="mensaje" etiqueta="Mensaje (Max 500):" valor={form.mensaje} onCambio={cambiar("mensaje")} componente="textarea" rows={4} maxLength={500} />
                <div className="d-grid gap-2 d-sm-flex">
                    <button type="button" className="btn btn-cecilia flex-fill" onClick={enviar}>Enviar Mensaje</button>
                    <button type="button" className="btn btn-outline-secondary flex-fill" onClick={limpiar}>Limpiar</button>
                </div>
            </form>
        </div>
    );
}
