import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CampoFormulario from "../../components/CampoFormulario.jsx";
import { useProductos } from "../../context/ProductosContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { categoriasBase } from "../../data/productos.js";
import { validarProducto } from "../../utils/productos.js";
import { esStockCritico } from "../../utils/validaciones.js";

const vacio = { codigo: "", nombre: "", descripcion: "", precio: "", precioAnterior: "", categoria: "", stock: "", stockCritico: "" };

function aFormulario(p) {
    return {
        codigo: p.codigo, nombre: p.nombre, descripcion: p.descripcion, categoria: p.categoria,
        precio: String(p.precio), precioAnterior: p.precioAnterior ? String(p.precioAnterior) : "",
        stock: String(p.stock), stockCritico: p.stockCritico === undefined || p.stockCritico === null ? "" : String(p.stockCritico)
    };
}

export default function AdminProductoForm() {
    const { id } = useParams();
    const navegar = useNavigate();
    const { productos, obtener, crear, actualizar } = useProductos();
    const { mostrar } = useToast();
    const existente = id ? obtener(id) : null;
    const [form, setForm] = useState(() => (existente ? aFormulario(existente) : vacio));
    const [intentado, setIntentado] = useState(false);

    if (id && !existente) {
        return (
            <div className="text-center">
                <h2>Producto no encontrado</h2>
                <Link to="/admin/productos" className="btn btn-dark mt-3">Volver al listado</Link>
            </div>
        );
    }

    const errores = validarProducto(form, productos, existente ? existente.id : null);
    const cambiar = (campo) => (valor) => setForm({ ...form, [campo]: valor });
    const mensaje = (campo) => ((intentado || form[campo] !== "") && errores[campo] ? errores[campo] : "");
    const critico = esStockCritico(form.stock, form.stockCritico);

    function guardar(e) {
        e.preventDefault();
        setIntentado(true);
        if (Object.keys(errores).length > 0) {
            mostrar("Corrige los errores del formulario.", "danger");
            return;
        }
        const datos = {
            codigo: form.codigo.trim(),
            nombre: form.nombre.trim(),
            descripcion: form.descripcion.trim(),
            categoria: form.categoria,
            precio: Number(form.precio),
            precioAnterior: form.precioAnterior === "" ? null : Number(form.precioAnterior),
            stock: Number(form.stock),
            stockCritico: form.stockCritico === "" ? 0 : Number(form.stockCritico),
            imagen: existente ? existente.imagen : "/Imagen/sin-imagen.svg"
        };
        if (existente) actualizar({ ...datos, id: existente.id });
        else crear(datos);
        mostrar("Producto '" + datos.nombre + "' guardado correctamente.");
        navegar("/admin/productos");
    }

    return (
        <div className="card p-4 mx-auto" style={{ maxWidth: "700px", borderTop: "5px solid #333" }}>
            <h2 className="text-center">{existente ? "Editar Producto" : "Nuevo Producto"}</h2>
            <form onSubmit={guardar} noValidate>
                <CampoFormulario id="codigo" etiqueta="Código Producto (Mín 3 chars):" valor={form.codigo} onCambio={cambiar("codigo")} mensaje={mensaje("codigo")} esValido={false} />
                <CampoFormulario id="nombreProd" etiqueta="Nombre (Max 100):" valor={form.nombre} onCambio={cambiar("nombre")} maxLength={100} mensaje={mensaje("nombre")} esValido={false} />
                <CampoFormulario id="desc" etiqueta="Descripción (Max 500 - Opcional):" valor={form.descripcion} onCambio={cambiar("descripcion")} componente="textarea" rows={3} maxLength={500} mensaje={mensaje("descripcion")} esValido={false} />
                <div className="row">
                    <div className="col-12 col-md-6">
                        <CampoFormulario id="precio" etiqueta="Precio (Min 0):" tipo="number" valor={form.precio} onCambio={cambiar("precio")} min={0} step={1} mensaje={mensaje("precio")} esValido={false} />
                    </div>
                    <div className="col-12 col-md-6">
                        <CampoFormulario id="precioAnterior" etiqueta="Precio anterior (oferta, opcional):" tipo="number" valor={form.precioAnterior} onCambio={cambiar("precioAnterior")} min={0} step={1} mensaje={mensaje("precioAnterior")} esValido={false} />
                    </div>
                </div>
                <CampoFormulario id="cat" etiqueta="Categoría:" componente="select" valor={form.categoria} onCambio={cambiar("categoria")} mensaje={mensaje("categoria")} esValido={false}>
                    <option value="">Seleccione</option>
                    {categoriasBase.map((c) => <option key={c} value={c}>{c}</option>)}
                </CampoFormulario>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <CampoFormulario id="stock" etiqueta="Stock (Números Enteros):" tipo="number" valor={form.stock} onCambio={cambiar("stock")} min={0} step={1} mensaje={mensaje("stock")} esValido={false} />
                    </div>
                    <div className="col-12 col-md-6">
                        <CampoFormulario id="stockCritico" etiqueta="Stock Crítico (Opcional):" tipo="number" valor={form.stockCritico} onCambio={cambiar("stockCritico")} min={0} step={1} mensaje={mensaje("stockCritico")} esValido={false} />
                    </div>
                </div>
                {critico && <div className="alert alert-warning" role="alert">⚠ Alerta: el stock alcanzó el nivel crítico definido.</div>}
                <div className="d-grid gap-2 d-sm-flex">
                    <button type="submit" className="btn btn-dark flex-fill">Guardar Producto</button>
                    <Link to="/admin/productos" className="btn btn-outline-secondary flex-fill">Cancelar</Link>
                </div>
            </form>
        </div>
    );
}
