# Almacén Cecilia - Tienda Online
**Asignatura:** Desarrollo Full Stack II (DSY1104)  
**Institución:** Duoc UC  
**Evaluación:** Parcial N° 2 - Implementando frontend a mi tienda online  

---

## Descripción del Proyecto
Sitio web frontend para el emprendimiento de barrio **"Almacén Cecilia"**, actualizado para esta segunda entrega utilizando **React** y **Bootstrap 5**. Permite ver el catálogo de productos, filtrar por categorías y ofertas, armar el carrito de compras con persistencia en `localStorage`, realizar el proceso de compra (checkout) y administrar la tienda desde un panel de control.

---

## Estructura del Sitio Web
El proyecto fue migrado desde las páginas HTML de la entrega anterior a vistas y componentes en React dentro de la carpeta `src/`:

1. **`Home.jsx` (`/`):** Portada principal con carrusel, video publicitario embebido, productos destacados y preguntas frecuentes.
2. **`Productos.jsx` (`/productos`) y `DetalleProducto.jsx` (`/productos/:id`):** Catálogo con buscador, filtro por categoría y vista con el detalle de cada producto.
3. **`Categorias.jsx` (`/categorias`) y `Ofertas.jsx` (`/ofertas`):** Vistas para revisar los productos separados por categoría o aquellos que tienen descuento.
4. **`Carrito.jsx` (`/carrito`):** Carrito de compras conectado a `localStorage`, donde se pueden sumar o restar unidades, eliminar productos y ver el total a pagar.
5. **`Compra.jsx` (`/compra`) y `CompraResultado.jsx` (`/compra/ok`, `/compra/error`):** Formulario de despacho con selección de Región y Comuna, registro de la boleta y pantallas de confirmación de pago exitoso o rechazado.
6. **`Nosotros.jsx` (`/nosotros`) y `Blog.jsx` (`/blog`):** Historia del almacén, datos del equipo de desarrollo y sección de noticias del barrio.
7. **`Contacto.jsx` (`/contacto`):** Formulario con validación en tiempo real de nombre, RUT chileno, mensaje y correo (`@duoc.cl`, `@profesor.duoc.cl` o `@gmail.com`).
8. **`Login.jsx` (`/login`) y `Registro.jsx` (`/registro`):** Inicio de sesión y registro de usuarios guardados en `localStorage`, con botones de acceso rápido para probar los perfiles de Cliente, Vendedor y Administrador.
9. **Panel Administrador (`/admin`):** Incluye las vistas `AdminDashboard.jsx`, `AdminProductos.jsx`, `AdminProductoForm.jsx`, `AdminCategorias.jsx`, `AdminOrdenes.jsx`, `AdminUsuarios.jsx`, `AdminReportes.jsx` y `AdminPerfil.jsx`.

---

## Tecnologías Utilizadas
* **React 19 y Vite:** Creación de componentes funcionales reutilizables (`props` y `useState` / `useContext`).
* **React Router DOM:** Navegación entre las vistas de la tienda y rutas del administrador.
* **Bootstrap 5.3.3 y CSS3:** Diseño responsivo adaptable a celulares, tablets y computadores de escritorio, manteniendo los colores del almacén en `estilo.css`.
* **JavaScript y LocalStorage:** Archivos de datos (`productos.js`, `usuarios.js`, `zonas.js`), validaciones (RUT Módulo 11, correos, stock crítico) y persistencia de datos en el navegador.

---

## Cómo Ejecutar el Proyecto
Dentro de la carpeta del proyecto, abrir una terminal y ejecutar:

```bash
rm -rf node_modules
npm install
npm run dev
```

Luego abrir en el navegador la dirección `http://localhost:5173`.

---

## Equipo de Desarrollo
* **Integrantes:** Alvaro Ramirez, Fernando Reyes y Javier Hidalgo
* **Asignatura:** Desarrollo Full Stack II (DSY1104)
* **Institución:** Escuela de Informática y Telecomunicaciones - Duoc UC
