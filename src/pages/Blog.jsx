import { useState } from "react";

// Blogs
const entradas = [
    {
        id: 1,
        titulo: "Cómo armar una despensa para la semana",
        fecha: "12 de octubre de 2026",
        imagen: "/Imagen/Criollitas.jpg",
        resumen: "Arroz, fideos y aceite son la base. Te contamos qué más conviene tener a mano para cocinar sin salir de casa.",
        detalle: "En Almacén Cecilia recomendamos organizar tu compra semanal con abarrotes esenciales como arroz, fideos, aceite y galletas para la once, aprovechando nuestros precios de barrio."
    },
    {
        id: 2,
        titulo: "Ofertas de la semana: qué aprovechar",
        fecha: "5 de octubre de 2026",
        imagen: "/Imagen/Coca.jpg",
        resumen: "Repasamos los productos con precio rebajado y cuánto puedes ahorrar si compras en el almacén del barrio.",
        detalle: "Todas las semanas renovamos nuestras ofertas en bebidas, snacks y abarrotes para ayudar al bolsillo de las familias vecinas."
    },
    {
        id: 3,
        titulo: "Nuestra historia: de la esquina a internet",
        fecha: "28 de septiembre de 2026",
        imagen: "/Imagen/fruna.png",
        resumen: "Almacén Cecilia nació como un negocio familiar y hoy también atiende en línea. Así fue el camino.",
        detalle: "Gracias al apoyo de los vecinos, hoy puedes revisar todo el catálogo desde tu celular o computador y recibir tu pedido directo en casa."
    }
];

export default function Blog() {
    const [seleccionada, setSeleccionada] = useState(null);

    return (
        <>
            <h2 className="text-center texto-cecilia mb-4">Blog del Almacén</h2>

            {seleccionada && (
                <div className="card p-4 mb-4 border-success">
                    <p className="small text-muted mb-1">{seleccionada.fecha}</p>
                    <h3 className="h4 texto-cecilia">{seleccionada.titulo}</h3>
                    <p>{seleccionada.resumen}</p>
                    <p className="mb-3">{seleccionada.detalle}</p>
                    <div>
                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setSeleccionada(null)}>
                            Cerrar detalle
                        </button>
                    </div>
                </div>
            )}

            <div className="row g-4">
                {entradas.map((entrada) => (
                    <div className="col-12 col-md-4" key={entrada.id}>
                        <article className="card h-100 card-producto">
                            <img src={entrada.imagen} className="card-img-top" alt={entrada.titulo} />
                            <div className="card-body d-flex flex-column">
                                <p className="small text-muted mb-1">{entrada.fecha}</p>
                                <h3 className="h5 texto-cecilia">{entrada.titulo}</h3>
                                <p>{entrada.resumen}</p>
                                <button type="button" className="btn btn-cecilia btn-sm mt-auto" onClick={() => setSeleccionada(entrada)}>
                                    Ver detalle
                                </button>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </>
    );
}
