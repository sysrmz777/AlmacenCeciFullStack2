# Almacén Cecilia - Tienda Online (React)

Asignatura: Desarrollo Full Stack II (DSY1104), Duoc UC. Evaluación Parcial N° 2.  
Integrantes: Alvaro Ramirez y Fernando Reyes.

## Tecnologías
- React 19 con Vite
- React Router (navegación entre páginas)
- Bootstrap 5.3.3 local (diseño responsivo)
- Jasmine 5.1 + Karma 6.4 + Istanbul Coverage (pruebas unitarias y cobertura sobre `src/`)

## Cómo ejecutarlo
Requiere Node.js. Dentro de esta carpeta:

```bash
npm install
npm run dev
```

Luego abrir `http://localhost:5173`.

## Cómo ejecutar las Pruebas Unitarias y el Reporte de Cobertura
Para ejecutar las 10 pruebas unitarias con **Karma + Jasmine** en `ChromeHeadless` y generar el reporte de cobertura en la carpeta `coverage/`:

```bash
npm test
```

- El resumen de cobertura se muestra en la terminal (`95.45% Lines`, `91.57% Statements`).
- El reporte interactivo HTML queda generado en `coverage/html/index.html`.
- El informe detallado de las pruebas se encuentra en `INFORME_COBERTURA_TESTING.md`.
