import { useState } from "react";
import { Link } from "react-router-dom";

export default function Carrusel({ id = "carrusel", items }) {
    const [indice, setIndice] = useState(0);
    const total = items.length;
    const ir = (nuevo) => setIndice((nuevo + total) % total);

    return (
        <div id={id} className="carousel slide mb-4 rounded overflow-hidden" aria-roledescription="carrusel">
            <div className="carousel-indicators">
                {items.map((item, i) => (
                    <button key={item.titulo} type="button" data-bs-target={"#" + id} className={i === indice ? "active" : ""} aria-current={i === indice} aria-label={"Diapositiva " + (i + 1)} onClick={() => ir(i)}></button>
                ))}
            </div>
            <div className="carousel-inner">
                {items.map((item, i) => (
                    <div key={item.titulo} className={"carousel-item" + (i === indice ? " active" : "")}>
                        <div className={"d-flex flex-column justify-content-center align-items-center text-center text-white px-5 py-5 " + item.fondo} style={{ minHeight: "260px" }}>
                            <h2>{item.titulo}</h2>
                            <p className="lead">{item.texto}</p>
                            <Link to={item.enlace} className="btn btn-light">{item.boton}</Link>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" onClick={() => ir(indice - 1)}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" onClick={() => ir(indice + 1)}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
            </button>
        </div>
    );
}
