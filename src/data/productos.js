export const categoriasBase = ["Abarrotes", "Bebidas", "Dulces", "Helados"];

const SIN_IMAGEN = "/Imagen/sin-imagen.svg";

export const catalogoInicial = [
    { id: 1, codigo: "ABA001", nombre: "Criollitas", categoria: "Abarrotes", descripcion: "Galletas de agua crocantes, ideales para el desayuno o la once.", precio: 1300, precioAnterior: 1500, stock: 40, stockCritico: 10, imagen: "/Imagen/Criollitas.jpg" },
    { id: 2, codigo: "DUL001", nombre: "Fruna", categoria: "Dulces", descripcion: "Caramelos de fruta masticables, el clásico de toda la vida.", precio: 800, precioAnterior: null, stock: 60, stockCritico: 15, imagen: "/Imagen/fruna.png" },
    { id: 3, codigo: "BEB001", nombre: "CocaCola", categoria: "Bebidas", descripcion: "Bebida gaseosa cola en formato familiar.", precio: 1500, precioAnterior: null, stock: 8, stockCritico: 10, imagen: "/Imagen/Coca.jpg" },
    { id: 4, codigo: "ABA002", nombre: "Arroz grado 1 (1 kg)", categoria: "Abarrotes", descripcion: "Arroz de grano largo, no se pasa ni se pega.", precio: 1290, precioAnterior: null, stock: 35, stockCritico: 10, imagen: "/Imagen/arroz.jpg" },
    { id: 5, codigo: "ABA003", nombre: "Fideos espagueti (400 g)", categoria: "Abarrotes", descripcion: "Fideos de sémola de trigo duro, cocción en 9 minutos.", precio: 990, precioAnterior: 1190, stock: 50, stockCritico: 12, imagen: "/Imagen/pastas.jpg" },
    { id: 6, codigo: "ABA004", nombre: "Aceite vegetal (1 L)", categoria: "Abarrotes", descripcion: "Aceite vegetal para cocinar y freír.", precio: 2490, precioAnterior: null, stock: 22, stockCritico: 8, imagen: "/Imagen/aceite.jpg" },
    { id: 7, codigo: "BEB002", nombre: "Agua mineral (1,5 L)", categoria: "Bebidas", descripcion: "Agua mineral sin gas.", precio: 890, precioAnterior: null, stock: 70, stockCritico: 20, imagen: "/Imagen/agua.jpg" },
    { id: 8, codigo: "BEB003", nombre: "Jugo en caja (1 L)", categoria: "Bebidas", descripcion: "Néctar de durazno en caja, sin azúcar añadida.", precio: 790, precioAnterior: 950, stock: 28, stockCritico: 10, imagen: "/Imagen/Jugo.jpg" },
    { id: 9, codigo: "HEL001", nombre: "Helado de vainilla (1 L)", categoria: "Helados", descripcion: "Helado cremoso de vainilla para compartir en familia.", precio: 2990, precioAnterior: null, stock: 5, stockCritico: 6, imagen: "/Imagen/helado.jpg" }
];
