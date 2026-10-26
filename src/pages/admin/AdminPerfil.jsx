import { useState } from "react";
import CampoFormulario from "../../components/CampoFormulario.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { guardarSesion, guardarUsuarios, obtenerSesion, obtenerUsuarios, tiposUsuario } from "../../data/usuarios.js";
import { validarCorreo, validarNombre } from "../../utils/validaciones.js";

// Admin Perfil
export default function AdminPerfil() {
    const { mostrar } = useToast();
    const sesionInicial = obtenerSesion() || {
        id: 10001,
        run: "19011029K",
        nombre: "Alvaro Ramirez",
        correo: "alvaro.ramirez@duoc.cl",
        telefono: "+56 9 9111 2222",
        tipo: 1
    };

    const [nombre, setNombre] = useState(sesionInicial.nombre);
    const [correo, setCorreo] = useState(sesionInicial.correo);
    const [telefono, setTelefono] = useState(sesionInicial.telefono || "");

    const resNombre = validarNombre(nombre);
    const resCorreo = validarCorreo(correo);

    function actualizarPerfil(e) {
        e.preventDefault();
        if (!resNombre.valido || !resCorreo.valido) {
            mostrar("Revisa el nombre y el correo antes de guardar.", "danger");
            return;
        }
        const actualizado = {
            ...sesionInicial,
            nombre: nombre.trim(),
            correo: correo.trim().toLowerCase(),
            telefono: telefono.trim()
        };
        guardarSesion(actualizado);
        const lista = obtenerUsuarios().map((u) => (u.id === actualizado.id ? { ...u, ...actualizado } : u));
        guardarUsuarios(lista);
        mostrar("Perfil actualizado correctamente.");
    }

    return (
        <div className="row g-4">
            <div className="col-12 col-lg-5">
                <div className="card p-4 h-100">
                    <h2 className="h4 texto-cecilia mb-3">Ficha del Administrador</h2>
                    <p className="mb-2"><strong>Nombre:</strong> {nombre}</p>
                    <p className="mb-2"><strong>RUN:</strong> {sesionInicial.run || "19011029K"}</p>
                    <p className="mb-2"><strong>Correo:</strong> {correo}</p>
                    <p className="mb-2"><strong>Teléfono:</strong> {telefono || "Sin teléfono registrado"}</p>
                    <p className="mb-0">
                        <strong>Rol en el sistema:</strong>{" "}
                        <span className="badge text-bg-success">{tiposUsuario[sesionInicial.tipo] || "Administrador"}</span>
                    </p>
                    <hr />
                    <p className="small text-muted mb-0">
                        Equipo de desarrollo Almacén Cecilia: Alvaro Ramirez y Fernando Reyes (Duoc UC - DSY1104).
                    </p>
                </div>
            </div>

            <div className="col-12 col-lg-7">
                <div className="card p-4">
                    <h3 className="h5 texto-cecilia mb-3">Editar Datos de la Cuenta</h3>
                    <form onSubmit={actualizarPerfil} noValidate>
                        <CampoFormulario
                            id="perfilNombre"
                            etiqueta="Nombre completo:"
                            valor={nombre}
                            onCambio={setNombre}
                            maxLength={100}
                            mensaje={resNombre.mensaje}
                            esValido={resNombre.valido}
                        />
                        <CampoFormulario
                            id="perfilCorreo"
                            etiqueta="Correo Electrónico:"
                            valor={correo}
                            onCambio={setCorreo}
                            maxLength={100}
                            mensaje={resCorreo.mensaje}
                            esValido={resCorreo.valido}
                        />
                        <CampoFormulario
                            id="perfilTelefono"
                            etiqueta="Teléfono de contacto:"
                            valor={telefono}
                            onCambio={setTelefono}
                            maxLength={30}
                            placeholder="+56 9 1234 5678"
                        />
                        <button type="submit" className="btn btn-cecilia">Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
