import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import LayoutAdmin from "./components/LayoutAdmin.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Ofertas from "./pages/Ofertas.jsx";
import Categorias from "./pages/Categorias.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Blog from "./pages/Blog.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Carrito from "./pages/Carrito.jsx";
import Compra from "./pages/Compra.jsx";
import CompraResultado from "./pages/CompraResultado.jsx";
import NoEncontrada from "./pages/NoEncontrada.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminOrdenes from "./pages/admin/AdminOrdenes.jsx";
import AdminProductos from "./pages/admin/AdminProductos.jsx";
import AdminProductoForm from "./pages/admin/AdminProductoForm.jsx";
import AdminCategorias from "./pages/admin/AdminCategorias.jsx";
import AdminUsuarios from "./pages/admin/AdminUsuarios.jsx";
import AdminReportes from "./pages/admin/AdminReportes.jsx";
import AdminPerfil from "./pages/admin/AdminPerfil.jsx";

// Rutas
export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/productos/:id" element={<DetalleProducto />} />
                <Route path="/ofertas" element={<Ofertas />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/compra" element={<Compra />} />
                <Route path="/compra/:estado" element={<CompraResultado />} />
                <Route path="*" element={<NoEncontrada />} />
            </Route>
            <Route element={<LayoutAdmin />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/ordenes" element={<AdminOrdenes />} />
                <Route path="/admin/productos" element={<AdminProductos />} />
                <Route path="/admin/productos/nuevo" element={<AdminProductoForm />} />
                <Route path="/admin/productos/:id/editar" element={<AdminProductoForm />} />
                <Route path="/admin/categorias" element={<AdminCategorias />} />
                <Route path="/admin/usuarios" element={<AdminUsuarios />} />
                <Route path="/admin/reportes" element={<AdminReportes />} />
                <Route path="/admin/perfil" element={<AdminPerfil />} />
            </Route>
        </Routes>
    );
}
