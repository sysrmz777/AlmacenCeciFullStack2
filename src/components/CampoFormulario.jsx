export default function CampoFormulario({ id, etiqueta, valor, onCambio, tipo = "text", componente = "input", mensaje, esValido, children, ...resto }) {
    const Control = componente;
    const clase = componente === "select" ? "form-select" : "form-control";

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label fw-bold">{etiqueta}</label>
            <Control
                id={id}
                className={clase}
                value={valor}
                onChange={(e) => onCambio(e.target.value)}
                {...(componente === "input" ? { type: tipo } : {})}
                {...resto}
            >
                {children}
            </Control>
            {mensaje && <div className={"form-text fw-bold " + (esValido ? "text-success" : "text-danger")}>{mensaje}</div>}
        </div>
    );
}
