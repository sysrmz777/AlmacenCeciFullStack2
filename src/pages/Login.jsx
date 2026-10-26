import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { autenticarUsuario, guardarSesion, obtenerUsuarios } from "../data/usuarios.js";
import { validarCorreo, validarPassword } from "../utils/validaciones.js";

// Login
export default function Login() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [intentado, setIntentado] = useState(false);
    const navegar = useNavigate();
    const { mostrar } = useToast();

    const resCorreo = validarCorreo(correo);
    const resPassword = validarPassword(password);

    function enviar(e) {
        e.preventDefault();
        setIntentado(true);
        if (!resCorreo.valido || !resPassword.valido) {
            mostrar("Corrige los errores antes de ingresar.", "danger");
            return;
        }
        const auth = autenticarUsuario(correo, password);
        if (!auth.ok) {
            mostrar(auth.mensaje, "danger");
            return;
        }
        mostrar("¡Inicio de sesión exitoso! Bienvenido " + auth.usuario.nombre + ".");
        if (auth.usuario.tipo === 1 || auth.usuario.tipo === 2) {
            navegar("/admin");
        } else {
            navegar("/");
        }
    }

    function accesoRapido(tipoBuscado, rutaDestino) {
        const lista = obtenerUsuarios();
        const usuarioDemo = lista.find((u) => u.tipo === tipoBuscado) || lista[0];
        guardarSesion(usuarioDemo);
        mostrar("Sesión iniciada como " + usuarioDemo.nombre + ".");
        navegar(rutaDestino);
    }

    return (
        <div>
            <div className="card p-4 mx-auto" style={{ maxWidth: "500px", borderTop: "5px solid #2e7d32" }}>
                <h2 className="text-center texto-cecilia">Iniciar Sesión</h2>
                <p className="text-center text-muted">Ingresa a tu cuenta para continuar</p>
                <form onSubmit={enviar}>
                    <CampoFormulario
                        id="correo" etiqueta="Correo Electrónico:" valor={correo} onCambio={setCorreo}
                        maxLength={100} placeholder="alvaro.ramirez@duoc.cl o benja.mora@gmail.com"
                        mensaje={correo !== "" || intentado ? resCorreo.mensaje : ""} esValido={resCorreo.valido}
                    />
                    <CampoFormulario
                        id="password" etiqueta="Contraseña (4 a 10 caracteres):" tipo="password" valor={password} onCambio={setPassword}
                        maxLength={10} placeholder="admin o 1234"
                        mensaje={password !== "" || intentado ? resPassword.mensaje : ""} esValido={resPassword.valido}
                    />
                    <button type="submit" className="btn btn-cecilia w-100">Ingresar</button>
                    <p className="text-center mt-3 mb-0">¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
                </form>
            </div>

            <div className="card mt-3 mx-auto text-center bg-info" style={{ maxWidth: "500px" }}>
                <div className="card-body">
                    <h5 className="card-title">Acceso directo</h5>
                    <p className="small mb-2">Credenciales demo: <strong>alvaro.ramirez@duoc.cl</strong> / clave: <strong>admin</strong></p>
                    <button type="button" className="btn btn-danger btn-sm me-2" onClick={() => accesoRapido(3, "/productos")}>
                        <strong>ENTRAR COMO CLIENTE</strong>
                    </button>
                    <button type="button" className="btn btn-dark btn-sm" onClick={() => accesoRapido(1, "/admin")}>
                        <strong>ENTRAR COMO ADMINISTRADOR</strong>
                    </button>
                </div>
            </div>
        </div>
    );
}
