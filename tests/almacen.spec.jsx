import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import App from "../src/App.jsx";
import Acordeon from "../src/components/Acordeon.jsx";
import AdminNavbar from "../src/components/AdminNavbar.jsx";
import CampoFormulario from "../src/components/CampoFormulario.jsx";
import Carrusel from "../src/components/Carrusel.jsx";
import Footer from "../src/components/Footer.jsx";
import ItemCarrito from "../src/components/ItemCarrito.jsx";
import Layout from "../src/components/Layout.jsx";
import LayoutAdmin from "../src/components/LayoutAdmin.jsx";
import MenuCategorias from "../src/components/MenuCategorias.jsx";
import Migas from "../src/components/Migas.jsx";
import Modal from "../src/components/Modal.jsx";
import Navbar from "../src/components/Navbar.jsx";
import ProductoCard from "../src/components/ProductoCard.jsx";
import { CarritoProvider, useCarrito } from "../src/context/CarritoContext.jsx";
import { ProductosProvider, useProductos } from "../src/context/ProductosContext.jsx";
import { ToastProvider } from "../src/context/ToastContext.jsx";
import { autenticarUsuario, guardarSesion, obtenerOrdenes, obtenerSesion, obtenerUsuarios, registrarNuevoUsuario, registrarOrden } from "../src/data/usuarios.js";
import Blog from "../src/pages/Blog.jsx";
import Carrito from "../src/pages/Carrito.jsx";
import Categorias from "../src/pages/Categorias.jsx";
import Compra from "../src/pages/Compra.jsx";
import CompraResultado from "../src/pages/CompraResultado.jsx";
import Contacto from "../src/pages/Contacto.jsx";
import DetalleProducto from "../src/pages/DetalleProducto.jsx";
import Home from "../src/pages/Home.jsx";
import Login from "../src/pages/Login.jsx";
import NoEncontrada from "../src/pages/NoEncontrada.jsx";
import Nosotros from "../src/pages/Nosotros.jsx";
import Ofertas from "../src/pages/Ofertas.jsx";
import Productos from "../src/pages/Productos.jsx";
import Registro from "../src/pages/Registro.jsx";
import AdminCategorias from "../src/pages/admin/AdminCategorias.jsx";
import AdminDashboard from "../src/pages/admin/AdminDashboard.jsx";
import AdminOrdenes from "../src/pages/admin/AdminOrdenes.jsx";
import AdminPerfil from "../src/pages/admin/AdminPerfil.jsx";
import AdminProductoForm from "../src/pages/admin/AdminProductoForm.jsx";
import AdminProductos from "../src/pages/admin/AdminProductos.jsx";
import AdminReportes from "../src/pages/admin/AdminReportes.jsx";
import AdminUsuarios from "../src/pages/admin/AdminUsuarios.jsx";
import { agregarProducto, calcularTotal, cambiarCantidadItem, contarUnidades, eliminarItem } from "../src/utils/carrito.js";
import { contarPorCategoria, estadoStock, filtrarProductos, obtenerCategorias, obtenerOfertas, obtenerRelacionados, porcentajeDescuento, siguienteId, validarProducto } from "../src/utils/productos.js";
import { esStockCritico, validarConfirmacion, validarCorreo, validarNombre, validarObligatorio, validarPassword, validarRut, validarRutCampo } from "../src/utils/validaciones.js";

function cambiarValorInput(elemento, valor) {
    const proto = elemento.tagName === "SELECT"
        ? window.HTMLSelectElement.prototype
        : elemento.tagName === "TEXTAREA"
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(proto, "value");
    descriptor.set.call(elemento, valor);
    elemento.dispatchEvent(new Event("input", { bubbles: true }));
    elemento.dispatchEvent(new Event("change", { bubbles: true }));
}

function EnvoltorioApp({ rutaInicial = "/", children }) {
    return (
        <MemoryRouter key={rutaInicial} initialEntries={[rutaInicial]}>
            <ToastProvider>
                <ProductosProvider>
                    <CarritoProvider>
                        {children}
                    </CarritoProvider>
                </ProductosProvider>
            </ToastProvider>
        </MemoryRouter>
    );
}

// Pruebas Unitarias Almacen Cecilia
describe("Almacén Cecilia - Pruebas Unitarias (Jasmine + Karma)", function() {
    let contenedor;
    let root;

    beforeEach(function() {
        globalThis.IS_REACT_ACT_ENVIRONMENT = true;
        localStorage.clear();
        contenedor = document.createElement("div");
        document.body.appendChild(contenedor);
        root = createRoot(contenedor);
    });

    afterEach(function() {
        act(function() {
            root.unmount();
        });
        contenedor.remove();
        localStorage.clear();
    });

    // 1. Renderizado correcto de listas y componentes base
    it("1. Renderizado de listas: Migas, Acordeon, Carrusel, MenuCategorias y Footer renderizan sus elementos en el DOM", function() {
        const itemsMigas = [
            { texto: "Home", a: "/" },
            { texto: "Productos", a: "/productos" },
            { texto: "Criollitas" }
        ];
        const preguntas = [
            { titulo: "¿Hacen despacho?", contenido: "Sí, en todo el barrio." },
            { titulo: "¿Horario?", contenido: "Lunes a sábado." }
        ];
        const slides = [
            { titulo: "Slide 1", texto: "Texto 1", boton: "Ir 1", enlace: "/productos", fondo: "bg-cecilia" },
            { titulo: "Slide 2", texto: "Texto 2", boton: "Ir 2", enlace: "/ofertas", fondo: "bg-dark" }
        ];

        act(function() {
            root.render(
                <MemoryRouter>
                    <Migas items={itemsMigas} />
                    <Acordeon items={preguntas} />
                    <Carrusel items={slides} />
                    <MenuCategorias abierto={true} onCerrar={function() {}} categorias={["Abarrotes", "Bebidas"]} />
                    <Footer />
                </MemoryRouter>
            );
        });

        expect(contenedor.querySelectorAll(".breadcrumb-item").length).toBe(3);
        expect(contenedor.querySelectorAll(".accordion-item").length).toBe(2);
        expect(contenedor.querySelectorAll(".carousel-item").length).toBe(2);

        act(function() {
            contenedor.querySelector(".carousel-control-next").click();
            contenedor.querySelector(".carousel-control-prev").click();
        });

        expect(contenedor.querySelector("footer")).not.toBeNull();
    });

    // 2. Renderizado condicional en CampoFormulario y Modal
    it("2. Renderizado condicional: CampoFormulario y Modal muestran u ocultan elementos según sus props", function() {
        const onCambioSpy = jasmine.createSpy("onCambio");
        const onCerrarSpy = jasmine.createSpy("onCerrar");

        act(function() {
            root.render(
                <div>
                    <CampoFormulario id="correo" etiqueta="Correo:" valor="" onCambio={onCambioSpy} mensaje="" esValido={false} />
                    <Modal abierto={false} titulo="Confirmar" onCerrar={onCerrarSpy}>Contenido oculto</Modal>
                </div>
            );
        });

        expect(contenedor.querySelector(".form-text")).toBeNull();
        expect(contenedor.querySelector(".modal")).toBeNull();

        act(function() {
            root.render(
                <div>
                    <CampoFormulario id="correo" etiqueta="Correo:" valor="invalido" onCambio={onCambioSpy} mensaje="El correo es obligatorio." esValido={false} />
                    <Modal abierto={true} titulo="Confirmar" onCerrar={onCerrarSpy} pie={<span>Pie</span>}>Contenido visible</Modal>
                </div>
            );
        });

        const textoError = contenedor.querySelector(".form-text");
        expect(textoError.textContent).toBe("El correo es obligatorio.");
        expect(contenedor.querySelector(".modal")).not.toBeNull();

        act(function() {
            cambiarValorInput(contenedor.querySelector("#correo"), "nuevo@duoc.cl");
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
        });
        expect(onCambioSpy).toHaveBeenCalledWith("nuevo@duoc.cl");
        expect(onCerrarSpy).toHaveBeenCalled();
    });

    // 3. Propiedades (props) recibidas en ProductoCard
    it("3. Propiedades (props): ProductoCard muestra nombre, precio formateado, descuento, stock crítico y ejecuta onAgregar", function() {
        const productoPrueba = {
            id: 1,
            codigo: "ABA001",
            nombre: "Criollitas",
            categoria: "Abarrotes",
            precio: 1300,
            precioAnterior: 1500,
            stock: 5,
            stockCritico: 10,
            imagen: "/Imagen/Criollitas.jpg"
        };
        const onAgregarSpy = jasmine.createSpy("onAgregar");

        act(function() {
            root.render(
                <MemoryRouter>
                    <ProductoCard producto={productoPrueba} onAgregar={onAgregarSpy} />
                </MemoryRouter>
            );
        });

        expect(contenedor.querySelector(".card-title").textContent).toBe("Criollitas");
        expect(contenedor.textContent).toContain("-13%");
        expect(contenedor.textContent).toContain("¡Quedan pocas unidades!");

        act(function() {
            contenedor.querySelector("button").click();
        });
        expect(onAgregarSpy).toHaveBeenCalledWith(productoPrueba);
    });

    // 4. Gestión de estado (state) en Acordeon, Blog y Contacto
    it("4. Gestión de estado (state): Acordeon, Blog y Contacto actualizan su estado al interactuar con el DOM", function() {
        act(function() {
            root.render(
                <EnvoltorioApp>
                    <Blog />
                    <Contacto />
                </EnvoltorioApp>
            );
        });

        const btnDetalleBlog = contenedor.querySelector(".card-producto button");
        act(function() {
            btnDetalleBlog.click();
        });
        expect(contenedor.textContent).toContain("Cerrar detalle");

        act(function() {
            cambiarValorInput(contenedor.querySelector("#nombre"), "Alvaro Ramirez");
            cambiarValorInput(contenedor.querySelector("#rut"), "19011029-K");
            cambiarValorInput(contenedor.querySelector("#correo"), "alvaro@duoc.cl");
            cambiarValorInput(contenedor.querySelector("#mensaje"), "Consulta de precios");
        });

        const botonesContacto = contenedor.querySelectorAll("form button");
        act(function() {
            botonesContacto[0].click();
            botonesContacto[1].click();
        });
        expect(contenedor.querySelector("#nombre").value).toBe("");
    });

    // 5. Simulación de eventos en ItemCarrito y vista Carrito
    it("5. Simulación de eventos: ItemCarrito y Carrito disparan eventos de incremento, disminución y modal de vaciado", function() {
        localStorage.setItem("carrito", JSON.stringify([{ id: 1, nombre: "Criollitas", precio: 1300, stock: 10, cantidad: 2 }]));

        act(function() {
            root.render(
                <EnvoltorioApp rutaInicial="/carrito">
                    <Carrito />
                </EnvoltorioApp>
            );
        });

        expect(contenedor.textContent).toContain("Criollitas");
        const btnMas = contenedor.querySelector('button[aria-label="Agregar una unidad de Criollitas"]');
        act(function() {
            btnMas.click();
        });
        expect(contenedor.querySelector('[data-testid="cantidad"]').textContent).toBe("3");

        const botonesAccion = contenedor.querySelectorAll(".d-sm-flex button");
        act(function() {
            botonesAccion[1].click();
        });
        expect(contenedor.querySelector(".modal")).not.toBeNull();

        act(function() {
            contenedor.querySelector(".modal-footer .btn-danger").click();
        });
        expect(contenedor.textContent).toContain("Tu carrito está vacío.");
    });

    // 6. Validación de RUT chileno (src/utils/validaciones.js)
    it("6. Validación RUT (Módulo 11): valida RUTs correctos y rechaza RUTs incorrectos", function() {
        expect(validarRut("19.011.029-K")).toBeTrue();
        expect(validarRut("19011022-2")).toBeTrue();
        expect(validarRut("11111111-1")).toBeTrue();
        expect(validarRut("19011029-0")).toBeFalse();
        expect(validarRut("abc")).toBeFalse();
        expect(validarRutCampo("19011029-K").valido).toBeTrue();
        expect(validarRutCampo("").valido).toBeFalse();
        expect(validarRutCampo("19011029-0").valido).toBeFalse();
    });

    // 7. Validación de correo, contraseña y campos obligatorios (src/utils/validaciones.js)
    it("7. Validación de correo y password: valida dominios permitidos y longitud de contraseña", function() {
        expect(validarCorreo("alumno@duoc.cl").valido).toBeTrue();
        expect(validarCorreo("profe@profesor.duoc.cl").valido).toBeTrue();
        expect(validarCorreo("vecino@gmail.com").valido).toBeTrue();
        expect(validarCorreo("usuario@hotmail.com").valido).toBeFalse();
        expect(validarCorreo("").valido).toBeFalse();

        expect(validarPassword("1234").valido).toBeTrue();
        expect(validarPassword("").valido).toBeFalse();
        expect(validarPassword("12").valido).toBeFalse();
        expect(validarConfirmacion("1234", "1234").valido).toBeTrue();
        expect(validarConfirmacion("1234", "").valido).toBeFalse();
        expect(validarConfirmacion("1234", "9999").valido).toBeFalse();
        expect(validarNombre("Alvaro").valido).toBeTrue();
        expect(validarNombre("").valido).toBeFalse();
        expect(validarObligatorio("Santiago", "Comuna").valido).toBeTrue();
        expect(validarObligatorio("", "Comuna").valido).toBeFalse();
    });

    // 8. Lógica real del carrito y vistas de Tienda (Home, Productos, Categorias, Ofertas, DetalleProducto)
    it("8. Catálogo y Carrito: filtra productos, renderiza Home, Productos, Categorias, Ofertas y DetalleProducto", function() {
        const criollitas = { id: 1, nombre: "Criollitas", precio: 1300, stock: 2 };
        let carrito = [];
        carrito = agregarProducto(carrito, criollitas, 5);
        expect(carrito[0].cantidad).toBe(2);
        expect(contarUnidades(carrito)).toBe(2);
        expect(calcularTotal(carrito)).toBe(2600);
        carrito = cambiarCantidadItem(carrito, 1, -1);
        expect(carrito[0].cantidad).toBe(1);
        carrito = eliminarItem(carrito, 1);
        expect(carrito.length).toBe(0);

        act(function() {
            root.render(
                <EnvoltorioApp rutaInicial="/productos/1">
                    <App />
                    <Home />
                    <Productos />
                    <Categorias />
                    <Ofertas />
                    <Nosotros />
                    <NoEncontrada />
                    <Routes>
                        <Route path="/productos/:id" element={<DetalleProducto />} />
                    </Routes>
                </EnvoltorioApp>
            );
        });

        act(function() {
            const btnToggler = contenedor.querySelector(".navbar-toggler");
            if (btnToggler) btnToggler.click();
            const btnCatNav = contenedor.querySelector(".nav-item button");
            if (btnCatNav) btnCatNav.click();
        });

        expect(contenedor.textContent).toContain("Bienvenidos a Almacén Cecilia");
        expect(contenedor.textContent).toContain("Nuestros Productos");
        expect(contenedor.textContent).toContain("Nuestra Historia");
        expect(contenedor.querySelector('[data-testid="cantidad"]').textContent).toBe("1");
    });

    // 9. Autenticación real, Registro de usuario, Checkout de Compra y generación de Orden/Boleta
    it("9. Flujo de Autenticación, Registro y Compra: crea usuario, inicia sesión, procesa compra y guarda boleta en Órdenes", function() {
        act(function() {
            root.render(
                <EnvoltorioApp rutaInicial="/registro">
                    <Registro />
                </EnvoltorioApp>
            );
        });

        act(function() {
            cambiarValorInput(contenedor.querySelector("#nombre"), "Vecino Nuevo");
            cambiarValorInput(contenedor.querySelector("#rut"), "19011029-K");
            cambiarValorInput(contenedor.querySelector("#correo"), "vecino.nuevo@duoc.cl");
            cambiarValorInput(contenedor.querySelector("#region"), "1000");
        });
        act(function() {
            cambiarValorInput(contenedor.querySelector("#comuna"), "1018");
            cambiarValorInput(contenedor.querySelector("#password"), "clave123");
            cambiarValorInput(contenedor.querySelector("#confirmacion"), "clave123");
        });
        act(function() {
            contenedor.querySelector("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        });

        expect(obtenerSesion().correo).toBe("vecino.nuevo@duoc.cl");
        expect(obtenerUsuarios().some((u) => u.correo === "vecino.nuevo@duoc.cl")).toBeTrue();

        guardarSesion(null);
        act(function() {
            root.render(
                <EnvoltorioApp rutaInicial="/login">
                    <Login />
                </EnvoltorioApp>
            );
        });

        act(function() {
            cambiarValorInput(contenedor.querySelector("#correo"), "vecino.nuevo@duoc.cl");
            cambiarValorInput(contenedor.querySelector("#password"), "incorrecta");
            contenedor.querySelector("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        });
        expect(obtenerSesion()).toBeNull();

        act(function() {
            cambiarValorInput(contenedor.querySelector("#password"), "clave123");
            contenedor.querySelector("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        });
        expect(obtenerSesion().correo).toBe("vecino.nuevo@duoc.cl");

        localStorage.setItem("carrito", JSON.stringify([{ id: 1, nombre: "Criollitas", precio: 1300, cantidad: 2 }]));

        act(function() {
            root.render(
                <EnvoltorioApp rutaInicial="/compra">
                    <Routes>
                        <Route path="/compra" element={<Compra />} />
                        <Route path="/compra/:estado" element={<CompraResultado />} />
                    </Routes>
                </EnvoltorioApp>
            );
        });

        act(function() {
            cambiarValorInput(contenedor.querySelector("#direccion"), "Av. Pajaritos 456");
            cambiarValorInput(contenedor.querySelector("#region"), "1000");
        });
        act(function() {
            cambiarValorInput(contenedor.querySelector("#comuna"), "1018");
        });
        act(function() {
            contenedor.querySelector("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        });

        expect(contenedor.textContent).toContain("¡Compra realizada con éxito!");
        expect(obtenerOrdenes()[0].correo).toBe("vecino.nuevo@duoc.cl");
        expect(obtenerOrdenes()[0].total).toBe(2600);
    });

    // 10. Mock de LocalStorage con Storage.prototype y Panel Administrador protegido
    it("10. Mock LocalStorage y Panel Admin: protege /admin sin sesión, permite acceso a Administrador y opera módulos Admin", function() {
        const setItemSpy = spyOn(Storage.prototype, "setItem").and.callThrough();
        const getItemSpy = spyOn(Storage.prototype, "getItem").and.callThrough();

        guardarSesion(null);
        act(function() {
            root.render(
                <EnvoltorioApp rutaInicial="/admin">
                    <LayoutAdmin />
                </EnvoltorioApp>
            );
        });

        expect(contenedor.textContent).toContain("Acceso restringido al Panel Administrador");

        act(function() {
            contenedor.querySelector("button.btn-dark").click();
        });
        expect(obtenerSesion().tipo).toBe(1);

        act(function() {
            root.render(
                <EnvoltorioApp rutaInicial="/admin/productos/nuevo">
                    <AdminDashboard />
                    <AdminProductos />
                    <AdminProductoForm />
                    <AdminCategorias />
                    <AdminOrdenes />
                    <AdminUsuarios />
                    <AdminReportes />
                    <AdminPerfil />
                </EnvoltorioApp>
            );
        });

        act(function() {
            cambiarValorInput(contenedor.querySelector("#codigo"), "LAC001");
            cambiarValorInput(contenedor.querySelector("#nombreProd"), "Leche Entera 1L");
            cambiarValorInput(contenedor.querySelector("#desc"), "Leche fresca");
            cambiarValorInput(contenedor.querySelector("#precio"), "1200");
            cambiarValorInput(contenedor.querySelector("#precioAnterior"), "1400");
            cambiarValorInput(contenedor.querySelector("#cat"), "Abarrotes");
            cambiarValorInput(contenedor.querySelector("#stock"), "5");
            cambiarValorInput(contenedor.querySelector("#stockCritico"), "10");
            contenedor.querySelector("#codigo").closest("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        });

        act(function() {
            cambiarValorInput(contenedor.querySelector("#nuevaCategoria"), "Lacteos");
            contenedor.querySelector("#nuevaCategoria").closest("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        });

        act(function() {
            const btnVerBoleta = Array.from(contenedor.querySelectorAll("button")).find((b) => b.textContent.includes("Mostrar Boleta"));
            if (btnVerBoleta) btnVerBoleta.click();
        });
        act(function() {
            const btnEnviado = Array.from(contenedor.querySelectorAll("button")).find((b) => b.textContent.includes("Marcar Enviado"));
            if (btnEnviado) btnEnviado.click();
            const btnCerrarBoleta = Array.from(contenedor.querySelectorAll("button")).find((b) => b.textContent.includes("Cerrar Boleta"));
            if (btnCerrarBoleta) btnCerrarBoleta.click();
        });

        act(function() {
            const btnVerCat = Array.from(contenedor.querySelectorAll("button")).find((b) => b.textContent.includes("Ver detalle"));
            if (btnVerCat) btnVerCat.click();
            const btnHistorial = Array.from(contenedor.querySelectorAll("button")).find((b) => b.textContent.includes("Historial"));
            if (btnHistorial) btnHistorial.click();
            const btnEliminarProd = Array.from(contenedor.querySelectorAll("button")).find((b) => b.textContent === "Eliminar");
            if (btnEliminarProd) btnEliminarProd.click();
        });
        act(function() {
            const btnConfirmarModal = contenedor.querySelector(".modal-footer .btn-danger");
            if (btnConfirmarModal) btnConfirmarModal.click();
            const btnRestaurar = Array.from(contenedor.querySelectorAll("button")).find((b) => b.textContent.includes("Restaurar catálogo"));
            if (btnRestaurar) btnRestaurar.click();
        });

        act(function() {
            cambiarValorInput(contenedor.querySelector("#runUsu"), "19011022-2");
            cambiarValorInput(contenedor.querySelector("#nombreUsu"), "Vendedor Turno");
            cambiarValorInput(contenedor.querySelector("#correoUsu"), "vendedor.turno@duoc.cl");
            cambiarValorInput(contenedor.querySelector("#rolUsu"), "2");
            contenedor.querySelector("#runUsu").closest("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        });

        act(function() {
            cambiarValorInput(contenedor.querySelector("#perfilTelefono"), "+56 9 8888 7777");
            contenedor.querySelector("#perfilTelefono").closest("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        });

        expect(contenedor.textContent).toContain("Dashboard");
        expect(contenedor.textContent).toContain("Lacteos");
        expect(contenedor.textContent).toContain("Vendedor Turno");
        expect(contenedor.textContent).toContain("Órdenes y Boletas");
        expect(contenedor.textContent).toContain("Reportes del Sistema");
        expect(contenedor.textContent).toContain("Ficha del Administrador");
        expect(getItemSpy).toHaveBeenCalled();
        expect(setItemSpy).toHaveBeenCalled();
    });
});
