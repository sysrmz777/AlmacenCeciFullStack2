import { useEffect } from "react";

export default function Modal({ abierto, titulo, onCerrar, children, pie }) {
    useEffect(() => {
        if (!abierto) return undefined;
        const alPresionar = (e) => {
            if (e.key === "Escape") onCerrar();
        };
        document.addEventListener("keydown", alPresionar);
        return () => document.removeEventListener("keydown", alPresionar);
    }, [abierto, onCerrar]);

    if (!abierto) return null;

    return (
        <>
            <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="modal-titulo" onClick={onCerrar}>
                <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title h5" id="modal-titulo">{titulo}</h2>
                            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar}></button>
                        </div>
                        <div className="modal-body">{children}</div>
                        {pie && <div className="modal-footer">{pie}</div>}
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
}
