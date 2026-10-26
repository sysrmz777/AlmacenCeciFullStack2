import { useState } from "react";

export default function Acordeon({ id = "acordeon", items }) {
    const [abierto, setAbierto] = useState(null);

    return (
        <div className="accordion" id={id}>
            {items.map((item, i) => {
                const activo = abierto === i;
                return (
                    <div className="accordion-item" key={item.titulo}>
                        <h3 className="accordion-header">
                            <button type="button" className={"accordion-button" + (activo ? "" : " collapsed")} aria-expanded={activo} onClick={() => setAbierto(activo ? null : i)}>
                                {item.titulo}
                            </button>
                        </h3>
                        <div className={"accordion-collapse collapse" + (activo ? " show" : "")}>
                            <div className="accordion-body">{item.contenido}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
