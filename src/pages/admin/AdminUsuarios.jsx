import { useEffect, useState } from "react";
import CampoFormulario from "../../components/CampoFormulario.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { guardarUsuarios, obtenerOrdenes, obtenerUsuarios, registrarNuevoUsuario, tiposUsuario } from "../../data/usuarios.js";
import { formatearPrecio } from "../../utils/productos.js";
import { validarCorreo, validarRutCampo } from "../../utils/validaciones.js";

// Admin Usuarios
export default function AdminUsuarios() {
    const { mostrar } = useToast();
    const [lista, setLista] = useState([]);
    const [ordenes, setOrdenes] = useState([]);
    const [tipo, setTipo] = useState("");
    const [run, setRun] = useState("");
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState("");
    const [historial, setHistorial] = useState(null);

    useEffect(() => {
        setLista(obtenerUsuarios());
        setOrdenes(obtenerOrdenes());
    }, []);

    function registrarUsuario(e) {
        e.preventDefault();
        const valRun = validarRutCampo(run);
        const valCorreo = validarCorreo(correo);
        if (!valRun.valido || !valCorreo.valido || nombre.trim() === "" || rol === "") {
            mostrar("Completa RUN, nombre, correo válido y rol.", "danger");
            return;
        }
        const res = registrarNuevoUsuario({
            run,
            nombre,
            correo,
            tipo: Number(rol)
        });
        if (!res.ok) {
            mostrar(res.mensaje, "danger");
            return;
        }
        setLista(res.lista);
        mostrar("Usuario registrado con éxito.");
        setRun("");
        setNombre("");
        setCorreo("");
        setRol("");
    }

    function eliminarUsuario(id) {
        const restantes = lista.filter((u) => u.id !== id);
        setLista(restantes);
        guardarUsuarios(restantes);
        mostrar("Usuario eliminado.", "warning");
    }

    const visibles = tipo === "" ? lista : lista.filter((u) => u.tipo === Number(tipo));
    const comprasUsuario = historial
        ? ordenes.filter((o) => o.correo.toLowerCase() === historial.correo.toLowerCase())
        : [];

    return (
        <>
            <h2 className="mb-3">Usuarios</h2>

            {historial && (
                <div className="card p-3 mb-4 border-success">
                    <h3 className="h5 texto-cecilia">Historial de Compras - {historial.nombre}</h3>
                    <p className="mb-2">RUN: {historial.run || "19011029K"} | Correo: {historial.correo}</p>
                    {comprasUsuario.length === 0 ? (
                        <p className="small text-muted mb-2">Este usuario aún no registra boletas asociadas a su correo.</p>
                    ) : (
                        <ul className="list-group list-group-flush mb-2 small">
                            {comprasUsuario.map((ord) => (
                                <li key={ord.id} className="list-group-item d-flex justify-content-between">
                                    <span>Boleta #{ord.id} ({ord.fecha}) - {ord.estado}</span>
                                    <strong>{formatearPrecio(ord.total)}</strong>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div>
                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setHistorial(null)}>
                            Cerrar historial
                        </button>
                    </div>
                </div>
            )}

            <div className="row g-4">
                <div className="col-12 col-lg-5">
                    <div className="card p-3">
                        <h3 className="h5">Nuevo Usuario</h3>
                        <form onSubmit={registrarUsuario}>
                            <CampoFormulario id="runUsu" etiqueta="RUN:" valor={run} onCambio={setRun} placeholder="19011029K" maxLength={9} />
                            <CampoFormulario id="nombreUsu" etiqueta="Nombre:" valor={nombre} onCambio={setNombre} maxLength={100} />
                            <CampoFormulario id="correoUsu" etiqueta="Correo Electrónico:" valor={correo} onCambio={setCorreo} placeholder="@duoc.cl o @gmail.com" />
                            <CampoFormulario id="rolUsu" etiqueta="Tipo de Usuario (Rol):" componente="select" valor={rol} onCambio={setRol}>
                                <option value="">Seleccione un Rol</option>
                                {Object.entries(tiposUsuario).map(([valor, texto]) => (
                                    <option key={valor} value={valor}>{texto}</option>
                                ))}
                            </CampoFormulario>
                            <button type="submit" className="btn btn-dark w-100">Registrar Usuario</button>
                        </form>
                    </div>
                </div>

                <div className="col-12 col-lg-7">
                    <div style={{ maxWidth: "300px" }}>
                        <CampoFormulario id="filtroTipo" etiqueta="Filtrar por tipo:" componente="select" valor={tipo} onCambio={setTipo}>
                            <option value="">Todos</option>
                            {Object.entries(tiposUsuario).map(([valor, texto]) => <option key={valor} value={valor}>{texto}</option>)}
                        </CampoFormulario>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped align-middle bg-white">
                            <thead>
                                <tr><th>RUN</th><th>Nombre</th><th>Correo</th><th>Tipo</th><th>Acciones</th></tr>
                            </thead>
                            <tbody>
                                {visibles.map((u) => (
                                    <tr key={u.id}>
                                        <td>{u.run || "19011029K"}</td>
                                        <td>{u.nombre}</td>
                                        <td>{u.correo}</td>
                                        <td><span className="badge text-bg-dark">{tiposUsuario[u.tipo]}</span></td>
                                        <td className="text-nowrap">
                                            <button type="button" className="btn btn-outline-primary btn-sm me-1" onClick={() => setHistorial(u)}>
                                                Historial
                                            </button>
                                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => eliminarUsuario(u.id)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
