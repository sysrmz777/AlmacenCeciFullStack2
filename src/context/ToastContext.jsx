import { createContext, useCallback, useContext, useRef, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [avisos, setAvisos] = useState([]);
    const contador = useRef(0);

    const cerrar = useCallback((id) => setAvisos((actual) => actual.filter((a) => a.id !== id)), []);

    const mostrar = useCallback((mensaje, tipo = "success") => {
        contador.current += 1;
        const id = contador.current;
        setAvisos((actual) => [...actual, { id, mensaje, tipo }]);
        setTimeout(() => cerrar(id), 3500);
    }, [cerrar]);

    return (
        <ToastContext.Provider value={{ mostrar }}>
            {children}
            <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
                {avisos.map((aviso) => (
                    <div key={aviso.id} className={"toast show align-items-center border-0 text-bg-" + aviso.tipo} role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="d-flex">
                            <div className="toast-body">{aviso.mensaje}</div>
                            <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Cerrar" onClick={() => cerrar(aviso.id)}></button>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}
