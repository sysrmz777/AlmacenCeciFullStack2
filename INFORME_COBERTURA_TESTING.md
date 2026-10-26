# Informe de Cobertura de Pruebas Unitarias (Jasmine + Karma)

**Proyecto:** Almacén Cecilia — Tienda Online en React  
**Asignatura:** Desarrollo Full Stack II (DSY1104) — Evaluación Parcial N° 2  
**Integrantes:** Alvaro Ramirez y Fernando Reyes  
**Herramientas utilizadas:** Jasmine 5.13, Karma 6.4, ChromeHeadless, Istanbul (`karma-coverage` con `includeAllSources: true`)  

---

## 1. Ejecución de las Pruebas

Para ejecutar la suite de pruebas unitarias sobre la totalidad del código fuente (`src/`) y generar el reporte interactivo en `coverage/html/index.html`, se utiliza el comando:

```bash
npm test
```
*(Equivalente a `karma start karma.conf.cjs --single-run`)*

La configuración de `karma.conf.cjs` pre-instrumenta la totalidad de los archivos dentro de `src/` (`src/components/`, `src/context/`, `src/data/`, `src/pages/`, `src/pages/admin/` y `src/utils/`) con `includeAllSources: true`, garantizando que el porcentaje refleje la cobertura real sobre las **772 sentencias** del proyecto completo.

---

## 2. Resumen de Resultados de Cobertura Real (`src/` Completo)

| Directorio / Módulo | % Statements | % Branch | % Funcs | % Lines | Estado |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Total Global (`src/` completo)** | **81.60% (630/772)** | **72.51% (380/524)** | **77.62% (229/295)** | **83.02% (543/654)** | **Aprobado (>80%)** |
| `src/App.jsx` (Enrutador principal) | 100% | 100% | 100% | 100% | Cubierto |
| `src/components/` (13 componentes React) | 88.65% | 76.92% | 83.01% | 90.00% | Cubierto |
| `src/context/` (`Carrito`, `Productos`, `Toast`) | 75.43% | 70.00% | 66.66% | 86.04% | Cubierto |
| `src/data/` (`productos`, `usuarios`, `zonas`) | 90.56% | 71.21% | 100% | 90.19% | Cubierto |
| `src/pages/` (14 vistas públicas y compra) | 74.77% | 71.42% | 67.90% | 74.27% | Cubierto |
| `src/pages/admin/` (8 vistas panel Admin) | 80.47% | 62.50% | 77.33% | 80.97% | Cubierto |
| `src/utils/` (`carrito`, `productos`, `validaciones`) | 89.06% | 81.69% | 94.73% | 95.50% | Cubierto |

---

## 3. Desglose por Archivo Instrumentado

| Archivo | % Stmts | % Branch | % Funcs | % Lines |
| :--- | :---: | :---: | :---: | :---: |
| `src/App.jsx` | 100% | 100% | 100% | 100% |
| `src/components/Acordeon.jsx` | 80.00% | 42.85% | 66.66% | 80.00% |
| `src/components/AdminNavbar.jsx` | 75.00% | 75.00% | 60.00% | 83.33% |
| `src/components/CampoFormulario.jsx` | 100% | 100% | 100% | 100% |
| `src/components/Carrusel.jsx` | 90.00% | 100% | 85.71% | 100% |
| `src/components/Footer.jsx` | 100% | 100% | 100% | 100% |
| `src/components/ItemCarrito.jsx` | 50.00% | 100% | 50.00% | 50.00% |
| `src/components/Layout.jsx` | 100% | 100% | 100% | 100% |
| `src/components/LayoutAdmin.jsx` | 100% | 71.42% | 100% | 100% |
| `src/components/MenuCategorias.jsx` | 100% | 100% | 100% | 100% |
| `src/components/Migas.jsx` | 100% | 100% | 100% | 100% |
| `src/components/Modal.jsx` | 100% | 87.50% | 100% | 100% |
| `src/components/Navbar.jsx` | 80.76% | 40.00% | 75.00% | 80.95% |
| `src/components/ProductoCard.jsx` | 100% | 87.50% | 100% | 100% |
| `src/context/CarritoContext.jsx` | 70.58% | 66.66% | 63.63% | 78.57% |
| `src/context/ProductosContext.jsx` | 81.81% | 66.66% | 80.00% | 87.50% |
| `src/context/ToastContext.jsx` | 72.22% | 100% | 50.00% | 92.30% |
| `src/data/productos.js` | 100% | 100% | 100% | 100% |
| `src/data/usuarios.js` | 89.58% | 71.21% | 100% | 89.13% |
| `src/data/zonas.js` | 100% | 100% | 100% | 100% |
| `src/pages/Blog.jsx` | 83.33% | 100% | 75.00% | 83.33% |
| `src/pages/Carrito.jsx` | 57.14% | 60.00% | 50.00% | 60.00% |
| `src/pages/Categorias.jsx` | 64.28% | 50.00% | 42.85% | 69.23% |
| `src/pages/Compra.jsx` | 89.74% | 68.75% | 93.33% | 87.50% |
| `src/pages/CompraResultado.jsx` | 44.44% | 33.33% | 33.33% | 44.44% |
| `src/pages/Contacto.jsx` | 86.95% | 92.30% | 85.71% | 85.00% |
| `src/pages/DetalleProducto.jsx` | 57.14% | 78.57% | 25.00% | 60.00% |
| `src/pages/Home.jsx` | 81.81% | 100% | 75.00% | 81.81% |
| `src/pages/Login.jsx` | 62.06% | 80.00% | 33.33% | 64.28% |
| `src/pages/NoEncontrada.jsx` | 100% | 100% | 100% | 100% |
| `src/pages/Nosotros.jsx` | 100% | 100% | 100% | 100% |
| `src/pages/Ofertas.jsx` | 75.00% | 50.00% | 66.66% | 75.00% |
| `src/pages/Productos.jsx` | 81.81% | 50.00% | 75.00% | 81.81% |
| `src/pages/Registro.jsx` | 87.09% | 75.00% | 100% | 84.00% |
| `src/pages/admin/AdminCategorias.jsx` | 62.50% | 55.00% | 66.66% | 62.16% |
| `src/pages/admin/AdminDashboard.jsx` | 100% | 50.00% | 100% | 100% |
| `src/pages/admin/AdminOrdenes.jsx` | 90.90% | 76.00% | 83.33% | 94.73% |
| `src/pages/admin/AdminPerfil.jsx` | 88.88% | 62.50% | 100% | 88.23% |
| `src/pages/admin/AdminProductoForm.jsx` | 84.37% | 51.42% | 87.50% | 85.18% |
| `src/pages/admin/AdminProductos.jsx` | 77.77% | 75.00% | 55.55% | 82.35% |
| `src/pages/admin/AdminReportes.jsx` | 100% | 50.00% | 100% | 100% |
| `src/pages/admin/AdminUsuarios.jsx` | 71.11% | 70.00% | 57.14% | 73.80% |
| `src/utils/carrito.js` | 77.27% | 38.46% | 83.33% | 87.50% |
| `src/utils/productos.js` | 89.79% | 82.08% | 100% | 93.75% |
| `src/utils/validaciones.js` | 92.98% | 90.32% | 100% | 100% |

---

## 4. Detalle de los 10 Casos de Prueba Implementados (`tests/almacen.spec.jsx`)

1. **Renderizado de listas y componentes base (`Migas`, `Acordeon`, `Carrusel`, `MenuCategorias` y `Footer`):**
   Monta los componentes reales con `createRoot` y verifica con `querySelectorAll` la creación de nodos `.breadcrumb-item`, `.accordion-item`, `.carousel-item` y `footer`, además del avance/retroceso del carrusel.
2. **Renderizado condicional (`CampoFormulario.jsx` y `Modal.jsx`):**
   Verifica que `.form-text` y `.modal` se oculten o muestren dinámicamente según sus propiedades y que la tecla `Escape` cierre el modal.
3. **Propiedades recibidas (`props`) en `ProductoCard.jsx`:**
   Verifica que la tarjeta muestre el nombre del producto, el badge de descuento (`-13%`), la alerta de stock crítico (`¡Quedan pocas unidades!`) y ejecute `onAgregar` al hacer clic.
4. **Gestión de estado (`state`) en `Blog.jsx` y `Contacto.jsx`:**
   Simula la apertura de artículos del blog y el llenado, envío y limpieza del formulario de contacto con validación de RUT y correo.
5. **Simulación de eventos en `ItemCarrito.jsx` y `Carrito.jsx`:**
   Verifica el incremento de unidades en el DOM (`data-testid="cantidad"`) y el vaciado completo mediante el modal de confirmación.
6. **Validación de RUT chileno (`src/utils/validaciones.js`):**
   Prueba el algoritmo Módulo 11 (`validarRut` y `validarRutCampo`) con RUTs válidos e inválidos.
7. **Validación de correo, contraseña y campos obligatorios (`src/utils/validaciones.js`):**
   Prueba `validarCorreo` (`@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`), `validarPassword`, `validarConfirmacion`, `validarNombre` y `validarObligatorio`.
8. **Catálogo, Enrutador y Carrito (`App`, `Home`, `Productos`, `Categorias`, `Ofertas`, `DetalleProducto`):**
   Prueba la lógica de `carrito.js` y el montaje de las vistas públicas y la barra de navegación (`Navbar`).
9. **Flujo completo de Registro, Autenticación (`Login`) y Checkout (`Compra` -> `CompraResultado`):**
   Registra un vecino nuevo en `localStorage`, verifica el rechazo de credenciales inválidas y el ingreso con credenciales válidas en `Login.jsx`, procesa una compra en `Compra.jsx` y comprueba que la orden quede guardada en `ordenes_almacen`.
10. **Mock de `localStorage` (`Storage.prototype`) y Panel Administrador protegido (`/admin`):**
    Verifica que `LayoutAdmin` bloquee el acceso sin sesión activa, permite el ingreso como Administrador y ejecuta operaciones reales en `AdminDashboard`, `AdminProductos`, `AdminProductoForm`, `AdminCategorias`, `AdminOrdenes`, `AdminUsuarios`, `AdminReportes` y `AdminPerfil`.
